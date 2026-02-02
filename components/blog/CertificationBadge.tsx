"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface CertificationBadgeProps {
    title?: string;
    issuer: string;
    date: string;
    image: string;
    link: string;
}

export function CertificationBadge({ title, issuer, date, image, link }: CertificationBadgeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
        >
            <Link href={link} target="_blank" rel="noopener noreferrer" className="block w-full max-w-lg md:max-w-xl">
                <div className="group relative rounded-xl border border-white/10 bg-[#121212] overflow-hidden hover:border-blue-500/30 transition-colors flex items-center p-4 gap-6">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors pointer-events-none" />

                    {/* Logo Left */}
                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 group-hover:bg-blue-500/10 transition-colors" />
                        <Image
                            src={image}
                            alt={title || "Certification"}
                            fill
                            className={`object-contain ${issuer.includes("Palantir") ? "p-0 scale-[2.0]" : "p-2"}`}
                        />
                    </div>

                    {/* Text Right */}
                    <div className="flex flex-col z-10">
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                            {title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {issuer}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                            Issued {date}
                        </p>
                    </div>

                    <div className="ml-auto bg-white/5 rounded-full p-3 group-hover:bg-blue-500 group-hover:text-white transition-all hidden md:block">
                        <ArrowRight className="w-5 h-5" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
