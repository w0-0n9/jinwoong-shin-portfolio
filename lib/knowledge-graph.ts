/**
 * Knowledge graph for the AI Chatbot.
 *
 * Hand-curated nodes + edges centered on Jinwoong Shin. Used for two things:
 *  1. Passed to the LLM as JSON context so it can answer with grounded references.
 *  2. Rendered as an Obsidian-style force-directed graph in the chatbot UI,
 *     with nodes pulsed/highlighted when relevant to the current question.
 */

export type NodeType =
    | "person"
    | "company"
    | "project"
    | "skill"
    | "certification"
    | "school"
    | "document"
    | "location"
    | "conference";

export interface GraphNode {
    id: string;
    type: NodeType;
    label: string;
    /** Short description shown in tooltips and used by the LLM. */
    description?: string;
    /** Optional metadata (e.g., URL for projects, date for certifications). */
    meta?: Record<string, string | number | boolean>;
    /** Document only: path to the PDF served from /public. */
    fileSrc?: string;
    /** Document only: human-readable title shown in the file card / modal. */
    fileTitle?: string;
    /** Document only: filename suggested when the user downloads. */
    fileDownloadName?: string;
}

export type EdgeRelation =
    | "worked_at"
    | "studied_at"
    | "built"
    | "led"
    | "hosted"
    | "uses"
    | "holds"
    | "issued_by"
    | "documents"
    | "located_in"
    | "lives_in"
    | "attended";

export interface GraphEdge {
    source: string;
    target: string;
    relation: EdgeRelation;
}

