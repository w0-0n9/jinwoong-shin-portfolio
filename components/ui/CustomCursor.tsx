"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR =
    "a, button, [role=button], input, textarea, select, label[for]";
const CURSOR_SIZE = 28;

export function CustomCursor() {
    const [enabled, setEnabled] = useState(false);
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const x = useSpring(cursorX, { damping: 22, stiffness: 1100, mass: 0.18 });
    const y = useSpring(cursorY, { damping: 22, stiffness: 1100, mass: 0.18 });

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
        if (!mq.matches) return;
        setEnabled(true);

        const half = CURSOR_SIZE / 2;
        const handleMove = (e: MouseEvent) => {
            cursorX.set(e.clientX - half);
            cursorY.set(e.clientY - half);
            setIsVisible(true);
            const t = e.target as HTMLElement | null;
            setIsPointer(!!t?.closest?.(INTERACTIVE_SELECTOR));
        };
        const handleLeave = () => setIsVisible(false);
        const handleEnter = () => setIsVisible(true);
        const handleDown = () => setIsPressed(true);
        const handleUp = () => setIsPressed(false);

        window.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseleave", handleLeave);
        document.addEventListener("mouseenter", handleEnter);
        window.addEventListener("mousedown", handleDown);
        window.addEventListener("mouseup", handleUp);
        return () => {
            window.removeEventListener("mousemove", handleMove);
            document.removeEventListener("mouseleave", handleLeave);
            document.removeEventListener("mouseenter", handleEnter);
            window.removeEventListener("mousedown", handleDown);
            window.removeEventListener("mouseup", handleUp);
        };
    }, [cursorX, cursorY]);

    if (!enabled) return null;

    const scale = isPressed ? 0.85 : isPointer ? 1.6 : 1;

    return (
        <motion.div
            style={{
                x,
                y,
                width: CURSOR_SIZE,
                height: CURSOR_SIZE,
                opacity: isVisible ? 1 : 0,
            }}
            animate={{ scale }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-[#1d1d1f]/25 backdrop-blur-[1px] mix-blend-multiply"
            aria-hidden="true"
        />
    );
}
