"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselItem {
    id: string;
    tabLabel: string;
    node: ReactNode;
}

interface CarouselProps {
    items: CarouselItem[];
    /** Class for each card wrapper width (responsive). */
    cardWidthClassName: string;
    /** Snap behavior. "center" = featured single card with peek; "start" = grid of N visible. */
    snapAlign?: "center" | "start";
    /** Used to make framer-motion layoutId unique across multiple carousels. */
    layoutIdPrefix: string;
    /**
     * For snap="center" only. First/last card need extra side margins so the card centers in viewport.
     * Pass classes that compute (100vw - cardWidth) / 2 per breakpoint.
     */
    centerEdgeMarginClassName?: string;
}

export function Carousel({
    items,
    cardWidthClassName,
    snapAlign = "center",
    layoutIdPrefix,
    centerEdgeMarginClassName,
}: CarouselProps) {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const userClickRef = useRef<number | null>(null);

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        let rafId: number | null = null;

        const updateActive = () => {
            rafId = null;
            // If user just clicked a tab, defer auto-detection briefly so the click sticks
            if (userClickRef.current && Date.now() < userClickRef.current) return;

            const scrollerRect = scroller.getBoundingClientRect();

            let closestIdx = 0;
            let closestDist = Infinity;

            cardRefs.current.forEach((card, idx) => {
                if (!card) return;
                const cardRect = card.getBoundingClientRect();
                let dist: number;
                if (snapAlign === "start") {
                    dist = Math.abs(cardRect.left - scrollerRect.left);
                } else {
                    const cardCenter = cardRect.left + cardRect.width / 2;
                    const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;
                    dist = Math.abs(cardCenter - scrollerCenter);
                }
                if (dist < closestDist) {
                    closestDist = dist;
                    closestIdx = idx;
                }
            });
            setActiveIndex(closestIdx);
        };

        const handleScroll = () => {
            if (rafId !== null) return;
            rafId = requestAnimationFrame(updateActive);
        };

        updateActive();
        scroller.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", updateActive);

        return () => {
            scroller.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateActive);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, [snapAlign]);

    const scrollTo = (idx: number) => {
        const target = cardRefs.current[idx];
        if (!target) return;
        // Lock auto-detect briefly so the click intent wins even when nothing actually scrolls
        userClickRef.current = Date.now() + 600;
        setActiveIndex(idx);
        target.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: snapAlign === "center" ? "center" : "start",
        });
    };

    const isFirst = activeIndex === 0;
    const isLast = activeIndex === items.length - 1;

    return (
        <>
            {/* Tab row */}
            <div className="container mx-auto px-6 mb-10">
                <div className="border-b border-[#d2d2d7]">
                    <div className="flex gap-x-8 overflow-x-auto hide-scrollbar -mb-px">
                        {items.map((item, idx) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => scrollTo(idx)}
                                className={cn(
                                    "relative py-3 text-sm whitespace-nowrap transition-colors flex items-center gap-2 flex-shrink-0",
                                    activeIndex === idx
                                        ? "text-[#1d1d1f] font-semibold"
                                        : "text-[#86868b] hover:text-[#1d1d1f] font-medium"
                                )}
                            >
                                <span className="font-mono text-xs text-[#86868b]">
                                    {String(idx + 1).padStart(2, "0")}
                                </span>
                                {item.tabLabel}
                                {activeIndex === idx && (
                                    <motion.span
                                        layoutId={`${layoutIdPrefix}-active`}
                                        className="absolute -bottom-px left-0 right-0 h-0.5 bg-[#0071e3]"
                                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Slider track */}
            {snapAlign === "start" ? (
                <div className="container mx-auto px-6">
                    {/*
                        -mx-2 px-2 trick: extend the scroller 8px past the container's content-box on
                        each side, then push content back with px-2. Net effect: cards align with the
                        container's content-box (matching the tab row), but the scroller's overflow-clip
                        boundary is 8px outside — leaving room for the active card's 2px box-shadow ring.
                    */}
                    <div
                        ref={scrollerRef}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar py-2 -mx-2 px-2"
                    >
                        {items.map((item, idx) => (
                            <div
                                key={item.id}
                                ref={(el) => {
                                    cardRefs.current[idx] = el;
                                }}
                                data-idx={idx}
                                className={cn(
                                    "flex-shrink-0 rounded-2xl transition-shadow duration-300 snap-start",
                                    cardWidthClassName,
                                    activeIndex === idx && "shadow-[0_0_0_2px_#0071e3]"
                                )}
                            >
                                {item.node}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div
                    ref={scrollerRef}
                    className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar py-2"
                >
                    {items.map((item, idx) => (
                        <div
                            key={item.id}
                            ref={(el) => {
                                cardRefs.current[idx] = el;
                            }}
                            data-idx={idx}
                            className={cn(
                                "flex-shrink-0 rounded-2xl transition-shadow duration-300 snap-center",
                                cardWidthClassName,
                                centerEdgeMarginClassName,
                                activeIndex === idx && "shadow-[0_0_0_2px_#0071e3]"
                            )}
                        >
                            {item.node}
                        </div>
                    ))}
                </div>
            )}

            {/* Arrows + counter */}
            <div className="container mx-auto px-6 mt-8 flex items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
                    disabled={isFirst}
                    aria-label="Previous"
                    className="w-10 h-10 rounded-full bg-white border border-[#e8e8ed] text-[#1d1d1f] flex items-center justify-center hover:bg-[#1d1d1f] hover:text-white hover:border-[#1d1d1f] transition-colors disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#1d1d1f] disabled:hover:border-[#e8e8ed]"
                >
                    <ChevronLeft size={18} />
                </button>
                <span className="font-mono text-sm text-[#6e6e73] tabular-nums px-2">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
                <button
                    type="button"
                    onClick={() => scrollTo(Math.min(items.length - 1, activeIndex + 1))}
                    disabled={isLast}
                    aria-label="Next"
                    className="w-10 h-10 rounded-full bg-white border border-[#e8e8ed] text-[#1d1d1f] flex items-center justify-center hover:bg-[#1d1d1f] hover:text-white hover:border-[#1d1d1f] transition-colors disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#1d1d1f] disabled:hover:border-[#e8e8ed]"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </>
    );
}