export const nodes: GraphNode[] = [
    // Person
    {
        id: "jinwoong",
        type: "person",
        label: "Jinwoong Shin",
        description:
            "LLM Engineer with 1.5+ years at LG CNS America. Ships enterprise GenAI across cloud and on-premises stacks. Incoming OMSCS at Georgia Tech, Fall 2026.",
    },

    // Locations
    { id: "loc-little-ferry", type: "location", label: "Little Ferry, NJ", description: "Current residence." },
    { id: "loc-new-jersey", type: "location", label: "New Jersey, USA" },
    { id: "loc-seoul", type: "location", label: "Seoul, South Korea" },
    { id: "loc-madison", type: "location", label: "Madison, Wisconsin" },
    { id: "loc-atlanta", type: "location", label: "Atlanta, Georgia (Online)" },

    // Companies (employment)
    {
        id: "lg-cns",
        type: "company",
        label: "LG CNS America",
        description:
            "Current employer. Jinwoong joined June 2024 as an LLM Engineer building enterprise GenAI for LG Electronics.",
        meta: { period: "Jun 2024 – Present" },
    },
    {
        id: "samsung-sds",
        type: "company",
        label: "Samsung SDS",
        description:
            "Software Engineer Intern (Jun–Aug 2023). Built Salesforce CRM automations and AI-assisted features for Sales Cloud administrators.",
        meta: { period: "Jun 2023 – Aug 2023" },
    },
    {
        id: "nice-payments",
        type: "company",
        label: "NICE PAYMENTS",
        description:
            "Software Engineer Intern (Jan–Jun 2022). Built AR features for Hwahae beauty app using Unity, including AR Image Tracking and payment API integration.",
        meta: { period: "Jan 2022 – Jun 2022" },
    },

    // Schools
    {
        id: "georgia-tech",
        type: "school",
        label: "Georgia Tech",
        description:
            "Incoming · Fall 2026. M.S. in Computer Science (Online Master of Science in Computer Science, OMSCS), College of Computing.",
        meta: { status: "incoming", semester: "Fall 2026" },
    },
    {
        id: "uw-madison",
        type: "school",
        label: "UW–Madison",
        description: "B.S. in Computer Science, May 2024. GPA 3.55 / 4.00.",
        meta: { graduated: "May 2024", gpa: "3.55 / 4.00" },
    },

    // Documents
    {
        id: "doc-resume",
        type: "document",
        label: "Resume (PDF)",
        description: "Latest resume — Jinwoong Shin.",
        fileSrc: "/resume.pdf",
        fileTitle: "Resume — Jinwoong Shin",
        fileDownloadName: "Jinwoong_Shin_Resume.pdf",
    },
    {
        id: "doc-diploma",
        type: "document",
        label: "UW–Madison Diploma",
        description: "Bachelor of Science in Computer Science diploma from University of Wisconsin–Madison.",
        fileSrc: "/diploma.pdf",
        fileTitle: "Diploma — University of Wisconsin–Madison",
        fileDownloadName: "Jinwoong_Shin_Diploma.pdf",
    },
    {
        id: "doc-gt-admission",
        type: "document",
        label: "GT Offer of Admission",
        description: "Georgia Tech College of Computing — Offer of Admission for OMSCS, Fall 2026.",
        fileSrc: "/admission-offer.pdf",
        fileTitle: "Offer of Admission — Georgia Institute of Technology",
        fileDownloadName: "Jinwoong_Shin_GeorgiaTech_Admission.pdf",
    },

    // Projects (work)
    {
        id: "proj-return-analysis",
        type: "project",
        label: "Return Reason Analysis AX",
        description:
            "End-to-end LLM-powered pipeline summarizing and classifying 230K+ annual return records across LG Electronics' Home Depot and LG.com (DTC) channels. ~2% return-rate reduction (~$1.6M annual savings, 2025 vs. 2024). On-premises migration to Gemma 4 on Apple Silicon with 91% accuracy parity to cloud baseline.",
        meta: { records: "230K+", savings: "~$1.6M", channels: "Home Depot, LG.com" },
    },
    {
        id: "proj-contact-center",
        type: "project",
        label: "Contact Center AX",
        description:
            "Enterprise contact center AI platform across 23 agents handling 800+ daily customer interactions (~11K monthly calls). Adaptive RAG (ReAct-based modular) multi-agent across Web, iMessage, WhatsApp. Knowledge ingestion: Bynder DAM → GCS → Salesforce Data Cloud (2,082 docs, 12.4GB), secured by Salesforce Trust Layer. Deployed in 2 months — 150% faster than industry baseline.",
        meta: { agents: "23", monthlyCalls: "~11K", docsIngested: "2,082" },
    },
    {
        id: "proj-olin-bike",
        type: "project",
        label: "Olin Cycling Experiences",
        description:
            "Personal project. Multi-language landing site + Stripe-backed booking flow for an exclusive Tour de France 2026 cycling experience. Live in production at olin.bike. Built solo with Next.js 14 (App Router + RSC), next-intl across EN/ES/FR/KO, Stripe Checkout + webhooks (live mode), deployed on Vercel Fluid Compute.",
        meta: {
            type: "personal",
            liveUrl: "https://www.olin.bike/",
            github: "https://github.com/w0-0n9/olin-bike",
        },
    },
    {
        id: "proj-salesforce-crm",
        type: "project",
        label: "Salesforce CRM Optimization",
        description:
            "At Samsung SDS. Salesforce CRM automations (Flow Builder for lead routing, opportunity stage transitions, approval flows) + custom Lightning Web Components backed by Apex + AI-assisted CRM prototype surfacing contextual customer insights inside record pages.",
    },
    {
        id: "proj-hwahae-ar",
        type: "project",
        label: "Hwahae AR",
        description:
            "At NICE PAYMENTS. AR features for Hwahae beauty app: Unity-based image tracking to recognize cosmetic products, in-AR ingredient/review viewing, and payment API integration adapted from a Java-based system to Unity (C#).",
    },
    {
        id: "proj-portfolio-site",
        type: "project",
        label: "This Portfolio Site",
        description:
            "Personal project. Meta — the very site you're on right now. Next.js 16 (App Router + RSC, static export) with an Apple-inspired light design system, custom cursor, and Carousel/snap-scroll patterns throughout. Flagship feature: an Obsidian-style AI Assistant — a force-directed knowledge graph (react-force-graph-2d) wired to Vertex AI Gemini 2.5 Flash with structured JSON output. The model returns relevant graph node ids + document file ids that auto-render as inline PDF cards. Hosted on Firebase (Hosting + Cloud Functions).",
        meta: {
            type: "personal",
            liveUrl: "https://jinwoong-shin-portfolio.web.app",
            github: "https://github.com/w0-0n9/jinwoong-shin-portfolio",
        },
    },

    // Certifications
    {
        id: "cert-aws-ai",
        type: "certification",
        label: "AWS Certified AI Practitioner",
        description: "Issued Feb 2026 by Amazon Web Services.",
        meta: { date: "Feb 2026" },
    },
    {
        id: "cert-palantir-foundry",
        type: "certification",
        label: "Foundry & AIP Builder Foundations",
        description: "Issued Dec 2025 by Palantir Technologies.",
        meta: { date: "Dec 2025" },
    },
    {
        id: "cert-palantir-speedrun",
        type: "certification",
        label: "Speedrun: Your First AIP Workflow",
        description: "Issued Dec 2025 by Palantir Technologies.",
        meta: { date: "Dec 2025" },
    },

    // Issuers (treated as companies for graph color, but logically issuers)
    { id: "issuer-aws", type: "company", label: "Amazon Web Services" },
    { id: "issuer-palantir", type: "company", label: "Palantir Technologies" },

    // Skills — Languages
    { id: "skill-python", type: "skill", label: "Python" },
    { id: "skill-sql", type: "skill", label: "SQL" },
    { id: "skill-java", type: "skill", label: "Java" },
    { id: "skill-typescript", type: "skill", label: "TypeScript" },
    { id: "skill-csharp", type: "skill", label: "C#" },

    // Skills — AI / ML
    { id: "skill-rag", type: "skill", label: "RAG" },
    { id: "skill-multi-agent", type: "skill", label: "Multi-agent Systems" },
    { id: "skill-model-eval", type: "skill", label: "Model Evaluation" },
    { id: "skill-on-prem-llm", type: "skill", label: "On-premises LLM Serving" },
    { id: "skill-prompt-eng", type: "skill", label: "Prompt Engineering" },
    { id: "skill-embeddings", type: "skill", label: "Embeddings" },

    // Skills — LLMs / Models
    { id: "model-gemma-4", type: "skill", label: "Gemma 4" },
    { id: "model-qwen-3-5", type: "skill", label: "Qwen 3.5" },
    { id: "model-gemini-2-5", type: "skill", label: "Gemini 2.5 Flash" },

    // Skills — Platforms
    { id: "skill-vertex-ai", type: "skill", label: "Vertex AI" },
    { id: "skill-bigquery", type: "skill", label: "BigQuery" },
    { id: "skill-cloud-composer", type: "skill", label: "Cloud Composer" },
    { id: "skill-apple-silicon", type: "skill", label: "Apple Silicon" },
    { id: "skill-ollama", type: "skill", label: "Ollama" },
    { id: "skill-mlx", type: "skill", label: "MLX" },
    { id: "skill-aws-connect", type: "skill", label: "AWS Connect" },
    { id: "skill-agentforce", type: "skill", label: "Salesforce Agentforce" },
    { id: "skill-salesforce-data-cloud", type: "skill", label: "Salesforce Data Cloud" },

    // Skills — Frameworks / Web
    { id: "skill-nextjs", type: "skill", label: "Next.js" },
    { id: "skill-tailwind", type: "skill", label: "Tailwind CSS" },
    { id: "skill-stripe", type: "skill", label: "Stripe" },
    { id: "skill-vercel", type: "skill", label: "Vercel" },

    // Skills — Salesforce ecosystem
    { id: "skill-apex", type: "skill", label: "Apex" },
    { id: "skill-lwc", type: "skill", label: "Lightning Web Components" },
    { id: "skill-flow-builder", type: "skill", label: "Flow Builder" },

    // Skills — Other
    { id: "skill-unity", type: "skill", label: "Unity" },

    // Conferences (industry events Jinwoong attended in person)
    {
        id: "conf-aws-reinvent-2025",
        type: "conference",
        label: "AWS re:Invent 2025",
        description: "Attended in person — AWS's flagship cloud + AI conference.",
        meta: { date: "Dec 2025", location: "Las Vegas, NV" },
    },
    {
        id: "conf-google-cloud-next-2026",
        type: "conference",
        label: "Google Cloud Next 2026",
        description: "Attended in person — Google Cloud's flagship conference covering Vertex AI and the broader GCP stack Jinwoong uses daily.",
        meta: { date: "Apr 2026", location: "Las Vegas, NV" },
    },
];

