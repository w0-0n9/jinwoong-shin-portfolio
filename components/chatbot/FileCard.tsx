"use client";

import { FileText } from "lucide-react";
import { GraphNode } from "@/lib/knowledge-graph";

interface FileCardProps {
    node: GraphNode;
    onOpen: () => void;
}

export function FileCard({ node, onOpen }: FileCardProps) {
    return (
        <button
            type="button"
            onClick={onOpen}
            className="group w-full text-left rounded-xl border border-[#e8e8ed] bg-white px-3 py-2.5 flex items-center gap-3 hover:border-[#d2d2d7] hover:bg-[#fbfbfd] transition-colors"
        >
            <div className="w-9 h-9 rounded-lg bg-[#0071e3]/10 flex items-center justify-center flex-shrink-0">
                <FileText size={16} className="text-[#0071e3]" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[#1d1d1f] truncate group-hover:text-[#0071e3] transition-colors">
                    {node.fileTitle ?? node.label}
                </p>
                {node.description && (
                    <p className="text-xs text-[#86868b] truncate mt-0.5">
                        {node.description}
                    </p>
                )}
            </div>
            <span className="text-xs text-[#86868b] uppercase tracking-wider font-mono flex-shrink-0">PDF</span>
        </button>
    );
}
