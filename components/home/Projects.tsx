"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/ProjectCard";

const projects = [
    {
        title: "Return Reason Analysis AX",
        description: "Owned an LLM-powered pipeline summarizing and classifying 230K+ annual return records across LG Electronics' Home Depot and LG.com (DTC) channels. Orchestrated by Cloud Composer + Vertex AI batch inference, contributing to a ~2% return-rate reduction (~$1.6M estimated annual savings). Migrated from Gemini 2.5 Flash to a locally-hosted Gemma 4 SLM on Apple Silicon (Ollama / MLX) with 91% accuracy parity.",
        tags: ["Vertex AI", "Cloud Composer", "Gemma 4", "Apple Silicon", "Ollama", "MLX", "Embeddings"],
        image: "/projects/lg-return-analysis.png",
        imageClassName: "bg-white p-4", // Add white background and padding for the logo
        imageFit: "contain" as const,
        links: {
            demo: "#", // Add if available
            github: "#",
        },
    },
    {
        title: "Contact Center AX Platform",
        description: "Architected an enterprise contact center AI platform deployed across 23 agents handling 800+ daily customer interactions (~11K monthly calls), integrating AWS Connect STT with Salesforce Agentforce — deployed in 2 months, 150% faster than industry baseline. Designed an Adaptive RAG (ReAct-based modular) multi-agent architecture spanning Web, iMessage, and WhatsApp, backed by a Bynder DAM → GCS → Salesforce Data Cloud knowledge pipeline (2,082 docs, 12.4GB) secured by the Salesforce Trust Layer.",
        tags: ["AWS Connect", "Salesforce Agentforce", "Adaptive RAG", "Multi-Agent", "Salesforce Data Cloud", "Trust Layer"],
        image: "/projects/agentforce.jpg",
        links: {
            demo: "#",
            github: "#",
        },
    },
    {
        title: "Salesforce CRM Optimization",
        description: "Developed Salesforce CRM automations using Flow Builder and built custom UI components with Apex and Lightning Web Components (LWC). Prototyped AI-assisted features to improve administrator productivity at Samsung SDS.",
        tags: ["Salesforce", "Apex", "LWC", "CRM Automation"],
        image: "/projects/salesforce.jpg",
        links: {
            demo: "#",
            github: "#",
        },
    },
];

export function Projects() {
    return (
        <section id="projects" className="py-24 relative bg-black">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Featured <span className="text-blue-500">Projects</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl">
                        A selection of projects that demonstrate my passion for building complex, scalable web applications.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
