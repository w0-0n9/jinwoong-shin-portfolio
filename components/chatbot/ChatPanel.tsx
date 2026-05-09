"use client";

import { useEffect, useRef } from "react";
import { Bot, Loader2, Send, User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { getDocumentNode, GraphNode } from "@/lib/knowledge-graph";
import { FileCard } from "@/components/chatbot/FileCard";

export interface ChatMessage {
    id: string;
    role: "user" | "ai";
    content: string;
    /** AI messages only — list of document node ids to render as file cards. */
    fileIds?: string[];
    /** AI messages only — node ids the answer references (for graph activation). */
    nodeIds?: string[];
}

interface ChatPanelProps {
    messages: ChatMessage[];
    isLoading: boolean;
    input: string;
    onInputChange: (v: string) => void;
    onSend: () => void;
    onOpenFile: (node: GraphNode) => void;
    suggestions?: string[];
}

export function ChatPanel({
    messages,
    isLoading,
    input,
    onInputChange,
    onSend,
    onOpenFile,
    suggestions = [],
}: ChatPanelProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5 bg-[#fbfbfd]">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "")}
                    >
                        <div
                            className={cn(
                                "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5",
                                msg.role === "user" ? "bg-[#0071e3]" : "bg-[#e8e8ed]"
                            )}
                        >
                            {msg.role === "user" ? (
                                <User className="w-4 h-4 text-white" />
                            ) : (
                                <Bot className="w-4 h-4 text-[#0071e3]" />
                            )}
                        </div>

                        <div className={cn("max-w-[88%] flex flex-col gap-2", msg.role === "user" ? "items-end" : "items-start")}>
                            <div
                                className={cn(
                                    "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                                    msg.role === "user"
                                        ? "bg-[#0071e3] text-white rounded-br-md"
                                        : "bg-white border border-[#e8e8ed] text-[#1d1d1f] rounded-bl-md"
                                )}
                            >
                                {msg.role === "ai" ? (
                                    <div className="prose prose-sm max-w-none prose-p:my-1 prose-p:leading-relaxed prose-headings:text-[#1d1d1f] prose-strong:text-[#1d1d1f] prose-ul:my-1 prose-li:my-0.5">
                                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                                    </div>
                                ) : (
                                    msg.content
                                )}
                            </div>

                            {/* File attachments for AI messages */}
                            {msg.role === "ai" && msg.fileIds && msg.fileIds.length > 0 && (
                                <div className="w-full space-y-1.5">
                                    {msg.fileIds.map((fid) => {
                                        const node = getDocumentNode(fid);
                                        if (!node) return null;
                                        return (
                                            <FileCard key={fid} node={node} onOpen={() => onOpenFile(node)} />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#e8e8ed] flex-shrink-0 flex items-center justify-center mt-0.5">
                            <Bot className="w-4 h-4 text-[#0071e3]" />
                        </div>
                        <div className="bg-white border border-[#e8e8ed] px-4 py-2.5 rounded-2xl rounded-bl-md flex items-center gap-2">
                            <Sparkles size={14} className="text-[#0071e3] animate-pulse" />
                            <span className="text-sm text-[#6e6e73]">Searching the graph…</span>
                            <Loader2 className="w-3.5 h-3.5 text-[#86868b] animate-spin" />
                        </div>
                    </div>
                )}

                {messages.length === 1 && suggestions.length > 0 && !isLoading && (
                    <div className="pt-2">
                        <p className="text-xs text-[#86868b] mb-2 uppercase tracking-[0.1em] font-medium">Try asking</p>
                        <div className="flex flex-wrap gap-2">
                            {suggestions.map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => onInputChange(s)}
                                    className="text-xs px-3 py-1.5 rounded-full border border-[#e8e8ed] bg-white text-[#1d1d1f] hover:bg-[#f5f5f7] hover:border-[#d2d2d7] transition-colors text-left"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-[#e8e8ed] bg-white">
                <div className="relative flex items-end gap-2 bg-[#f5f5f7] p-1.5 rounded-2xl border border-[#e8e8ed] focus-within:border-[#0071e3]/50 transition-colors">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => onInputChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about Jinwoong's experience, projects, education…"
                        className="w-full bg-transparent text-[#1d1d1f] placeholder:text-[#86868b] text-sm resize-none focus:outline-none max-h-[100px] py-2 px-2"
                        rows={1}
                    />
                    <button
                        type="button"
                        onClick={onSend}
                        disabled={!input.trim() || isLoading}
                        className="p-2 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                        aria-label="Send"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
