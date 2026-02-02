"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const certifications = [
    {
        title: "AWS Certified AI Practitioner",
        issuer: "Amazon Web Services (AWS)",
        date: "Feb 2026",
        image: "/certifications/aws-ai-practitioner-v3.png",
        link: "/blog/aws-ai-practitioner"
    },
    {
        title: "Foundry & AIP Builder Foundations",
        issuer: "Palantir Technologies",
        date: "Dec 2025",
        image: "/certifications/palantir-v2.png",
        link: "https://www.linkedin.com/in/w0-0n9/details/certifications/"
    },
    {
        title: "Speedrun: Your First AIP Workflow",
        issuer: "Palantir Technologies",
        date: "Dec 2025",
        image: "/certifications/palantir-v2.png",
        link: "https://www.linkedin.com/in/w0-0n9/details/certifications/"
    }
];

export function Certifications() {
    return (
        <section id="certifications" className="py-24 relative bg-black/50 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                        Certifications
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 justify-center">
                        {certifications.map((cert, index) => (
                            <Link href={cert.link || "#"} key={index} className="block w-full max-w-lg mx-auto md:max-w-none">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group relative rounded-xl border border-white/10 bg-[#121212] overflow-hidden hover:border-blue-500/30 transition-colors flex items-center p-4 gap-6"
                                >
                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors pointer-events-none" />

                                    {/* Logo Left */}
                                    <div className="relative w-32 h-32 flex-shrink-0 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                                        <div className="absolute inset-0 group-hover:bg-blue-500/10 transition-colors" />
                                        <Image
                                            src={cert.image}
                                            alt={cert.title}
                                            fill
                                            className={`object-contain ${cert.issuer.includes("Palantir") ? "p-0 scale-[2.0]" : "p-2"}`}
                                        />
                                    </div>

                                    {/* Text Right */}
                                    <div className="flex flex-col z-10">
                                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                                            {cert.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            {cert.issuer}
                                        </p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            Issued {cert.date}
                                        </p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
