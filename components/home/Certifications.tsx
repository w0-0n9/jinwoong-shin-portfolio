"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Carousel } from "@/components/ui/Carousel";

const certifications = [
    {
        title: "AWS Certified AI Practitioner",
        issuer: "Amazon Web Services (AWS)",
        date: "Feb 2026",
        image: "/certifications/aws-ai-practitioner.png",
        link: "/blog/aws-ai-practitioner",
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
    return (
        <Link href={cert.link || "#"} className="block h-full">
            <div className="group h-full rounded-2xl border border-[#e8e8ed] bg-white p-6 flex flex-col items-start hover:border-[#d2d2d7] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] transition-all">
                <div className="relative w-20 h-20 mb-5 bg-[#f5f5f7] border border-[#e8e8ed] rounded-2xl flex items-center justify-center overflow-hidden">
                    <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className={`object-contain ${isPalantir ? "p-0 scale-[2.0]" : "p-2"}`}
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
                    <p className="text-sm font-semibold text-[#0071e3] uppercase tracking-[0.12em] mb-4">Certifications</p>
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.1]">
                        Continuously learning.
                    </h2>
                </motion.div>
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
        </section>
    );
}
