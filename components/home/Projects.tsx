"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Carousel } from "@/components/ui/Carousel";

const projects = [
    {
        title: "Return Reason Analysis AX",
        description: "Owned an LLM-powered pipeline summarizing and classifying 230K+ annual return records across LG Electronics' Home Depot and LG.com (DTC) channels. Orchestrated by Cloud Composer + Vertex AI batch inference, contributing to a ~2% return-rate reduction (~$1.6M estimated annual savings). Migrated from Gemini 2.5 Flash to a locally-hosted Gemma 4 SLM on Apple Silicon (Ollama / MLX) with 91% accuracy parity.",
        tags: ["Vertex AI", "Cloud Composer", "Gemma 4", "Apple Silicon", "Ollama", "MLX", "Embeddings"],
        image: "/projects/lg-return-analysis.png",
        imageClassName: "bg-white p-4",
        imageFit: "contain" as const,
        links: {
            demo: "#",
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
        title: "Olin Cycling Experiences",
        description: "Designed and shipped a multi-language landing site and Stripe-backed booking flow for an exclusive Tour de France 2026 cycling experience — currently running in production at olin.bike. Built solo with Next.js 14 (App Router + RSC), next-intl across EN / ES / FR / KO, Stripe Checkout + webhooks in live mode, and deployed on Vercel Fluid Compute with a custom domain.",
        tags: ["Next.js 14", "TypeScript", "Stripe", "next-intl", "Tailwind", "Vercel"],
        image: "/projects/olin-bike.jpg",
        links: {
            demo: "https://www.olin.bike/",
            github: "https://github.com/w0-0n9/olin-bike",
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
    {
        title: "This Portfolio Site",
        description: "The site you're on. Built solo as a meta-project: Next.js 16 (App Router, RSC, static export) + Apple-inspired light design system, custom cursor, Carousel/snap-scroll patterns. The flagship feature is an Obsidian-style AI Assistant — a force-directed knowledge graph (react-force-graph-2d) wired to Vertex AI Gemini 2.5 Flash with structured JSON output. The model returns relevant graph nodes + document file IDs that auto-render PDF cards inline. Hosted on Firebase (Hosting + Cloud Functions).",
        tags: ["Next.js 16", "Tailwind v4", "Vertex AI", "Knowledge Graph", "react-force-graph-2d", "Firebase", "Framer Motion"],
        links: {
            demo: "https://jinwoong-shin-portfolio.web.app",
            github: "https://github.com/w0-0n9/jinwoong-shin-portfolio",
        },
    },
];

export function Projects() {
    return (
        <section id="projects" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-[#f5f5f7] overflow-hidden">
            <div className="container mx-auto px-6 mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl"
                >
                    <p className="text-sm font-semibold text-[#0071e3] uppercase tracking-[0.12em] mb-4">Projects</p>
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.1] mb-4">
                        Selected work.
                    </h2>
                    <p className="text-lg text-[#6e6e73] leading-[1.5]">
                        A few things I&apos;ve shipped — from large-scale data pipelines to multi-agent platforms.
                    </p>
                </motion.div>
            </div>

            <Carousel
                layoutIdPrefix="projects"
                snapAlign="start"
                cardWidthClassName="w-[clamp(260px,40vw,480px)]"
                items={projects.map((p, idx) => ({
                    id: `project-${idx}`,
                    tabLabel: p.title,
                    node: <ProjectCard {...p} />,
                }))}
            />
        </section>
    );
}
