"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Contact() {
    return (
        <section id="contact" className="pt-32 pb-12 bg-white">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto"
                >
                    <p className="text-sm font-semibold text-[#0071e3] uppercase tracking-[0.12em] mb-4">Contact</p>
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] text-[#1d1d1f] mb-6 leading-[1.05]">
                        Let&apos;s build
                        <br />
                        something together.
                    </h2>
                    <p className="text-lg text-[#6e6e73] mb-10 leading-[1.5]">
                        I&apos;m open to new opportunities and collaboration. Drop me a line — I&apos;ll get back to you soon.
                    </p>

                    <a href="mailto:jinwoong7116@gmail.com">
                        <Button size="lg" className="gap-2">
                            <Mail size={16} />
                            Say Hello
                        </Button>
                    </a>
                </motion.div>

                <footer className="mt-32 pt-8 border-t border-[#e8e8ed] flex flex-col md:flex-row items-center justify-between text-[#86868b] text-xs">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p>© {new Date().getFullYear()} Jinwoong Shin. All rights reserved.</p>
                        <span className="hidden md:inline-block w-1 h-1 bg-[#d2d2d7] rounded-full" />
                        <p>Little Ferry, NJ</p>
                    </div>

                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="https://linkedin.com/in/w0-0n9" target="_blank" rel="noopener noreferrer" className="hover:text-[#1d1d1f] transition-colors">LinkedIn</a>
                        <a href="https://github.com/w0-0n9" target="_blank" rel="noopener noreferrer" className="hover:text-[#1d1d1f] transition-colors">GitHub</a>
                        <a href="mailto:jinwoong7116@gmail.com" className="hover:text-[#1d1d1f] transition-colors">Email</a>
                        <a href="tel:+16085560771" className="hover:text-[#1d1d1f] transition-colors">608-556-0771</a>
                    </div>
                </footer>
            </div>
        </section>
    );
}
