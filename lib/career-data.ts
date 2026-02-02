
export interface CareerItem {
    id: string;
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
    achievements: string[];
    techStack: string[];
    logo?: string;
}

export const careerData: CareerItem[] = [
    {
        id: "lg-cns",
        logo: "/companies/lg-cns.png",
        role: "LLM Engineer",
        company: "LG CNS America, Inc.",
        period: "Jun 2024 – Present",
        location: "New Jersey, United States",
        description: "Building and operating scalable GenAI systems for enterprise analytics, including production-deployed summarization and classification workflows.",
        achievements: [
            "Designed and owned an LLM-powered pipeline to summarize and classify 200K+ annual return records for LG Electronics products sold through The Home Depot.",
            "Built batch inference pipelines using LLM-based summarization and embedding-driven classification to structure unstructured customer return data at scale.",
            "Enabled CX and operations teams with actionable analytics, contributing to a ~2% reduction in overall return rate in 2025 vs. 2024.",
            "Led and owned the architecture and delivery of an enterprise contact center AI system, integrating real-time call transcription (AWS Connect STT) with Salesforce Agentforce.",
            "Designed a RAG-based, multi-agent architecture for call and email assistants, enabling retrieval of troubleshooting knowledge.",
            "Established relevance and quality controls through semantic retrieval with reranking, ensuring reliable AI-assisted workflows in production."
        ],
        techStack: ["Python", "LLMs", "RAG", "AWS Connect", "Salesforce Agentforce", "Vertex AI", "Prompt Engineering"]
    },
    {
        id: "samsung-sds",
        logo: "/companies/samsung-sds.png",
        role: "Software Engineer (Intern)",
        company: "Samsung SDS",
        period: "Jun 2023 – Aug 2023",
        location: "Seoul, South Korea",
        description: "Developed Salesforce CRM automations and AI-assisted features.",
        achievements: [
            "Developed Salesforce CRM automations using Flow Builder to streamline customer management workflows for Sales Cloud administrators.",
            "Built custom UI components and prototyped an AI-assisted CRM feature using Apex and Lightning Web Components (LWC), improving administrator productivity."
        ],
        techStack: ["Java", "Salesforce", "Apex", "LWC", "Flow Builder"]
    },
    {
        id: "nice-payments",
        logo: "/companies/nice-payments.png",
        role: "Software Engineer (Intern)",
        company: "NICE PAYMENTS",
        period: "Jan 2022 – Jun 2022",
        location: "Seoul, South Korea",
        description: "Developed AR features for \"Hwahae,\" a beauty app subsidiary of Nice Payments, introducing cosmetic ingredients, reviews, and sales.",
        achievements: [
            "Utilized Unity and programmed using languages and tools such as C++, C#, JSON, Blender.",
            "Implemented Image Tracking technology to recognize actual cosmetic products, enabling users to view reviews and ingredient details for the recognized item in AR environment.",
            "Adapted Nice Payments' payment API (originally Java-based) to fit the Unity environment, enabling actual transactions within the AR environment."
        ],
        techStack: ["Unity", "C#", "C++", "RestSharp", "JSON", "AR Image Tracking", "Payment API Integration"]
    }
];
