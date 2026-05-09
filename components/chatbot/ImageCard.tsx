"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { GraphNode } from "@/lib/knowledge-graph";

interface ImageCardProps {
    node: GraphNode;
    onOpen: () => void;
}

export function ImageCard({ node, onOpen }: ImageCardProps) {
    if (!node.imageSrc) return null;
    const meta = node.meta ?? {};
    const sub: string[] = [];
    if (typeof meta.date === "string") sub.push(meta.date);
    if (typeof meta.location === "string") sub.push(meta.location);

    return (
        <button
            type="button"
            onClick={onOpen}
            className="group w-full text-left rounded-xl border border-[#e8e8ed] bg-white overflow-hidden hover:border-[#d2d2d7] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] transition-all"
        >
            <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#f5f5f7]">
                <Image
                    src={node.imageSrc}
                    alt={node.imageAlt ?? node.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 80vw, 360px"
                />
                <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/85 backdrop-blur-sm text-[#1d1d1f] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={14} />
                </div>
            </div>
            <div className="px-3 py-2.5">
                <p className="text-sm font-medium text-[#1d1d1f] tracking-tight leading-snug truncate">
                    {node.label}
                </p>
                {sub.length > 0 && (
                    <p className="text-xs text-[#86868b] mt-0.5 truncate">
                        {sub.join(" · ")}
                    </p>
                )}
            </div>
        </button>
    );
}
