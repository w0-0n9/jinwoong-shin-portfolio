/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { VertexAI } from "@google-cloud/vertexai";

// --- CONTEXT DATA START ---

const RESUME_TEXT = `
JINWOONG SHIN
+1 (608) 556-0771 ⋄ Little Ferry, NJ
jinwoong7116@gmail.com ⋄ linkedin.com/in/w0-0n9 ⋄ jinwoong-shin-portfolio.web.app

SUMMARY
LLM Engineer with 1.5+ years at LG CNS America, shipping enterprise GenAI across cloud and on-premises stacks — led a multi-agent contact center platform handling 11K+ monthly calls and an end-to-end return analytics pipeline over 230K+ records, achieving ~2% reduction (~$1.6M) in product return rate.

SKILLS
- Languages: Python, SQL, Java
- AI / ML: RAG, Multi-agent Systems, Model Evaluation, On-premises LLM Serving, Prompt Engineering
- Platforms: Vertex AI, BigQuery, Cloud Composer, AWS, Apple Silicon, Ollama, MLX

EXPERIENCE

LLM Engineer
LG CNS America, Inc.
Jun 2024 – Present | New Jersey, United States

Return Reason Analysis AX Project
- Owned end-to-end design and delivery of an LLM-powered pipeline summarizing and classifying 230K+ annual return records across LG Electronics' retail (The Home Depot) and direct-to-consumer (LG.com) channels in the U.S., replacing manual review with automated GenAI workflows that contributed to a ~2% reduction in overall return rate (~$1.6M estimated annual savings, 2025 vs. 2024).
- Engineered an end-to-end pipeline orchestrated by Cloud Composer (managed Airflow on GKE), integrating heterogeneous sources (OLAP, enterprise data lake, retail partner crawler) via SQL into automated Vertex AI batch inference with LLM summarization and embedding-driven classification.
- Led on-premises migration from Gemini 2.5 Flash to a locally-hosted SLM on Apple Silicon (Mac Studio), benchmarking Gemma 4 vs Qwen 3.5 across Ollama and MLX serving frameworks; selected Gemma 4 with 91% accuracy parity to the cloud baseline, reducing cloud spend and strengthening data residency.

Contact Center AX Project
- Led architecture and delivery of an enterprise contact center AI platform deployed across 23 agents handling 800+ daily customer interactions (~11K monthly calls), integrating real-time call transcription (AWS Connect STT) with Salesforce Agentforce; deployed in 2 months — 150% faster than industry baseline.
- Designed an Adaptive RAG (ReAct-based modular) multi-agent architecture for call/email assistants, automating summarization, sentiment analysis, and reply recommendations across Web, iMessage, and WhatsApp.
- Architected a knowledge ingestion pipeline (Bynder DAM → GCS → Salesforce Data Cloud) processing 2,082 documents (12.4GB) with chunking/embedding/vectorizing, secured by Salesforce Trust Layer.

Software Engineer Intern
Samsung SDS
Jun 2023 – Aug 2023 | Seoul, South Korea
- Developed Salesforce CRM automations with Flow Builder and prototyped an AI-assisted CRM feature using Apex and Lightning Web Components (LWC), streamlining workflows for Sales Cloud administrators.

Software Engineer Intern
NICE PAYMENTS
Jan 2022 – Jun 2022 | Seoul, South Korea
- Developed AR features for "Hwahae," a beauty app subsidiary of Nice Payments, introducing cosmetic ingredients, reviews, and sales.
- Utilized Unity and programmed using languages and tools such as C++, C#, JSON, Blender.
- Implemented Image Tracking technology to recognize actual cosmetic products, enabling users to view reviews and ingredient details for the recognized item in AR environment.
- Adapted Nice Payments' payment API (originally Java-based) to fit the Unity environment, enabling actual transactions within the AR environment.

EDUCATION & CERTIFICATIONS
University of Wisconsin–Madison — Bachelor of Science in Computer Science (May 2024) — GPA: 3.55 / 4.00
- AWS Certified AI Practitioner — Amazon Web Services (Feb 2026)
- Foundry & AIP Builder Foundations — Palantir Technologies (Dec 2025)
`;

