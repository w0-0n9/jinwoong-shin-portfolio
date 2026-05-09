"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, MapPin, Maximize2 } from "lucide-react";
import { Carousel } from "@/components/ui/Carousel";
import { ImageLightbox, LightboxImage } from "@/components/ui/ImageLightbox";

interface Conference {
    id: string;
    name: string;
    date: string;
    location: string;
    image: string;
}

const conferences: Conference[] = [
    {
        id: "google-cloud-next-2026",
        name: "Google Cloud Next 2026",
        date: "Apr 2026",
        location: "Las Vegas, NV",
        image: "/conferences/google-cloud-next-2026.jpg",
    },
    {
        id: "aws-reinvent-2025",
        name: "AWS re:Invent 2025",
        date: "Dec 2025",
        location: "Las Vegas, NV",
        image: "/conferences/aws-reinvent-2025.jpg",
    },
];

function ConferenceCard({
    conference,
    onOpen,
}: {
    conference: Conference;
    onOpen: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onOpen}
            className="group h-full w-full text-left rounded-2xl border border-[#e8e8ed] bg-white overflow-hidden flex flex-col hover:border-[#d2d2d7] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] transition-all"
        >
            <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#f5f5f7]">
                <Image
                    src={conference.image}
                    alt={conference.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 80vw, 400px"
                />
                <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/85 backdrop-blur-sm text-[#1d1d1f] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={14} />
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-base font-semibold text-[#1d1d1f] tracking-tight leading-snug mb-2">
                    {conference.name}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#6e6e73]">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {conference.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {conference.location}
                    </span>
                </div>
            </div>
        </button>
    );
}

export function Conferences() {
    const [lightbox, setLightbox] = useState<LightboxImage | null>(null);

    return (
        <section id="conferences" className="py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6 mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl"
                >
                    <p className="text-sm font-semibold text-[#0071e3] uppercase tracking-[0.12em] mb-4">Conferences</p>
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.1]">
                        On the ground.
                    </h2>
                </motion.div>
            </div>

            <Carousel
                layoutIdPrefix="conferences"
                snapAlign="start"
                cardWidthClassName="w-[clamp(280px,32vw,400px)]"
                items={conferences.map((c) => ({
                    id: c.id,
                    tabLabel: c.name,
                    node: (
                        <ConferenceCard
                            conference={c}
                            onOpen={() =>
                                setLightbox({
                                    src: c.image,
                                    alt: c.name,
                                    caption: `${c.name} · ${c.date} · ${c.location}`,
                                })
                            }
                        />
                    ),
                }))}
            />

            <ImageLightbox image={lightbox} onClose={() => setLightbox(null)} />
        </section>
    );
}
