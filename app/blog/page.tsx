"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { blogPosts } from "@/lib/blog-data";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-white text-[#1d1d1f]">
            <Navbar />

            <section className="pt-32 pb-24 px-6 container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <p className="text-sm font-semibold text-[#0071e3] uppercase tracking-[0.12em] mb-4">Blog</p>
                    <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] mb-6 text-[#1d1d1f] leading-[1.05]">
                        Notes & writeups.
                    </h1>
                    <p className="text-lg text-[#6e6e73] mb-16 max-w-2xl leading-[1.5]">
                        A collection of my thoughts, learnings, and project breakdowns.
                    </p>

                    <div className="grid gap-5">
                        {blogPosts.map((post, index) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="block group"
                            >
                                <motion.article
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.08 }}
                                    className="bg-white border border-[#e8e8ed] rounded-2xl p-7 md:p-8 hover:border-[#d2d2d7] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] transition-all"
                                >
                                    <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                                        <div>
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {post.tags.map(tag => (
                                                    <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#f5f5f7] text-[#424245] border border-[#e8e8ed]">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors tracking-tight leading-snug">
                                                {post.title}
                                            </h2>
                                            <p className="text-[#6e6e73] mb-3 line-clamp-2 leading-[1.55]">
                                                {post.description}
                                            </p>
                                            <div className="text-sm text-[#86868b]">
                                                {post.date}
                                            </div>
                                        </div>

                                        <div className="md:self-center bg-[#f5f5f7] p-3 rounded-full group-hover:bg-[#0071e3] group-hover:text-white text-[#1d1d1f] transition-all flex-shrink-0">
                                            <ArrowRight size={18} />
                                        </div>
                                    </div>
                                </motion.article>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
