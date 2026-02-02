"use client";

import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full opacity-30 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 blur-[100px] rounded-full opacity-20 pointer-events-none" />

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Content */}
                <div className="flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Available for new projects
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-2">
                            Hi, I am <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Jinwoong Shin
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                            An LLM Engineer specializing in AI-driven data pipelines and enterprise analytics. Currently building multi-agent systems at LG CNS America.
                        </p>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <a href="#projects">
                            <Button size="lg" className="gap-2">
                                View Projects <ArrowRight size={18} />
                            </Button>
                        </a>
                        <a href="#contact">
                            <Button variant="secondary" size="lg">
                                Contact Me
                            </Button>
                        </a>
                    </motion.div>

                    {/* Socials */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex items-center gap-6 text-gray-500 pt-4"
                    >
                        <a href="https://linkedin.com/in/w0-0n9" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
                        </a>
                        <a href="mailto:jinwoong7116@gmail.com">
                            <Mail className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
                        </a>
                        <a href="tel:+16085560771">
                            <Phone className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
                        </a>
                    </motion.div>
                </div>

                {/* Right: Profile Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    <div className="relative w-[500px] h-[500px] mx-auto">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[100px] -z-10" />
                        <div className="relative w-full h-full">
                            <Image
                                src="/profile.jpg"
                                alt="Jinwoong Shin"
                                fill
                                className="object-cover"
                                style={{
                                    maskImage: "radial-gradient(circle at center, black 40%, transparent 70%)",
                                    WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 70%)"
                                }}
                                priority
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
