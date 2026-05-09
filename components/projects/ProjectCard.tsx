"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    links: {
        demo?: string;
        github?: string;
    };
    image?: string;
    imageClassName?: string;
    imageFit?: "cover" | "contain";
}

export function ProjectCard({ title, description, tags, links, image, imageClassName, imageFit = "cover" }: ProjectCardProps) {
    const hasRealLink = (links.demo && links.demo !== "#") || (links.github && links.github !== "#");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative h-full rounded-2xl border border-[#e8e8ed] bg-white overflow-hidden hover:border-[#d2d2d7] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] transition-all"
        >
            <div className="relative flex flex-col h-full">
                {image ? (
                    <div className={`relative w-full h-48 overflow-hidden border-b border-[#e8e8ed] ${imageClassName || "bg-[#f5f5f7]"}`}>
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className={`transition-transform duration-700 group-hover:scale-[1.03] ${imageFit === "contain" ? "object-contain" : "object-cover"}`}
                        />
                    </div>
                ) : (
                    <div className="relative w-full h-48 overflow-hidden border-b border-[#e8e8ed] bg-gradient-to-br from-[#f5f5f7] via-white to-[#0071e3]/8 flex items-center justify-center">
                        <div className="flex items-center gap-2">
                            <Sparkles size={18} className="text-[#0071e3]" />
                            <span className="font-mono text-xl font-semibold tracking-tight text-[#1d1d1f]">
                                jinwoong<span className="text-[#0071e3]">.ai</span>
                            </span>
                        </div>
                    </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3 gap-3">
                        <h3 className="text-lg font-semibold text-[#1d1d1f] tracking-tight leading-tight">{title}</h3>
                        {hasRealLink && (
                            <div className="flex gap-2 flex-shrink-0">
                                {links.github && links.github !== "#" && (
                                    <Link href={links.github} target="_blank" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors" aria-label="GitHub">
                                        <Github size={18} />
                                    </Link>
                                )}
                                {links.demo && links.demo !== "#" && (
                                    <Link href={links.demo} target="_blank" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors" aria-label="Demo">
                                        <ExternalLink size={18} />
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    <p className="text-[#6e6e73] text-sm mb-5 flex-grow leading-[1.55] line-clamp-6">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#f5f5f7] text-[#424245] border border-[#e8e8ed]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
