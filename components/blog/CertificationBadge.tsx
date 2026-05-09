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
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-10"
        >
            <Link href={link} target="_blank" rel="noopener noreferrer" className="block w-full max-w-lg md:max-w-xl">
                <div className="group relative rounded-2xl border border-[#e8e8ed] bg-white overflow-hidden hover:border-[#d2d2d7] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] transition-all flex items-center p-5 gap-5">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-[#f5f5f7] border border-[#e8e8ed] rounded-xl flex items-center justify-center overflow-hidden">
                        <Image
                            src={image}
                            alt={title || "Certification"}
                            fill
                            className={`object-contain ${issuer.includes("Palantir") ? "p-0 scale-[2.0]" : "p-2"}`}
                        />
                    </div>

                    <div className="flex flex-col min-w-0">
                        <h3 className="text-base md:text-lg font-semibold text-[#1d1d1f] mb-1 group-hover:text-[#0071e3] transition-colors tracking-tight leading-snug">
                            {title}
                        </h3>
                        <p className="text-[#6e6e73] text-sm">
                            {issuer}
                        </p>
                        <p className="text-[#86868b] text-xs mt-1">
                            Issued {date}
                        </p>
                    </div>

                    <div className="ml-auto bg-[#f5f5f7] rounded-full p-2.5 text-[#1d1d1f] group-hover:bg-[#0071e3] group-hover:text-white transition-all hidden md:block">
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
