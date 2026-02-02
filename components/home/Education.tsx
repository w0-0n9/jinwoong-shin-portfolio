"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Education() {
    return (
        <section id="education" className="py-24 relative bg-black/50 overflow-hidden">

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                        Education
                    </h2>

                    <div className="p-8 rounded-2xl border border-white/10 bg-[#121212]/50 backdrop-blur-sm hover:border-blue-500/30 transition-colors group">
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            {/* Logo */}
                            <div className="relative w-48 h-48 md:w-40 md:h-40 flex-shrink-0 bg-white rounded-xl p-4 flex items-center justify-center overflow-hidden">
                                <Image
                                    src="/wisconsin.png"
                                    alt="University of Wisconsin-Madison"
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                                    University of Wisconsin-Madison
                                </h3>
                                <p className="text-xl text-blue-400 font-medium mb-4">
                                    B.S. in Computer Science
                                </p>
                                <p className="text-gray-400 max-w-lg">
                                    Graduated in 2024
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
