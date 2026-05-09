"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import Image from "next/image";
import { Carousel } from "@/components/ui/Carousel";
import { PdfViewerModal, PdfViewerInfo } from "@/components/chatbot/PdfViewerModal";

interface School {
    id: string;
    name: string;
    degree: string;
    program?: string;
    period: string;
    gpa?: string;
    incoming?: boolean;
    logo: string;
    pdf?: {
        src: string;
        buttonLabel: string;
        title: string;
        downloadName: string;
    };
}

const schools: School[] = [
    {
        id: "georgia-tech",
        name: "Georgia Institute of Technology",
        degree: "M.S. in Computer Science",
        program: "Online Master of Science in Computer Science (OMSCS), College of Computing",
        period: "Incoming · Fall 2026",
        incoming: true,
        logo: "/companies/georgia-tech.png",
        pdf: {
            src: "/admission-offer.pdf",
            buttonLabel: "View Offer of Admission",
            title: "Offer of Admission — Georgia Institute of Technology",
            downloadName: "Jinwoong_Shin_GeorgiaTech_Admission.pdf",
        },
    },
    {
        id: "wisconsin",
        name: "University of Wisconsin–Madison",
        degree: "B.S. in Computer Science",
        period: "Graduated May 2024",
        gpa: "3.55 / 4.00",
        logo: "/wisconsin.png",
        pdf: {
            src: "/diploma.pdf",
            buttonLabel: "View Diploma",
            title: "Diploma — University of Wisconsin–Madison",
            downloadName: "Jinwoong_Shin_Diploma.pdf",
        },
    },
];

export function Education() {
    const [pdf, setPdf] = useState<PdfViewerInfo | null>(null);

    return (
        <section id="education" className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl"
                >
                    <p className="text-sm font-semibold text-[#0071e3] uppercase tracking-[0.12em] mb-4">Education</p>
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.1]">
                        Where I studied.
                    </h2>
                </motion.div>
            </div>

            <Carousel
                layoutIdPrefix="education"
                snapAlign="start"
                cardWidthClassName="w-[clamp(280px,32vw,400px)]"
                items={schools.map((school) => ({
                    id: school.id,
                    tabLabel: school.name,
                    node: (
                        <SchoolCard
                            school={school}
                            onOpenPdf={() => {
                                if (!school.pdf) return;
                                setPdf({
                                    src: school.pdf.src,
                                    title: school.pdf.title,
                                    downloadName: school.pdf.downloadName,
                                });
                            }}
                        />
                    ),
                }))}
            />

            <PdfViewerModal pdf={pdf} onClose={() => setPdf(null)} />
        </section>
    );
}

function SchoolCard({ school, onOpenPdf }: { school: School; onOpenPdf: () => void }) {
    return (
        <div className="h-full rounded-2xl border border-[#e8e8ed] bg-white p-6 flex flex-col items-start hover:border-[#d2d2d7] transition-colors">
            <div className="relative w-20 h-20 mb-5 bg-white border border-[#e8e8ed] rounded-2xl p-2 flex items-center justify-center overflow-hidden">
                <Image
                    src={school.logo}
                    alt={school.name}
                    fill
                    className="object-contain p-1.5"
                />
            </div>

            {school.incoming && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold tracking-[0.04em] mb-3">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0071e3] opacity-60"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0071e3]"></span>
                    </span>
                    Incoming
                </span>
            )}

            <h3 className="text-xl font-semibold text-[#1d1d1f] mb-1 tracking-tight leading-tight">
                {school.name}
            </h3>
            <p className="text-[#0071e3] font-medium text-sm mb-2">
                {school.degree}
            </p>
            {school.program && (
                <p className="text-xs text-[#6e6e73] mb-3 leading-snug">
                    {school.program}
                </p>
            )}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#6e6e73] text-sm mb-5">
                <span>{school.period}</span>
                {school.gpa && (
                    <>
                        <span className="w-1 h-1 bg-[#d2d2d7] rounded-full" />
                        <span className="font-mono text-xs">GPA {school.gpa}</span>
                    </>
                )}
            </div>

            {school.pdf && (
                <button
                    type="button"
                    onClick={onOpenPdf}
                    className="mt-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5f5f7] hover:bg-[#ebebed] border border-[#e8e8ed] text-[#1d1d1f] text-sm font-medium transition-colors"
                >
                    <FileText size={14} />
                    {school.pdf.buttonLabel}
                </button>
            )}
        </div>
    );
}