const CAREER_DATA = [
    {
        role: "LLM Engineer",
        company: "LG CNS America, Inc.",
        period: "Jun 2024 – Present",
        location: "New Jersey, United States",
        description: "Shipping enterprise GenAI across cloud and on-premises stacks — leading multi-agent platforms and large-scale analytics pipelines for LG Electronics in the U.S.",
        projects: [
            {
                name: "Return Reason Analysis AX Project",
                achievements: [
                    "Owned end-to-end design and delivery of an LLM-powered pipeline summarizing and classifying 230K+ annual return records across LG Electronics' retail (The Home Depot) and direct-to-consumer (LG.com) channels in the U.S., replacing manual review with automated GenAI workflows that contributed to a ~2% reduction in overall return rate (~$1.6M estimated annual savings, 2025 vs. 2024).",
                    "Engineered an end-to-end pipeline orchestrated by Cloud Composer (managed Airflow on GKE), integrating heterogeneous sources (OLAP, enterprise data lake, retail partner crawler) via SQL into automated Vertex AI batch inference with LLM summarization and embedding-driven classification.",
                    "Led on-premises migration from Gemini 2.5 Flash to a locally-hosted SLM on Apple Silicon (Mac Studio), benchmarking Gemma 4 vs Qwen 3.5 across Ollama and MLX serving frameworks; selected Gemma 4 with 91% accuracy parity to the cloud baseline, reducing cloud spend and strengthening data residency."
                ]
            },
            {
                name: "Contact Center AX Project",
                achievements: [
                    "Led architecture and delivery of an enterprise contact center AI platform deployed across 23 agents handling 800+ daily customer interactions (~11K monthly calls), integrating real-time call transcription (AWS Connect STT) with Salesforce Agentforce; deployed in 2 months — 150% faster than industry baseline.",
                    "Designed an Adaptive RAG (ReAct-based modular) multi-agent architecture for call/email assistants, automating summarization, sentiment analysis, and reply recommendations across Web, iMessage, and WhatsApp.",
                    "Architected a knowledge ingestion pipeline (Bynder DAM → GCS → Salesforce Data Cloud) processing 2,082 documents (12.4GB) with chunking/embedding/vectorizing, secured by Salesforce Trust Layer."
                ]
            }
        ],
        techStack: ["Python", "SQL", "Vertex AI", "Cloud Composer", "BigQuery", "Apple Silicon", "Ollama", "MLX", "Gemma 4", "AWS Connect", "Salesforce Agentforce", "RAG", "Multi-agent"]
    },
    {
        role: "Software Engineer Intern",
        company: "Samsung SDS",
        period: "Jun 2023 – Aug 2023",
        location: "Seoul, South Korea",
        description: "Developed Salesforce CRM automations and AI-assisted features for Sales Cloud administrators.",
        achievements: [
            "Developed Salesforce CRM automations with Flow Builder and prototyped an AI-assisted CRM feature using Apex and Lightning Web Components (LWC), streamlining workflows for Sales Cloud administrators."
        ],
        techStack: ["Java", "Salesforce", "Apex", "LWC", "Flow Builder"]
    },
    {
        role: "Software Engineer Intern",
        company: "NICE PAYMENTS",
        period: "Jan 2022 – Jun 2022",
        location: "Seoul, South Korea",
        description: "Developed AR features for Hwahae, a beauty app subsidiary of Nice Payments.",
        achievements: [
            "Utilized Unity and programmed using languages and tools such as C++, C#, JSON, Blender.",
            "Implemented Image Tracking technology to recognize actual cosmetic products, enabling users to view reviews and ingredient details for the recognized item in AR environment.",
            "Adapted Nice Payments' payment API (originally Java-based) to fit the Unity environment, enabling actual transactions within the AR environment."
        ],
        techStack: ["Unity", "C#", "C++", "RestSharp", "JSON", "AR Image Tracking", "Payment API Integration"]
    }
];

