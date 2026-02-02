"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/layout/Navbar";
import { blogPosts } from "@/lib/blog-data";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 relative">
            <BackgroundGrid />
            <div className="relative z-10">
                <Navbar />

                <section className="pt-32 pb-24 px-6 container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Blog & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Notes</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-16 max-w-2xl">
                            A collection of my thoughts, learnings, and project breakdowns.
                        </p>

                        <div className="grid gap-8">
                            {blogPosts.map((post, index) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="block group"
                                >
                                    <motion.article
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="bg-[#121212] border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all group-hover:bg-white/5"
                                    >
                                        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                                            <div>
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {post.tags.map(tag => (
                                                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                                                    {post.title}
                                                </h2>
                                                <p className="text-gray-400 mb-4 line-clamp-2">
                                                    {post.description}
                                                </p>
                                                <div className="text-sm text-gray-500">
                                                    {post.date}
                                                </div>
                                            </div>

                                            <div className="md:self-center bg-white/5 p-3 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-all">
                                                <ArrowRight size={20} />
                                            </div>
                                        </div>
                                    </motion.article>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </section>
            </div>
        </main>
    );
}
