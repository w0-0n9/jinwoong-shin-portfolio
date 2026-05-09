"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Experience", href: "/#experience" },
    { name: "Projects", href: "/#projects" },
    { name: "Education", href: "/#education" },
    { name: "Certifications", href: "/#certifications" },
    { name: "Conferences", href: "/#conferences" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -40 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-pt",
                isScrolled
                    ? "bg-white/80 backdrop-blur-xl border-b border-[#e8e8ed] py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center group">
                    <span className="font-mono text-base font-semibold tracking-tight text-[#1d1d1f]">
                        jinwoong<span className="text-[#0071e3]">.ai</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-[#424245] hover:text-[#1d1d1f] transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/chat"
                        className="text-sm font-medium text-[#424245] hover:text-[#1d1d1f] transition-colors flex items-center gap-1.5"
                        aria-label="Open AI Assistant"
                    >
                        <Sparkles size={14} className="text-[#0071e3]" />
                        AI Assistant
                    </Link>
                    <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" download>
                        <Button variant="primary" size="sm" className="gap-1.5">
                            <Download size={14} />
                            Download Resume
                        </Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-2 text-[#424245] hover:text-[#1d1d1f]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-b border-[#e8e8ed] overflow-hidden"
                    >
                        <div className="px-6 py-6 flex flex-col gap-5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-base font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/chat"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-left text-base font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors flex items-center gap-2"
                            >
                                <Sparkles size={16} className="text-[#0071e3]" />
                                AI Assistant
                            </Link>
                            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" download className="w-full">
                                <Button className="w-full gap-2">
                                    <Download size={16} />
                                    Download Resume
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
