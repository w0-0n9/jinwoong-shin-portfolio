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
        primary: "bg-[#0071e3] text-white hover:bg-[#0077ed] border border-transparent",
        secondary: "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#ebebed] border border-[#e8e8ed]",
        ghost: "bg-transparent text-[#1d1d1f] hover:bg-[#f5f5f7]",
        outline: "bg-transparent border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7]"
    };

    const sizes = {
        sm: "px-4 py-1.5 text-sm",
        md: "px-5 py-2 text-sm",
        lg: "px-6 py-3 text-base"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={cn(
                "relative inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
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
