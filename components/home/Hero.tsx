"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {

    return (
        <section className="min-h-screen flex items-center justify-center pt-24 pb-12 md:pt-28 md:pb-20 bg-white">
            <div className="container mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
                {/* Content */}
                <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e8e8ed] text-[#1d1d1f] text-xs font-medium mb-6 md:mb-8">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0071e3] opacity-60"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0071e3]"></span>
                            </span>
                            Available for new opportunities
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-[-0.04em] text-[#1d1d1f] mb-5 md:mb-6 leading-[1.05]">
                            Jinwoong Shin
                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl text-[#6e6e73] max-w-xl leading-[1.4] tracking-tight">
                            AI Engineer at LG CNS America. I build production GenAI across cloud and on-premises stacks.
                        </p>
                    </motion.div>

                    {/* Buttons — choose your path */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="flex flex-col gap-3"
                    >
                        <p className="text-xs font-medium text-[#86868b] uppercase tracking-[0.12em]">
                            How would you like to explore?
                        </p>
                        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
                            <a href="#about" className="w-full sm:w-auto">
                                <Button size="lg" className="gap-2 w-full sm:w-auto justify-center">
                                    Browse the portfolio <ArrowDown size={16} />
                                </Button>
                            </a>
                            <Link href="/chat" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="gap-2 w-full sm:w-auto justify-center"
                                >
                                    <Sparkles size={14} className="text-[#0071e3]" />
                                    Ask the AI Assistant
                                </Button>
                            </Link>
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" download className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto justify-center">
                                    <Download size={14} />
                                    Download Resume
                                </Button>
                            </a>
                        </div>
                    </motion.div>

                    {/* Socials */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex items-center gap-5 text-[#86868b] pt-2"
                    >
                        <a href="https://linkedin.com/in/w0-0n9" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin className="w-5 h-5 hover:text-[#1d1d1f] transition-colors" />
                        </a>
                        <a href="https://github.com/w0-0n9" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Github className="w-5 h-5 hover:text-[#1d1d1f] transition-colors" />
                        </a>
                        <a href="mailto:jinwoong7116@gmail.com" aria-label="Email">
                            <Mail className="w-5 h-5 hover:text-[#1d1d1f] transition-colors" />
                        </a>
                        <a href="tel:+16085560771" aria-label="Phone">
                            <Phone className="w-5 h-5 hover:text-[#1d1d1f] transition-colors" />
                        </a>
                    </motion.div>
                </div>

                {/* Profile Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="flex justify-center order-1 lg:order-2"
                >
                    <div className="relative">
                        {/* Main Profile */}
                        <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-[420px] lg:h-[520px] rounded-full lg:rounded-3xl overflow-hidden bg-[#f5f5f7] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
                            <Image
                                src="/profile.jpg"
                                alt="Jinwoong Shin"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* AI Assistant Floating Badge */}
                        <Link href="/chat">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8, type: "spring", bounce: 0.4 }}
                                className="absolute -top-2 -right-4 sm:-top-4 sm:-right-8 lg:-top-6 lg:-right-10 flex flex-col items-end gap-1.5 group cursor-pointer z-10"
                            >
                                {/* Speech Bubble */}
                                <div className="relative bg-white rounded-2xl rounded-br-[4px] px-3 py-2 sm:px-4 sm:py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-[#e8e8ed] transition-transform duration-300 group-hover:-translate-y-1">
                                    <div className="flex items-center gap-1.5">
                                        <Sparkles size={14} className="text-[#0071e3] animate-pulse" />
                                        <span className="text-[11px] sm:text-xs font-semibold text-[#1d1d1f] whitespace-nowrap">
                                            Ask the AI Assistant
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Avatar */}
                                <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full border-4 border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden bg-[#e8e8ed] mr-1 transition-transform duration-300 group-hover:scale-105">
                                    <Image src="/ai-avatar.png" alt="AI Consultant" fill className="object-cover" />
                                </div>
                            </motion.div>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
