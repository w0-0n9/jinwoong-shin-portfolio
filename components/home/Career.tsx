"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

import { careerData } from "@/lib/career-data";

export default function Career() {
    return (
        <section id="experience" className="py-32 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 max-w-2xl"
                >
                    <p className="text-sm font-semibold text-[#0071e3] uppercase tracking-[0.12em] mb-4">Experience</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.1]">
                        Building production GenAI,{" "}
                        <br className="hidden md:block" />
                        end-to-end.
                    </h2>
                </motion.div>

                <div className="relative border-l border-[#e8e8ed] ml-3 md:ml-4 space-y-14">
                    {careerData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline dot */}
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[#0071e3] ring-4 ring-white" />

                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-5 gap-3">
                                <div className="flex items-center gap-4">
                                    {item.logo && (
                                        <div className={`relative w-11 h-11 md:w-12 md:h-12 rounded-xl overflow-hidden p-1.5 flex-shrink-0 border border-[#e8e8ed] ${item.id === "samsung-sds" ? "bg-black" : "bg-white"}`}>
                                            <Image
                                                src={item.logo}
                                                alt={item.company}
                                                fill
                                                className="object-contain p-1"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">
                                            {item.role}
                                        </h3>
                                        <p className="text-[#0071e3] text-sm font-medium">{item.company}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col text-xs text-[#86868b] gap-1.5 ml-15 md:ml-0 md:items-end">
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

                            <div className="bg-white border border-[#e8e8ed] rounded-2xl p-7 md:p-8 hover:border-[#d2d2d7] transition-colors">
                                <p className="text-[#424245] mb-7 leading-[1.5] text-[15px]">
                                    {item.description}
                                </p>

                                {item.projects && item.projects.length > 0 && (
                                    <div className="space-y-7 mb-6">
                                        {item.projects.map((project, pIdx) => (
                                            <div key={pIdx}>
                                                <h4 className="text-sm font-semibold text-[#1d1d1f] mb-3 flex items-center gap-2 tracking-tight">
                                                    <span className="h-px w-5 bg-[#0071e3]" />
                                                    {project.name}
                                                </h4>
                                                <ul className="space-y-2.5">
                                                    {project.achievements.map((achievement, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <span className="text-[#0071e3] mt-2 text-[10px]">●</span>
                                                            <span className="text-[#424245] text-[14px] leading-[1.55]">
                                                                {achievement}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {item.achievements && item.achievements.length > 0 && (
                                    <ul className="space-y-2.5 mb-6">
                                        {item.achievements.map((achievement, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="text-[#0071e3] mt-2 text-[10px]">●</span>
                                                <span className="text-[#424245] text-[14px] leading-[1.55]">
                                                    {achievement}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className="flex flex-wrap gap-2 pt-5 border-t border-[#e8e8ed]">
                                    {item.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#f5f5f7] text-[#424245] border border-[#e8e8ed]"
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
