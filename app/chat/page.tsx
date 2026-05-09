"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";
import { GraphNode, getDocumentNode, validNodeIds } from "@/lib/knowledge-graph";
import { GraphView } from "@/components/chatbot/GraphView";
import { ChatPanel, ChatMessage } from "@/components/chatbot/ChatPanel";
import { PdfViewerModal, PdfViewerInfo } from "@/components/chatbot/PdfViewerModal";

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

export default function ChatPage() {
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
        <main className="fixed inset-0 z-50 bg-white flex flex-col h-[100dvh] overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between px-5 py-3 border-b border-[#e8e8ed] bg-white/90 backdrop-blur-sm flex-shrink-0 safe-pt">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0071e3]/10 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-[#0071e3]" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-[#1d1d1f] tracking-tight">
                            AI Assistant
                        </h2>
                        <p className="text-xs text-[#86868b] hidden sm:block">
                            Grounded in Jinwoong&apos;s knowledge graph · Vertex AI
                        </p>
                    </div>
                </div>

                <Link
                    href="/"
                    className="flex items-center gap-2 p-2 rounded-full md:rounded-lg md:px-3 text-[#424245] hover:bg-[#f5f5f7] hover:text-[#1d1d1f] transition-colors"
                >
                    <ArrowLeft size={16} />
                    <span className="text-sm font-medium hidden md:inline">Back to Portfolio</span>
                </Link>
            </header>

            {/* Body: Graph (md+) + Chat (always) */}
            <div className="flex-1 flex overflow-hidden">
                {/* Graph — desktop only. On mobile we keep the chat focused */}
                <section className="hidden md:flex md:flex-[1.6_1_0%] border-r border-[#e8e8ed] bg-white relative overflow-hidden">
                    <GraphView activeIds={activeNodeIds} onNodeClick={handleNodeClick} />
                    <div className="pointer-events-none absolute bottom-3 left-4 text-xs text-[#86868b] tabular-nums">
                        {activeNodeIds.length > 0
                            ? `${activeNodeIds.length} node${activeNodeIds.length === 1 ? "" : "s"} highlighted`
                            : "Idle · ask a question to traverse"}
                    </div>
                </section>

                {/* Chat — always visible. Full width on mobile. */}
                <section className="flex-1 bg-white flex flex-col overflow-hidden md:max-w-[460px] lg:max-w-[500px]">
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

            {/* PDF Viewer */}
            <PdfViewerModal pdf={pdf} onClose={() => setPdf(null)} />
        </main>
    );
}