export const edges: GraphEdge[] = [
    // Person → location
    { source: "jinwoong", target: "loc-little-ferry", relation: "lives_in" },

    // Person → companies (employment)
    { source: "jinwoong", target: "lg-cns", relation: "worked_at" },
    { source: "jinwoong", target: "samsung-sds", relation: "worked_at" },
    { source: "jinwoong", target: "nice-payments", relation: "worked_at" },

    // Person → schools
    { source: "jinwoong", target: "georgia-tech", relation: "studied_at" },
    { source: "jinwoong", target: "uw-madison", relation: "studied_at" },

    // Person → certs
    { source: "jinwoong", target: "cert-aws-ai", relation: "holds" },
    { source: "jinwoong", target: "cert-palantir-foundry", relation: "holds" },
    { source: "jinwoong", target: "cert-palantir-speedrun", relation: "holds" },

    // Person → personal projects
    { source: "jinwoong", target: "proj-olin-bike", relation: "built" },
    { source: "jinwoong", target: "proj-portfolio-site", relation: "built" },

    // Person → resume
    { source: "jinwoong", target: "doc-resume", relation: "documents" },

    // Companies → locations
    { source: "lg-cns", target: "loc-new-jersey", relation: "located_in" },
    { source: "samsung-sds", target: "loc-seoul", relation: "located_in" },
    { source: "nice-payments", target: "loc-seoul", relation: "located_in" },

    // Schools → locations + documents
    { source: "uw-madison", target: "loc-madison", relation: "located_in" },
    { source: "georgia-tech", target: "loc-atlanta", relation: "located_in" },
    { source: "uw-madison", target: "doc-diploma", relation: "documents" },
    { source: "georgia-tech", target: "doc-gt-admission", relation: "documents" },

    // Companies → projects (employer hosted)
    { source: "lg-cns", target: "proj-return-analysis", relation: "hosted" },
    { source: "lg-cns", target: "proj-contact-center", relation: "hosted" },
    { source: "samsung-sds", target: "proj-salesforce-crm", relation: "hosted" },
    { source: "nice-payments", target: "proj-hwahae-ar", relation: "hosted" },

    // Person → led / built (additional roles)
    { source: "jinwoong", target: "proj-return-analysis", relation: "led" },
    { source: "jinwoong", target: "proj-contact-center", relation: "led" },
    { source: "jinwoong", target: "proj-salesforce-crm", relation: "built" },
    { source: "jinwoong", target: "proj-hwahae-ar", relation: "built" },

    // Certifications → issuers
    { source: "cert-aws-ai", target: "issuer-aws", relation: "issued_by" },
    { source: "cert-palantir-foundry", target: "issuer-palantir", relation: "issued_by" },
    { source: "cert-palantir-speedrun", target: "issuer-palantir", relation: "issued_by" },

    // Project: Return Reason Analysis → skills
    { source: "proj-return-analysis", target: "skill-python", relation: "uses" },
    { source: "proj-return-analysis", target: "skill-sql", relation: "uses" },
    { source: "proj-return-analysis", target: "skill-vertex-ai", relation: "uses" },
    { source: "proj-return-analysis", target: "skill-cloud-composer", relation: "uses" },
    { source: "proj-return-analysis", target: "skill-bigquery", relation: "uses" },
    { source: "proj-return-analysis", target: "skill-embeddings", relation: "uses" },
    { source: "proj-return-analysis", target: "skill-on-prem-llm", relation: "uses" },
    { source: "proj-return-analysis", target: "skill-model-eval", relation: "uses" },
    { source: "proj-return-analysis", target: "skill-apple-silicon", relation: "uses" },
    { source: "proj-return-analysis", target: "skill-ollama", relation: "uses" },
    { source: "proj-return-analysis", target: "skill-mlx", relation: "uses" },
    { source: "proj-return-analysis", target: "model-gemma-4", relation: "uses" },
    { source: "proj-return-analysis", target: "model-qwen-3-5", relation: "uses" },
    { source: "proj-return-analysis", target: "model-gemini-2-5", relation: "uses" },

    // Project: Contact Center AX → skills
    { source: "proj-contact-center", target: "skill-python", relation: "uses" },
    { source: "proj-contact-center", target: "skill-rag", relation: "uses" },
    { source: "proj-contact-center", target: "skill-multi-agent", relation: "uses" },
    { source: "proj-contact-center", target: "skill-prompt-eng", relation: "uses" },
    { source: "proj-contact-center", target: "skill-aws-connect", relation: "uses" },
    { source: "proj-contact-center", target: "skill-agentforce", relation: "uses" },
    { source: "proj-contact-center", target: "skill-salesforce-data-cloud", relation: "uses" },
    { source: "proj-contact-center", target: "skill-embeddings", relation: "uses" },

    // Project: Olin Cycling → skills
    { source: "proj-olin-bike", target: "skill-typescript", relation: "uses" },
    { source: "proj-olin-bike", target: "skill-nextjs", relation: "uses" },
    { source: "proj-olin-bike", target: "skill-tailwind", relation: "uses" },
    { source: "proj-olin-bike", target: "skill-stripe", relation: "uses" },
    { source: "proj-olin-bike", target: "skill-vercel", relation: "uses" },

    // Project: Salesforce CRM → skills
    { source: "proj-salesforce-crm", target: "skill-java", relation: "uses" },
    { source: "proj-salesforce-crm", target: "skill-apex", relation: "uses" },
    { source: "proj-salesforce-crm", target: "skill-lwc", relation: "uses" },
    { source: "proj-salesforce-crm", target: "skill-flow-builder", relation: "uses" },

    // Project: Hwahae AR → skills
    { source: "proj-hwahae-ar", target: "skill-unity", relation: "uses" },
    { source: "proj-hwahae-ar", target: "skill-csharp", relation: "uses" },

    // Project: Portfolio Site → skills
    { source: "proj-portfolio-site", target: "skill-typescript", relation: "uses" },
    { source: "proj-portfolio-site", target: "skill-nextjs", relation: "uses" },
    { source: "proj-portfolio-site", target: "skill-tailwind", relation: "uses" },
    { source: "proj-portfolio-site", target: "skill-vertex-ai", relation: "uses" },
    { source: "proj-portfolio-site", target: "model-gemini-2-5", relation: "uses" },
    { source: "proj-portfolio-site", target: "skill-rag", relation: "uses" },

    // Person → conferences
    { source: "jinwoong", target: "conf-aws-reinvent-2025", relation: "attended" },
    { source: "jinwoong", target: "conf-google-cloud-next-2026", relation: "attended" },
];

/** Look up a node by ID. Returns undefined if not found. */
export function getNode(id: string): GraphNode | undefined {
    return nodes.find((n) => n.id === id);
}

/** Look up a document node by ID; returns only if it has a fileSrc. */
export function getDocumentNode(id: string): GraphNode | undefined {
    const n = getNode(id);
    return n && n.type === "document" && n.fileSrc ? n : undefined;
}

/** All valid node IDs (for response validation). */
export const validNodeIds: ReadonlySet<string> = new Set(nodes.map((n) => n.id));
