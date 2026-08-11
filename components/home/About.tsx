"use client";

import { motion } from "framer-motion";

// A curated snapshot — the full per-role / per-project tech lives in Career & Projects.
// Kept at a consistent level: methods, tools, services — no specific model versions.
// Cloud services are nested under their platform (GCP) so the hierarchy is explicit.
type StackItem = string | { group: string; items: string[] };

const skills: { label: string; items: StackItem[] }[] = [
    { label: "AI / ML", items: ["RAG", "Multi-agent Systems", "Prompt Engineering", "Model Evaluation"] },
    { label: "On-Prem Serving", items: ["Ollama", "MLX"] },
    { label: "Cloud & Data", items: [{ group: "GCP", items: ["Vertex AI", "BigQuery", "Cloud Composer"] }, { group: "AWS", items: ["Connect"] }] },
    { label: "Languages", items: ["Python", "SQL", "TypeScript", "Java"] },
];

export function About() {
    return (
        <section id="about" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-[#f5f5f7]">
            <div className="mx-auto px-6 max-w-4xl">
                {/* Intro */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-sm font-semibold text-[#0071e3] uppercase tracking-[0.12em] mb-4">About</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-[#1d1d1f] mb-8 leading-[1.1] break-words">
                        End-to-end is{" "}
                        <br className="hidden md:block" />
                        the only way I know.
                    </h2>
                    <div className="space-y-6 text-[#424245] text-base md:text-lg leading-[1.6] break-words">
                        <p>
                            I&apos;m an AI Engineer who likes building production GenAI <span className="text-[#1d1d1f] font-medium">end-to-end</span> — from messy data plumbing through model selection to the surface where someone actually uses it. The work I&apos;m proudest of started as unstructured chaos and ended as something quiet that saved money or hours.
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

                {/* Tech Stack — woven into the About copy, not a separate card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-[#e2e2e6]"
                >
                    <h3 className="text-xs font-semibold text-[#86868b] uppercase tracking-[0.12em] mb-5">Tech Stack</h3>

                    <div className="space-y-3">
                        {skills.map(({ label, items }) => (
                            <div key={label} className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-5">
                                <span className="text-sm font-semibold text-[#1d1d1f] shrink-0 sm:w-40">
                                    {label}
                                </span>
                                <div className="flex flex-wrap items-center gap-2">
                                    {items.map((item) =>
                                        typeof item === "string" ? (
                                            <span
                                                key={item}
                                                className="px-2.5 py-0.5 text-[13px] text-[#424245] bg-white border border-[#e8e8ed] rounded-full whitespace-nowrap"
                                            >
                                                {item}
                                            </span>
                                        ) : (
                                            <span
                                                key={item.group}
                                                className="inline-flex items-center gap-1.5 rounded-full border border-[#e8e8ed] bg-white py-0.5 pl-3 pr-1.5"
                                            >
                                                <span className="text-[13px] font-semibold text-[#1d1d1f]">{item.group}</span>
                                                <span className="flex flex-wrap gap-1">
                                                    {item.items.map((s) => (
                                                        <span
                                                            key={s}
                                                            className="px-2 py-0.5 text-[12px] text-[#6e6e73] bg-[#f5f5f7] rounded-full whitespace-nowrap"
                                                        >
                                                            {s}
                                                        </span>
                                                    ))}
                                                </span>
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
