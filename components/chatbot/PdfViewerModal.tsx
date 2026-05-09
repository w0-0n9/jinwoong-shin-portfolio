"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, Download } from "lucide-react";

export interface PdfViewerInfo {
    src: string;
    title: string;
    downloadName?: string;
}

interface PdfViewerModalProps {
    pdf: PdfViewerInfo | null;
    onClose: () => void;
}

export function PdfViewerModal({ pdf, onClose }: PdfViewerModalProps) {
    useEffect(() => {
        if (!pdf) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [pdf, onClose]);

    return (
        <AnimatePresence>
            {pdf && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                    role="dialog"
                    aria-modal="true"
                    aria-label={pdf.title}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 12 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative bg-white rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-5 py-3 border-b border-[#e8e8ed] bg-white/80 backdrop-blur-sm">
                            <div className="flex items-center gap-3 min-w-0">
                                <FileText size={16} className="text-[#0071e3] flex-shrink-0" />
                                <p className="text-sm font-medium text-[#1d1d1f] tracking-tight truncate">
                                    {pdf.title}
                                </p>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <a
                                    href={pdf.src}
                                    download={pdf.downloadName}
                                    className="p-2 rounded-full text-[#424245] hover:bg-[#f5f5f7] hover:text-[#1d1d1f] transition-colors"
                                    aria-label="Download"
                                >
                                    <Download size={16} />
                                </a>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="p-2 rounded-full text-[#424245] hover:bg-[#f5f5f7] hover:text-[#1d1d1f] transition-colors"
                                    aria-label="Close"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        <iframe
                            src={`${pdf.src}#view=FitH`}
                            title={pdf.title}
                            className="w-full flex-1 bg-[#f5f5f7]"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
