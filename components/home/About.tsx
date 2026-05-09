"use client";

import { motion } from "framer-motion";

const skills = {
    "Languages": ["Python", "SQL", "Java", "TypeScript", "JavaScript", "C#", "C++"],
    "AI / ML": ["RAG", "Adaptive RAG", "Multi-agent Systems", "Model Evaluation", "On-premises LLM Serving", "Prompt Engineering", "Embeddings"],
    "LLMs & Serving": ["Gemini 2.5 Flash", "Gemma 4", "Qwen 3.5", "Apple Silicon", "Ollama", "MLX"],
    "Cloud & Data": ["Vertex AI", "BigQuery", "Cloud Composer", "GCP", "AWS", "AWS Connect", "Firebase"],
    "Salesforce": ["Agentforce", "Data Cloud", "Trust Layer", "Sales Cloud", "Apex", "Lightning Web Components", "Flow Builder"],
    "Web": ["Next.js", "React", "Tailwind CSS", "Stripe", "Vercel", "next-intl"],
    "AR / Game": ["Unity", "AR Image Tracking", "Blender"],
};

export function About() {
    return (
        <section id="about" className="py-32 bg-[#f5f5f7]">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-stretch">
                {/* Left: Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col h-full"
                >
                    <div>
                        <p className="text-sm font-semibold text-[#0071e3] uppercase tracking-[0.12em] mb-4">About</p>
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-[#1d1d1f] mb-8 leading-[1.1]">
                            End-to-end is
                            <br />
                            the only way I know.
                        </h2>
                    </div>
                    <div className="flex-1 flex flex-col justify-between gap-6 text-[#424245] text-lg leading-[1.5]">
                        <p>
                            I&apos;m an LLM Engineer who likes building production GenAI <span className="text-[#1d1d1f] font-medium">end-to-end</span> — from messy data plumbing through model selection to the surface where someone actually uses it. The work I&apos;m proudest of started as unstructured chaos and ended as something quiet that saved money or hours.
                        </p>
                        <p>
                            At <span className="text-[#1d1d1f] font-medium">LG CNS America</span> I move between <span className="text-[#1d1d1f] font-medium">cloud and on-premises</span> stacks, picking the right tool for the actual constraint — data residency, latency, or cost. Lately I&apos;ve been deep in evaluating locally-served SLMs against frontier cloud models and shipping the ones that genuinely hold up.
                        </p>
                        <p>
                            <span className="text-[#1d1d1f] font-medium">Next chapter:</span> I&apos;m an incoming Online MSCS student at <span className="text-[#1d1d1f] font-medium">Georgia Tech</span> (Fall 2026), specializing in <span className="text-[#1d1d1f] font-medium">AI and Robotics</span> — formalizing a long-standing interest in physical-world AI alongside the language-model work I do today.
                        </p>
                        <p>
                            Outside of work I build things for fun. Most recently <a href="https://www.olin.bike/" target="_blank" rel="noopener noreferrer" className="text-[#0071e3] hover:underline font-medium">olin.bike</a> — a multi-language Stripe-backed booking site I shipped solo for a Tour de France 2026 cycling experience.
                        </p>
                    </div>
                </motion.div>

                {/* Right: Skills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="h-full bg-white rounded-2xl border border-[#e8e8ed] p-8 md:p-10 flex flex-col"
                >
                    <h3 className="text-xl font-semibold text-[#1d1d1f] mb-8 tracking-tight">Tech Stack</h3>

                    <div className="flex-1 flex flex-col justify-between gap-6 -mx-8 md:-mx-10">
                        {Object.entries(skills).map(([category, items]) => (
                            <div key={category}>
                                <h4 className="px-8 md:px-10 text-xs font-semibold text-[#86868b] uppercase tracking-[0.1em] mb-2.5">
                                    {category}
                                </h4>
                                <div className="relative">
                                    <div className="flex gap-2 overflow-x-auto hide-scrollbar px-8 md:px-10 mask-fade-x">
                                        {items.map((skill) => (
                                            <span
                                                key={skill}
                                                className="flex-shrink-0 px-3 py-1 text-sm text-[#1d1d1f] bg-[#f5f5f7] border border-[#e8e8ed] rounded-full whitespace-nowrap transition-colors hover:bg-[#ebebed]"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
