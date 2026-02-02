"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/ProjectCard";

const projects = [
    {
        title: "Return Reason Classification AI",
        description: "Designed and owned an LLM-powered pipeline to summarize and classify 200K+ annual return records for LG Electronics products at The Home Depot. Replaced manual analysis with automated GenAI workflows, contributing to a ~2% reduction in return rates.",
        tags: ["LLM", "Embeddings", "Batch Processing", "Python", "Data Science"],
        image: "/projects/lg-return-analysis.png",
        imageClassName: "bg-white p-4", // Add white background and padding for the logo
        imageFit: "contain" as const,
        links: {
            demo: "#", // Add if available
            github: "#",
        },
    },
    {
        title: "Enterprise Contact Center AI",
        description: "Led the architecture of a contact center AI system integrating AWS Connect STT with Salesforce Agentforce. Built a RAG-based multi-agent system for real-time call transcription, troubleshooting retrieval, and structured summarization.",
        tags: ["AWS Connect", "Salesforce", "RAG", "Multi-Agent", "Semantic Search"],
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
