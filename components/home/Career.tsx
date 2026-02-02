"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

import { careerData } from "@/lib/career-data";

export default function Career() {
    return (
        <section id="experience" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-blue-400 font-mono">03.</span>
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            Professional Experience
                        </h2>
                        <div className="h-px bg-slate-800 flex-grow max-w-xs ml-4"></div>
                    </div>
                </motion.div>

                <div className="relative border-l border-slate-800 ml-3 md:ml-6 space-y-12">
                    {careerData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline dot */}
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-slate-900" />

                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                                <div className="flex items-center gap-4">
                                    {item.logo && (
                                        <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden p-1 flex-shrink-0 ${item.id === "samsung-sds" ? "bg-black" : "bg-white"}`}>
                                            <Image
                                                src={item.logo}
                                                alt={item.company}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-100 flex flex-wrap items-center gap-2">
                                            {item.role}
                                            <span className="text-blue-400">@ {item.company}</span>
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex flex-col text-sm text-slate-400 font-mono gap-1 ml-14 md:ml-0">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {item.period}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {item.location}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-blue-500/30 transition-colors">
                                <p className="text-slate-300 mb-6 leading-relaxed">
                                    {item.description}
                                </p>

                                <ul className="space-y-3 mb-6">
                                    {item.achievements.map((achievement, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-blue-400 mt-1.5 text-xs">▹</span>
                                            <span className="text-slate-400 text-sm leading-relaxed">
                                                {achievement}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/50">
                                    {item.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
