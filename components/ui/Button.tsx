"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

export function Button({
    className,
    variant = "primary",
    size = "md",
    children,
    ...props
}: ButtonProps) {

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-transparent",
        secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10",
        ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
        outline: "bg-transparent border border-white/20 text-gray-300 hover:border-white/50 hover:text-white"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:pointer-events-none",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
