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
jinwoong7116@gmail.com ⋄ linkedin.com/in/w0-0n9

SUMMARY
Software Engineer specializing in LLM-powered data pipelines with 1.5+ years of experience at LG CNS America,
building and operating scalable GenAI systems for enterprise analytics, including production-deployed summarization
and classification workflows.

SKILLS
- Languages: Python, Java, SQL, JavaScript
- ML / LLM: LLM-based Summarization & Classification, Embeddings, Prompt Engineering, RAG
- Cloud / Data: Google Cloud Platform (Vertex AI, BigQuery), Production ML Pipelines, Batch Processing

EXPERIENCE

LLM Engineer
LG CNS America, Inc.
Jun 2024 – Present | New Jersey, United States

Return Reason Classification AI (The Home Depot)
- Designed and owned an LLM-powered pipeline to summarize and classify 200K+ annual return records for LG Electronics products sold through The Home Depot, replacing manual analysis with automated GenAI workflows.
- Built batch inference pipelines using LLM-based summarization and embedding-driven classification to structure unstructured customer return data at scale.
- Enabled CX and operations teams with actionable analytics, contributing to a ˜2% reduction in overall return rate in 2025 vs. 2024.

Contact Center AI (Enterprise Customer Service)
- Led and owned the architecture and delivery of an enterprise contact center AI system, integrating real-time call transcription (AWS Connect STT) with Salesforce Agentforce.
- Designed a RAG-based, multi-agent architecture for call and email assistants, enabling retrieval of troubleshooting knowledge and generation of structured summaries and reply recommendations.
- Established relevance and quality controls through semantic retrieval with reranking, ensuring reliable AI-assisted workflows in production.

Software Engineer (Intern)
Samsung SDS
Jun 2023 – Aug 2023 | Seoul, South Korea
- Developed Salesforce CRM automations using Flow Builder to streamline customer management workflows for Sales Cloud administrators.
- Built custom UI components and prototyped an AI-assisted CRM feature using Apex and Lightning Web Components (LWC), improving administrator productivity.

Software Engineer (Intern)
NICE PAYMENTS
Jan 2022 – Jun 2022 | Seoul, South Korea
- Developed AR features for "Hwahae," a beauty app subsidiary of Nice Payments, introducing cosmetic ingredients, reviews, and sales.
- Utilized Unity and programmed using languages and tools such as C++, C#, JSON, Blender.
- Implemented Image Tracking technology to recognize actual cosmetic products, enabling users to view reviews and ingredient details for the recognized item in AR environment.
- Adapted Nice Payments' payment API (originally Java-based) to fit the Unity environment, enabling actual transactions within the AR environment.

EDUCATION
University of Wisconsin–Madison
Bachelor of Science in Computer Science
2024
GPA: 3.55 / 4.00
`;

const CAREER_DATA = [
    {
        role: "LLM Engineer",
        company: "LG CNS America, Inc.",
        period: "Jun 2024 – Present",
        location: "New Jersey, United States",
        description: "Building and operating scalable GenAI systems for enterprise analytics, including production-deployed summarization and classification workflows.",
        achievements: [
            "Designed and owned an LLM-powered pipeline to summarize and classify 200K+ annual return records for LG Electronics products...",
            "Built batch inference pipelines using LLM-based summarization...",
            "Enabled CX and operations teams with actionable analytics...",
            "Led and owned the architecture and delivery of an enterprise contact center AI system...",
            "Designed a RAG-based, multi-agent architecture...",
            "Established relevance and quality controls..."
        ],
        techStack: ["Python", "LLMs", "RAG", "AWS Connect", "Salesforce Agentforce", "Vertex AI", "Prompt Engineering"]
    },
    {
        role: "Software Engineer (Intern)",
        company: "Samsung SDS",
        period: "Jun 2023 – Aug 2023",
        location: "Seoul, South Korea",
        description: "Developed Salesforce CRM automations and AI-assisted features.",
        achievements: [
            "Developed Salesforce CRM automations using Flow Builder...",
            "Built custom UI components and prototyped an AI-assisted CRM feature..."
        ],
        techStack: ["Java", "Salesforce", "Apex", "LWC", "Flow Builder"]
    },
    {
        role: "Software Engineer (Intern)",
        company: "NICE PAYMENTS",
        period: "Jan 2022 – Jun 2022",
        location: "Seoul, South Korea",
        description: "Developed AR features for Hwahae, a beauty app subsidiary of Nice Payments.",
        achievements: [
            "Utilized Unity and programmed using languages and tools such as C++, C#, JSON, Blender.",
            "Implemented Image Tracking technology to recognize actual cosmetic products...",
            "Adapted Nice Payments' payment API (originally Java-based) to fit the Unity environment..."
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
