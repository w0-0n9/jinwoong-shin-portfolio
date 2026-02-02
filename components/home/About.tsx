"use client";

import { motion } from "framer-motion";

const skills = {
    "Languages": ["Python", "Java", "SQL", "JavaScript"],
    "ML / LLM": ["LLM-based Summarization & Classification", "Embeddings", "Prompt Engineering", "RAG"],
    "Cloud / Data": ["Google Cloud Platform (Vertex AI, BigQuery)", "Production ML Pipelines", "Batch Processing"]
};

export function About() {
    return (
        <section id="about" className="py-24 relative bg-[#0a0a0a] overflow-hidden">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
                {/* Left: Text */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        About <span className="text-blue-500">Me</span>
                    </h2>
                    <div className="space-y-4 text-gray-400 leading-relaxed">
                        <p>
                            I am a Software Engineer with 1.5+ years of experience specializing in LLM-powered data pipelines and enterprise AI solutions.
                            Currently at <strong>LG CNS America</strong>, I design and operate scalable GenAI systems that solve real-world business problems.
                        </p>
                        <p>
                            My work ranges from building <strong>production-grade RAG architectures</strong> for contact centers to automating complex data classification tasks using large language models.
                            I strongly believe in leveraging AI to replace manual analysis with automated, intelligent workflows.
                        </p>
                        <p>
                            I hold a B.S. in Computer Science from the <strong>University of Wisconsin–Madison</strong> (2024).
                        </p>
                    </div>
                </motion.div>

                {/* Right: Skills Grid */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-[#121212] p-6 md:p-8 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-colors"
                >
                    <h3 className="text-2xl font-bold text-white mb-8">Tech Stack</h3>

                    <div className="space-y-8">
                        {Object.entries(skills).map(([category, items], categoryIndex) => (
                            <div key={category} className="relative">
                                {categoryIndex > 0 && (
                                    <div className="absolute -top-4 left-0 right-0 h-px bg-white/10" />
                                )}
                                <h4 className="text-sm font-semibold text-blue-400 mb-3 uppercase tracking-wider">{category}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((skill, index) => (
                                        <motion.span
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                                            className="px-2.5 py-1 text-xs md:text-sm font-mono text-gray-300 bg-white/5 border border-white/10 rounded hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-300 transition-colors cursor-default"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
