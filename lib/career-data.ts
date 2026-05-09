
export interface CareerProject {
    name: string;
    achievements: string[];
}

export interface CareerItem {
    id: string;
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
    achievements?: string[];
    projects?: CareerProject[];
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
        id: "samsung-sds",
        logo: "/companies/samsung-sds.png",
        role: "Software Engineer Intern",
        company: "Samsung SDS",
        period: "Jun 2023 – Aug 2023",
        location: "Seoul, South Korea",
        description: "Built Salesforce CRM automations and prototyped AI-assisted features for Sales Cloud, focusing on streamlining day-to-day workflows for CRM administrators.",
        achievements: [
            "Designed and shipped Salesforce CRM automations using Flow Builder — automating lead routing, opportunity stage transitions, and approval flows — reducing repetitive manual steps for Sales Cloud administrators.",
            "Built custom Lightning Web Components (LWC) backed by Apex controllers to extend the standard Sales Cloud UI with team-specific views and quick-action panels.",
            "Prototyped an AI-assisted CRM feature that surfaced contextual customer insights and next-step recommendations directly inside record pages, validating the value of GenAI augmentation for admin productivity.",
            "Collaborated cross-functionally with Salesforce administrators and business stakeholders in Korea to gather requirements, demo iterations, and incorporate feedback into the prototype."
        ],
        techStack: ["Java", "Salesforce", "Apex", "Lightning Web Components", "Flow Builder", "Sales Cloud"]
    },
    {
        id: "nice-payments",
        logo: "/companies/nice-payments.png",
        role: "Software Engineer Intern",
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
