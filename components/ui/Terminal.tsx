"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const terminalLines = [
    { text: "> initializing environment...", color: "text-gray-400" },
    { text: "> loading modules...", color: "text-gray-400" },
    { text: "> Access granted.", color: "text-green-400" },
    { text: "> Welcome, visitor.", color: "text-blue-400" },
];

export function TerminalWindow() {
    const [lines, setLines] = useState<typeof terminalLines>([]);

    useEffect(() => {
        let delay = 0;
        terminalLines.forEach((line) => {
            delay += 800;
            setTimeout(() => {
                setLines((prev) => [...prev, line]);
            }, delay);
        });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg mx-auto bg-[#121212] rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm"
        >
            {/* Terminal Header */}
            <div className="bg-[#1e1e1e] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="ml-2 text-xs text-gray-500">zsh — 80x24</div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 min-h-[300px] flex flex-col gap-2">
                {lines.map((line, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn("flex items-center gap-2", line.color)}
                    >
                        {line.text}
                    </motion.div>
                ))}
                {/* Blinking Cursor */}
                <div className="flex items-center gap-2">
                    <span className="text-blue-500">{">"}</span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="w-2 h-4 bg-blue-500 block"
                    />
                </div>
            </div>
        </motion.div>
    );
}
