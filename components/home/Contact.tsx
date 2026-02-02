"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Contact() {
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-blue-600/5 pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full opacity-30 pointer-events-none" />

            <div className="container mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">collaborate?</span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-8">
                        I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                    </p>

                    <a href="mailto:jinwoong7116@gmail.com">
                        <Button size="lg" className="gap-2">
                            <Mail size={18} />
                            Say Hello
                        </Button>
                    </a>
                </motion.div>

                <footer className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <p>© {new Date().getFullYear()} Jinwoong Shin. All rights reserved.</p>
                        <div className="hidden md:block w-1 h-1 bg-gray-700 rounded-full" />
                        <p>Little Ferry, NJ</p>
                    </div>

                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="https://linkedin.com/in/w0-0n9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="mailto:jinwoong7116@gmail.com" className="hover:text-white transition-colors">Email</a>
                        <a href="tel:+16085560771" className="hover:text-white transition-colors">608-556-0771</a>
                    </div>
                </footer>
            </div>
        </section>
    );
}
