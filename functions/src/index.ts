import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { VertexAI, SchemaType } from "@google-cloud/vertexai";

import { nodes, edges, validNodeIds } from "./knowledge-graph";

// Build a compact JSON view of the graph for the LLM context.
// Server-side paths (fileSrc / imageSrc / etc.) are stripped — the LLM only
// needs to know which nodes HAVE associated media via the `hasFile` / `hasImage`
// flags so it can decide which ids to surface.
const KNOWLEDGE_GRAPH_FOR_LLM = {
    nodes: nodes.map((n) => ({
        id: n.id,
        type: n.type,
        label: n.label,
        ...(n.description ? { description: n.description } : {}),
        ...(n.meta ? { meta: n.meta } : {}),
        ...(n.fileSrc ? { hasFile: true } : {}),
        ...(n.imageSrc ? { hasImage: true } : {}),
    })),
    edges: edges.map((e) => ({ source: e.source, target: e.target, relation: e.relation })),
};

const DOCUMENT_NODE_IDS = new Set(nodes.filter((n) => n.type === "document").map((n) => n.id));
const IMAGE_NODE_IDS = new Set(nodes.filter((n) => !!n.imageSrc).map((n) => n.id));

const SYSTEM_INSTRUCTION = `
You are an AI assistant for Jinwoong Shin's portfolio website. Visitors ask you about Jinwoong's experience, skills, projects, education, and credentials. You answer based strictly on the knowledge graph below.

The graph contains typed nodes (person, company, project, skill, certification, school, document, location) and typed edges. Each node has a stable id, a human label, and an optional description / metadata. Treat the graph as the single source of truth — if something isn't in it, politely say you don't have that information rather than inventing details.

KNOWLEDGE GRAPH (JSON):
${JSON.stringify(KNOWLEDGE_GRAPH_FOR_LLM, null, 2)}

RESPONSE FORMAT
You MUST respond with valid JSON matching this shape:
{
  "answer": string,            // Markdown-friendly answer text. Concise but informative.
  "relevantNodeIds": string[], // IDs of graph nodes most relevant to the question/answer. Order matters: most relevant first. Include 3–8 IDs typically.
  "relevantFileIds": string[], // Subset of relevantNodeIds where the node type is "document" (PDFs the user can open). Often empty.
  "relevantImageIds": string[] // Subset of relevantNodeIds for nodes with hasImage:true (photos the user can open). Often empty.
}

DOCUMENT HANDLING — CRITICAL
The frontend automatically renders an interactive file card alongside your answer for every id you put in \`relevantFileIds\`. Each card opens the real PDF in an in-page viewer where the user can scroll, zoom, and download. You do NOT generate or display images yourself — the file card does it.

Therefore:
- Whenever the user asks to see, view, open, show, look at, or download a document (resume, diploma, degree, admission letter, etc.), ALWAYS include the matching id in \`relevantFileIds\` and confirm naturally in \`answer\`.
- NEVER apologize for not being able to display images, scans, or PDFs. NEVER say "I don't have access to the image" or "I can't show you the file" — you can. Just surface the doc-* id and write a short helpful confirmation like "Here's the diploma — open the card below." Then the user clicks and views it.
- Available document ids: doc-resume (Jinwoong's resume PDF), doc-diploma (his UW–Madison Bachelor's diploma PDF), doc-gt-admission (his Georgia Tech OMSCS Offer of Admission PDF).
- Even when the question is about the school / experience / credential rather than the file directly, include the related document if it helps. Example: "Tell me about his Wisconsin years" → include doc-diploma if relevant.

IMAGE HANDLING — JUST AS IMPORTANT
Some nodes have associated photos (any node with \`hasImage: true\` in the graph above). The frontend renders a tappable image card alongside your answer for every id in \`relevantImageIds\`. Click opens a fullscreen lightbox.

- Currently the only image-bearing nodes are conferences (conf-aws-reinvent-2025, conf-google-cloud-next-2026). Each has a real photo of Jinwoong at the event in person.
- Whenever the user asks for, mentions, or could benefit from a photo of a conference (e.g., "show me the pictures from the conferences he attended", "AWS re:Invent 사진 보여줘", "what does the Google Cloud Next venue look like"), include the matching conference id in \`relevantImageIds\` and confirm naturally in \`answer\`.
- NEVER say "I don't have any pictures in the knowledge graph" if the relevant node has hasImage:true — surface it.

EXAMPLES (for guidance, do not echo literally)

User: "Show me the diploma"
Response:
{
  "answer": "Here's Jinwoong's diploma from the University of Wisconsin–Madison — open the card below to view it.",
  "relevantNodeIds": ["doc-diploma", "uw-madison", "jinwoong"],
  "relevantFileIds": ["doc-diploma"]
}

User: "Did he get into grad school?"
Response:
{
  "answer": "Yes — Jinwoong is incoming to Georgia Tech's Online M.S. in Computer Science (OMSCS) program for Fall 2026 in the College of Computing. The admission letter is attached.",
  "relevantNodeIds": ["georgia-tech", "doc-gt-admission", "jinwoong"],
  "relevantFileIds": ["doc-gt-admission"]
}

User: "이력서 보여줘"
Response:
{
  "answer": "네, 진웅님의 최신 이력서입니다. 아래 카드를 클릭하시면 바로 열립니다.",
  "relevantNodeIds": ["doc-resume", "jinwoong"],
  "relevantFileIds": ["doc-resume"],
  "relevantImageIds": []
}

User: "Show me pictures from conferences he attended"
Response:
{
  "answer": "Here are the conferences Jinwoong attended in person — AWS re:Invent 2025 in Las Vegas (Dec 2025) and Google Cloud Next 2026 in Las Vegas (Apr 2026). Tap a photo below to view it full-size.",
  "relevantNodeIds": ["conf-aws-reinvent-2025", "conf-google-cloud-next-2026", "jinwoong"],
  "relevantFileIds": [],
  "relevantImageIds": ["conf-aws-reinvent-2025", "conf-google-cloud-next-2026"]
}

User: "AWS re:Invent 사진 보여줘"
Response:
{
  "answer": "네, 2025년 12월 라스베가스 AWS re:Invent 2025에서 찍은 사진입니다.",
  "relevantNodeIds": ["conf-aws-reinvent-2025", "jinwoong"],
  "relevantFileIds": [],
  "relevantImageIds": ["conf-aws-reinvent-2025"]
}

RULES
- Only use ids that exist in the graph above. Do not invent ids.
- relevantFileIds must be a subset of document-type node ids: ${Array.from(DOCUMENT_NODE_IDS).join(", ")}.
- relevantImageIds must be a subset of nodes that have hasImage:true: ${Array.from(IMAGE_NODE_IDS).join(", ")}.
- Tone: professional, helpful, friendly, concise but informative.
- Language: detect the user's language. If the user writes in Korean, answer in Korean. Otherwise English.
- Do not surround the JSON with markdown code fences.
`;