const BLOG_DATA = [
    {
        title: "Achieving AWS Certified AI Practitioner",
        description: "My journey to understanding AI/ML fundamentals and passing the AWS AI Practitioner exam.",
        content: `
# AWS Certified AI Practitioner AIF-C01 Study Guide & Key Concepts

I recently passed the **AWS Certified AI Practitioner (AIF-C01)** exam. During my preparation based on the new exam, I compiled a comprehensive set of notes covering key services, concepts, and decision-making patterns. Here is a summary of the essential topics you need to know.

## 1. SageMaker Capabilities: Quick Identification
- **SageMaker Model Dashboard**: Centralized monitoring.
- **SageMaker Model Monitor**: Detects data drift via baseline.
- **SageMaker Clarify**: Detects bias, provides explainability.
- **SageMaker JumpStart**: Pre-trained/foundation models.
- **SageMaker Ground Truth**: Data labeling service.
- **SageMaker Feature Store**: Centralized repository for features.
- **SageMaker Data Wrangler**: Visual tool for data preparation.
- **SageMaker A2I**: Human review workflow.

## 2. SageMaker Inference Options
- **Real-time**: Low latency (ms), small payload.
- **Asynchronous**: Moderate latency, large payload (<1GB).
- **Batch**: High latency, massive payload (S3).
- **Serverless**: Intermittent traffic, pay per request.

## 3. Bedrock Customization
- **Continued Pre-training**: Unlabeled data, domain adaptation.
- **Fine-tuning**: Labeled data, specific task optimization.

## 4. Bedrock Throughput
- **On-Demand**: Pay-as-you-go, testing.
- **Provisioned**: Reserved capacity, guaranteed performance (required for custom models).

## 5. RAG
- **RAG (Retrieval-Augmented Generation)**: Cost-effective, up-to-date info.
- **Knowledge Bases**: Fully managed RAG solution.

## 15. Machine Learning Paradigms
- Supervised (Labeled, Predict outcomes)
- Unsupervised (Unlabeled, Find patterns)
- Semi-supervised (Mix)
- Reinforcement (Rewards, Learn strategy)
- Transfer Learning (Pre-trained)

## 16. Overfitting vs Underfitting
- Underfitting: Model too simple (Fix: Increase complexity/epochs)
- Overfitting: Model memorized data (Fix: Early stopping, Data augmentation, Regularization)
        `
    }
];

// --- CONTEXT DATA END ---

const SYSTEM_INSTRUCTION = `
You are an AI assistant for Jinwoong Shin's portfolio website. 
Your role is to answer visitor's questions about Jinwoong's experience, skills, projects, and blog posts based strictly on the provided context.

**Tone & Style:**
- Professional, helpful, and friendly.
- Concise but informative.
- If the answer is not in the context, politely say you don't have that information.
- You can speak in both Korean and English. Adapt to the language of the user's question. If the user asks in Korean, answer in Korean.

**Context:**

[RESUME]
${RESUME_TEXT}

[CAREER DETAILS]
${JSON.stringify(CAREER_DATA, null, 2)}

[BLOG POSTS]
${JSON.stringify(BLOG_DATA, null, 2)}
`;

export const onAskAI = onCall({
    region: "us-central1",
    cors: true,
    maxInstances: 10,
}, async (request) => {
    // 1. Validate Input
    const { question } = request.data;
    if (!question || typeof question !== 'string') {
        throw new HttpsError('invalid-argument', 'The function must be called with one argument "question" containing the message text to process.');
    }

    // 2. Initialize Vertex AI
    const project = process.env.GCLOUD_PROJECT;
    const location = "us-central1"; // Or make this configurable

    if (!project) {
        logger.error("GCLOUD_PROJECT environment variable not found.");
        throw new HttpsError('internal', 'Server configuration error.');
    }

    logger.info(`Initializing Vertex AI with Project: ${project}, Location: ${location}`);

    try {
        const vertex_ai = new VertexAI({ project: project, location: location });
        const model = "gemini-2.5-flash"; // Updated to latest version for 2026

        const generativeModel = vertex_ai.getGenerativeModel({
            model: model,
            systemInstruction: SYSTEM_INSTRUCTION
        });

        // 3. Generate Content
        const result = await generativeModel.generateContent(question);
        const response = result.response;
        const answer = response.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!answer) {
            throw new Error("No response generated from the model.");
        }

        logger.info("Generated answer for question:", question);
        return { answer };

    } catch (error) {
        logger.error("Error calling Vertex AI:", error);
        throw new HttpsError('internal', 'Failed to generate response.', error);
    }
});
