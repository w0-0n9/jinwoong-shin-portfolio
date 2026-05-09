"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";
import { GraphNode, getDocumentNode, validNodeIds } from "@/lib/knowledge-graph";
import { GraphView } from "@/components/chatbot/GraphView";
import { ChatPanel, ChatMessage } from "@/components/chatbot/ChatPanel";
import { PdfViewerModal, PdfViewerInfo } from "@/components/chatbot/PdfViewerModal";
import { useAIAssistant } from "@/lib/ai-assistant-context";

interface ChatResponseShape {
    answer: string;
    relevantNodeIds: string[];
    relevantFileIds: string[];
}

const SUGGESTIONS = [
    "What is Jinwoong working on right now?",
    "Tell me about the LG return analysis project.",
    "Where did Jinwoong study?",
    "Show me his resume.",
];

const WELCOME: ChatMessage = {
    id: "welcome",
    role: "ai",
    content:
        "Hi — I'm an AI assistant grounded in Jinwoong's knowledge graph. Ask me about his experience, projects, education, or credentials. I'll highlight relevant nodes on the left as I find them, and surface any documents you can open inline.",
};

export default function AIChatBot() {
    const { isOpen, open, close } = useAIAssistant();
    const setOpen = useCallback(
        (next: boolean) => {
            if (next) open();
            else close();
        },
        [open, close]
    );

    const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeNodeIds, setActiveNodeIds] = useState<string[]>([]);
    const [pdf, setPdf] = useState<PdfViewerInfo | null>(null);

    const fadeTimeoutRef = useRef<number | null>(null);

    const handleSend = useCallback(async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: ChatMessage = {
            id: `u-${Date.now()}`,
            role: "user",
            content: input.trim(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const askAI = httpsCallable<{ question: string }, ChatResponseShape>(functions, "onAskAI");
            const result = await askAI({ question: userMsg.content });
            const data = result.data;

            const validatedNodeIds = (data.relevantNodeIds ?? []).filter((id) => validNodeIds.has(id));
            const validatedFileIds = (data.relevantFileIds ?? []).filter((id) => !!getDocumentNode(id));

            const aiMsg: ChatMessage = {
                id: `a-${Date.now()}`,
                role: "ai",
                content: data.answer,
                fileIds: validatedFileIds,
                nodeIds: validatedNodeIds,
            };
            setMessages((prev) => [...prev, aiMsg]);

            // Activate relevant nodes in the graph
            setActiveNodeIds(validatedNodeIds);

            // Auto-fade after a few seconds so the next question starts clean
            if (fadeTimeoutRef.current) window.clearTimeout(fadeTimeoutRef.current);
            fadeTimeoutRef.current = window.setTimeout(() => {
                setActiveNodeIds([]);
            }, 12_000);
        } catch (err) {
            console.error("Chat send failed:", err);
            setMessages((prev) => [
                ...prev,
                {
                    id: `e-${Date.now()}`,
                    role: "ai",
                    content: "Sorry — I hit an error reaching the model. Please try again in a moment.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading]);

    // Lock body scroll when open
    useEffect(() => {
        if (!isOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !pdf) setOpen(false);
        };
        window.addEventListener("keydown", handleKey);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKey);
        };
    }, [isOpen, pdf, setOpen]);

    const openFile = (node: GraphNode) => {
        if (!node.fileSrc) return;
        setPdf({
            src: node.fileSrc,
            title: node.fileTitle ?? node.label,
            downloadName: node.fileDownloadName,
        });
    };

    const handleNodeClick = (node: GraphNode) => {
        if (node.type === "document" && node.fileSrc) {
            openFile(node);
            return;
        }
        // Otherwise pre-fill the input with a question about this node
        setInput(`Tell me about ${node.label}.`);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-40 p-3.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full shadow-[0_8px_24px_-8px_rgba(0,113,227,0.45)] transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
            >
                {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
            </motion.button>

            {/* Fullscreen Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[90] bg-white"
                        role="dialog"
                        aria-modal="true"
                        aria-label="AI Assistant"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <header className="flex items-center justify-between px-5 py-3 border-b border-[#e8e8ed] bg-white/90 backdrop-blur-sm flex-shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-[#0071e3]/10 flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-[#0071e3]" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-semibold text-[#1d1d1f] tracking-tight">
                                            AI Assistant
                                        </h2>
                                        <p className="text-xs text-[#86868b]">
                                            Grounded in Jinwoong&apos;s knowledge graph · Vertex AI
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="p-2 rounded-full text-[#424245] hover:bg-[#f5f5f7] hover:text-[#1d1d1f] transition-colors"
                                    aria-label="Close"
                                >
                                    <X size={16} />
                                </button>
                            </header>

                            {/* Body: Graph (md+) + Chat (always) */}
                            <div className="flex-1 flex overflow-hidden">
                                {/* Graph — desktop only. On mobile we keep the chat focused; the graph
                                    is hard to interact with on small screens and the file cards inline
                                    in the chat already convey the most important context. */}
                                <section className="hidden md:flex md:flex-[1.6_1_0%] border-r border-[#e8e8ed] bg-white relative overflow-hidden">
                                    <GraphView activeIds={activeNodeIds} onNodeClick={handleNodeClick} />
                                    <div className="pointer-events-none absolute bottom-3 left-4 text-xs text-[#86868b] tabular-nums">
                                        {activeNodeIds.length > 0
                                            ? `${activeNodeIds.length} node${activeNodeIds.length === 1 ? "" : "s"} highlighted`
                                            : "Idle · ask a question to traverse"}
                                    </div>
                                </section>

                                {/* Chat — always visible. Full width on mobile. */}
                                <section className="flex-1 bg-white flex flex-col overflow-hidden md:max-w-[460px]">
                                    <ChatPanel
                                        messages={messages}
                                        isLoading={isLoading}
                                        input={input}
                                        onInputChange={setInput}
                                        onSend={handleSend}
                                        onOpenFile={openFile}
                                        suggestions={SUGGESTIONS}
                                    />
                                </section>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PDF Viewer (over everything) */}
            <PdfViewerModal pdf={pdf} onClose={() => setPdf(null)} />
        </>
    );
}
