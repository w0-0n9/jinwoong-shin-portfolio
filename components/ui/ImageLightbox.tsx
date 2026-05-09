"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

export interface LightboxImage {
    src: string;
    alt: string;
    caption?: string;
}

interface ImageLightboxProps {
    image: LightboxImage | null;
    onClose: () => void;
}

export function ImageLightbox({ image, onClose }: ImageLightboxProps) {
    useEffect(() => {
        if (!image) return;
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
    }, [image, onClose]);

    return (
        <AnimatePresence>
            {image && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
                    role="dialog"
                    aria-modal="true"
                    aria-label={image.alt}
                >
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-6xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 90vw"
                                className="object-contain"
                                priority
                            />
                        </div>

                        {image.caption && (
                            <p className="mt-4 text-sm text-white/80 text-center font-medium tracking-tight">
                                {image.caption}
                            </p>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
