"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Code2 } from "lucide-react";
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
    return (
        <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative rounded-xl border border-white/10 bg-[#121212] overflow-hidden hover:border-blue-500/30 transition-colors"
        >
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity blur-md" />

            {/* Content Container */}
            <div className="relative flex flex-col h-full bg-[#121212]">
                {/* Project Image */}
                {image && (
                    <div className={`relative w-full h-48 overflow-hidden border-b border-white/5 ${imageClassName || ""}`}>
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className={`transition-transform duration-500 group-hover:scale-105 ${imageFit === "contain" ? "object-contain" : "object-cover"}`}
                        />
                    </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                    {/* Icon / Top */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                            <Code2 size={24} />
                        </div>
                        <div className="flex gap-2">
                            {links.github && (
                                <Link href={links.github} target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                    <Github size={20} />
                                </Link>
                            )}
                            {links.demo && (
                                <Link href={links.demo} target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                    <ExternalLink size={20} />
                                </Link>
                            )}
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
                    <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                        {description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5"
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