const RESPONSE_SCHEMA = {
    type: SchemaType.OBJECT,
    properties: {
        answer: {
            type: SchemaType.STRING,
            description: "Markdown-friendly answer text.",
        },
        relevantNodeIds: {
            type: SchemaType.ARRAY,
            description: "Graph node ids most relevant to the question/answer, ordered by relevance.",
            items: { type: SchemaType.STRING },
        },
        relevantFileIds: {
            type: SchemaType.ARRAY,
            description: "Subset of relevantNodeIds where the node is a document (PDF).",
            items: { type: SchemaType.STRING },
        },
        relevantImageIds: {
            type: SchemaType.ARRAY,
            description: "Subset of relevantNodeIds for image-bearing nodes (e.g., conferences with photos).",
            items: { type: SchemaType.STRING },
        },
    },
    required: ["answer", "relevantNodeIds", "relevantFileIds", "relevantImageIds"],
};

interface ChatResponse {
    answer: string;
    relevantNodeIds: string[];
    relevantFileIds: string[];
    relevantImageIds: string[];
}

function safeFilterIds(ids: unknown): string[] {
    if (!Array.isArray(ids)) return [];
    return ids
        .filter((x): x is string => typeof x === "string")
        .filter((id) => validNodeIds.has(id));
}

export const onAskAI = onCall(
    {
        region: "us-central1",
        cors: true,
        maxInstances: 10,
    },
    async (request): Promise<ChatResponse> => {
        const { question } = request.data;
        if (!question || typeof question !== "string") {
            throw new HttpsError(
                "invalid-argument",
                'The function must be called with one argument "question" containing the message text.'
            );
        }

        const project = process.env.GCLOUD_PROJECT;
        const location = "us-central1";

        if (!project) {
            logger.error("GCLOUD_PROJECT environment variable not found.");
            throw new HttpsError("internal", "Server configuration error.");
        }

        try {
            const vertex_ai = new VertexAI({ project: project, location: location });
            const model = "gemini-2.5-flash";

            const generativeModel = vertex_ai.getGenerativeModel({
                model: model,
                systemInstruction: SYSTEM_INSTRUCTION,
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: RESPONSE_SCHEMA,
                    temperature: 0.25,
                },
            });

            const result = await generativeModel.generateContent(question);
            const response = result.response;
            const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!rawText) {
                throw new Error("No response generated from the model.");
            }

            let parsed: {
                answer?: unknown;
                relevantNodeIds?: unknown;
                relevantFileIds?: unknown;
                relevantImageIds?: unknown;
            };
            try {
                parsed = JSON.parse(rawText);
            } catch (err) {
                logger.error("Model returned non-JSON despite responseSchema. Raw:", rawText);
                throw new Error("Model returned invalid JSON.");
            }

            const answer =
                typeof parsed.answer === "string" && parsed.answer.length > 0
                    ? parsed.answer
                    : "Sorry, I couldn't generate a response.";

            const relevantNodeIds = safeFilterIds(parsed.relevantNodeIds);
            const relevantFileIds = safeFilterIds(parsed.relevantFileIds).filter((id) =>
                DOCUMENT_NODE_IDS.has(id)
            );
            const relevantImageIds = safeFilterIds(parsed.relevantImageIds).filter((id) =>
                IMAGE_NODE_IDS.has(id)
            );

            logger.info("Generated answer", {
                question,
                nodeCount: relevantNodeIds.length,
                fileCount: relevantFileIds.length,
                imageCount: relevantImageIds.length,
            });

            return { answer, relevantNodeIds, relevantFileIds, relevantImageIds };
        } catch (error) {
            logger.error("Error calling Vertex AI:", error);
            throw new HttpsError("internal", "Failed to generate response.", error);
        }
    }
);
