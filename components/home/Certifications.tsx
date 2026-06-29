"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Carousel } from "@/components/ui/Carousel";
import { blogPosts, type BlogPost } from "@/lib/blog-data";

const certifications = [
    {
        title: "Certified Palantir Foundry Aware Professional",
        issuer: "Palantir Technologies",
        date: "Jun 2026",
        image: "/certifications/palantir.png",
        link: "https://www.linkedin.com/in/w0-0n9/details/certifications/",
    },
    {
        title: "AWS Certified AI Practitioner",
        issuer: "Amazon Web Services (AWS)",
        date: "Feb 2026",
        image: "/certifications/aws-ai-practitioner.png",
        link: "https://www.linkedin.com/in/w0-0n9/details/certifications/",
    },
    {
        title: "Foundry & AIP Builder Foundations",
        issuer: "Palantir Technologies",
        date: "Dec 2025",
        image: "/certifications/palantir.png",
        link: "https://www.linkedin.com/in/w0-0n9/details/certifications/",
    },
    {
        title: "Speedrun: Your First AIP Workflow",
        issuer: "Palantir Technologies",
        date: "Dec 2025",
        image: "/certifications/palantir.png",
        link: "https://www.linkedin.com/in/w0-0n9/details/certifications/",
    },
];

interface Cert {
    title: string;
    issuer: string;
    date: string;
    image: string;
    link: string;
}

function CertCard({ cert }: { cert: Cert }) {
    const isPalantir = cert.issuer.includes("Palantir");
    // The AWS badge ships on a white canvas, so give its tile a white background
    // (otherwise the grey tile shows around the white image).
    const isAws = cert.issuer.includes("Amazon");
    return (
        <Link href={cert.link || "#"} className="block h-full">
            <div className="group h-full rounded-2xl border border-[#e8e8ed] bg-white p-6 flex flex-col items-start hover:border-[#d2d2d7] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] transition-all">
                <div className={`relative w-20 h-20 mb-5 border border-[#e8e8ed] rounded-2xl flex items-center justify-center overflow-hidden ${isAws ? "bg-white" : "bg-[#f5f5f7]"}`}>
                    <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className={`object-contain ${isPalantir ? "p-0 scale-[2.0]" : isAws ? "p-1" : "p-2"}`}
                    />
                </div>

                <h3 className="text-base font-semibold text-[#1d1d1f] mb-1.5 group-hover:text-[#0071e3] transition-colors tracking-tight leading-snug">
                    {cert.title}
                </h3>
                <p className="text-[#6e6e73] text-sm">
                    {cert.issuer}
                </p>
                <p className="text-[#86868b] text-xs mt-1">
                    Issued {cert.date}
                </p>
            </div>
        </Link>
    );
}

function WriteupCard({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug}`} className="block h-full">
            <div className="group h-full rounded-2xl border border-[#e8e8ed] bg-white p-6 flex flex-col items-start hover:border-[#d2d2d7] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] transition-all">
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#f5f5f7] text-[#424245] border border-[#e8e8ed]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2 group-hover:text-[#0071e3] transition-colors tracking-tight leading-snug line-clamp-2">
                    {post.title}
                </h3>
                <p className="text-[#6e6e73] text-sm leading-[1.55] line-clamp-3">
                    {post.description}
                </p>

                <div className="mt-auto pt-5 flex items-center justify-between w-full">
                    <span className="text-[#86868b] text-xs">{post.date}</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0071e3]">
                        Read
                        <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                </div>
            </div>
        </Link>
    );
}

export function Certifications() {
    return (
        <section id="certifications" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-[#f5f5f7] overflow-hidden">
            <div className="container mx-auto px-6 mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl"
                >
                    <p className="text-sm font-semibold text-[#0071e3] uppercase tracking-[0.12em] mb-4">Certifications &amp; Writeups</p>
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.1]">
                        Continuously learning.
                    </h2>
                </motion.div>
            </div>

            {/* Certifications row */}
            <div className="container mx-auto px-6 mb-5 md:mb-6">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#1d1d1f]">
                    Certifications
                </h3>
            </div>
            <Carousel
                layoutIdPrefix="certifications"
                snapAlign="start"
                cardWidthClassName="w-[clamp(260px,32vw,400px)]"
                items={certifications.map((cert, idx) => ({
                    id: `cert-${idx}`,
                    tabLabel: cert.title,
                    node: <CertCard cert={cert} />,
                }))}
            />

            {/* Writeups row */}
            <div className="container mx-auto px-6 mt-16 md:mt-24">
                <div className="flex items-end justify-between gap-4 mb-5 md:mb-6">
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#1d1d1f]">
                        Writeups
                    </h3>
                    <Link
                        href="/blog"
                        className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#0071e3] flex-shrink-0"
                    >
                        View all
                        <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.map((post) => (
                        <WriteupCard key={post.slug} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
}
