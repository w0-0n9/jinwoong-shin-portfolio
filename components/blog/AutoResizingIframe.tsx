"use client";

import { useEffect, useRef, useState } from "react";

interface AutoResizingIframeProps {
    src: string;
    title: string;
}

export function AutoResizingIframe({ src, title }: AutoResizingIframeProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [height, setHeight] = useState("85vh");

    useEffect(() => {
        const handleResize = () => {
            const iframe = iframeRef.current;
            if (iframe && iframe.contentWindow) {
                // Add a small buffer to prevent potential precision issues
                const newHeight = iframe.contentWindow.document.body.scrollHeight + 50;
                setHeight(`${newHeight}px`);
            }
        };

        const iframe = iframeRef.current;
        if (iframe) {
            iframe.addEventListener("load", handleResize);
        }

        // Also listen for window resize events to adjust if the width changes
        window.addEventListener("resize", handleResize);

        return () => {
            if (iframe) {
                iframe.removeEventListener("load", handleResize);
            }
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="w-full max-w-5xl mx-4 bg-white rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 mb-24">
            <iframe
                ref={iframeRef}
                src={src}
                className="w-full border-none transition-all duration-300"
                style={{ height }}
                title={title}
                scrolling="no"
            />
        </div>
    );
}
