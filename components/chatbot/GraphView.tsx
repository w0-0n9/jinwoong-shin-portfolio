"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import type { ForceGraphMethods } from "react-force-graph-2d";
import { nodes as graphNodes, edges as graphEdges, GraphNode, NodeType } from "@/lib/knowledge-graph";

// Client-only — Canvas + d3-force can't render on the server.
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

interface GraphViewProps {
    /** Currently activated node IDs (rendered with pulse + glow). */
    activeIds: string[];
    /** Called when the user clicks a node. */
    onNodeClick?: (node: GraphNode) => void;
}

interface ForceNode extends GraphNode {
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number;
    fy?: number;
}

interface ForceLink {
    source: string | ForceNode;
    target: string | ForceNode;
    relation: string;
}

const NODE_COLORS: Record<NodeType, string> = {
    person: "#0071e3",
    company: "#1d1d1f",
    project: "#5e5ce6",
    skill: "#86868b",
    certification: "#bf5af2",
    school: "#34c759",
    document: "#ff9500",
    location: "#a1a1a6",
    conference: "#ff375f",
};

const NODE_RADIUS_BASE: Record<NodeType, number> = {
    person: 10,
    company: 7,
    project: 7,
    skill: 4,
    certification: 6,
    school: 7,
    document: 6,
    location: 4,
    conference: 6,
};

export function GraphView({ activeIds, onNodeClick }: GraphViewProps) {
    const fgRef = useRef<ForceGraphMethods<ForceNode, ForceLink> | undefined>(undefined);
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ w: 800, h: 600 });
    const [hoverId, setHoverId] = useState<string | null>(null);
    const pulseStartRef = useRef<Map<string, number>>(new Map());

    const data = useMemo(
        () => ({
            nodes: graphNodes.map((n): ForceNode => ({ ...n })),
            links: graphEdges.map((e): ForceLink => ({ source: e.source, target: e.target, relation: e.relation })),
        }),
        []
    );

    const activeSet = useMemo(() => new Set(activeIds), [activeIds]);

    // Restart pulse timing whenever the active set changes
    useEffect(() => {
        const now = performance.now();
        activeIds.forEach((id, idx) => {
            // Stagger the pulse-start so nodes light up sequentially
            pulseStartRef.current.set(id, now + idx * 180);
        });
        // Clean up entries no longer active
        for (const id of pulseStartRef.current.keys()) {
            if (!activeSet.has(id)) pulseStartRef.current.delete(id);
        }

        // Camera: fit the active subgraph (or zoom out fully when idle)
        const fg = fgRef.current;
        if (!fg) return;

        if (activeIds.length === 0) {
            fg.zoomToFit(600, 60);
            return;
        }

        // Compute bounding box of active nodes; wait briefly for force sim to settle if positions missing
        const fitToActive = () => {
            const activeNodes = (data.nodes as ForceNode[]).filter(
                (n) => activeSet.has(n.id) && n.x !== undefined && n.y !== undefined
            );
            if (activeNodes.length === 0) return;

            if (activeNodes.length === 1) {
                const n = activeNodes[0];
                fg.centerAt(n.x!, n.y!, 800);
                fg.zoom(3, 800);
                return;
            }

            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            for (const n of activeNodes) {
                minX = Math.min(minX, n.x!);
                maxX = Math.max(maxX, n.x!);
                minY = Math.min(minY, n.y!);
                maxY = Math.max(maxY, n.y!);
            }
            const cx = (minX + maxX) / 2;
            const cy = (minY + maxY) / 2;
            const padding = 80;
            const spanX = Math.max(maxX - minX + padding * 2, 200);
            const spanY = Math.max(maxY - minY + padding * 2, 200);
            const zoomX = (containerRef.current?.clientWidth ?? 800) / spanX;
            const zoomY = (containerRef.current?.clientHeight ?? 600) / spanY;
            const zoom = Math.min(zoomX, zoomY, 3.5);

            fg.centerAt(cx, cy, 800);
            fg.zoom(zoom, 800);
        };

        // Try immediately, and again after a tick in case the simulation is mid-flight
        fitToActive();
        const t = window.setTimeout(fitToActive, 350);
        return () => window.clearTimeout(t);
    }, [activeIds, activeSet, data.nodes]);

    // Track container size for the canvas
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
            }
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const renderNode = useCallback(
        (rawNode: object, ctx: CanvasRenderingContext2D, globalScale: number) => {
            const node = rawNode as ForceNode;
            if (node.x === undefined || node.y === undefined) return;
            const isActive = activeSet.has(node.id);
            const isHover = hoverId === node.id;
            // When a question is being answered, hide all non-relevant nodes entirely.
            if (activeSet.size > 0 && !isActive) return;
            const baseR = NODE_RADIUS_BASE[node.type] ?? 5;
            const color = NODE_COLORS[node.type] ?? "#86868b";

            // Pulse halo for active nodes (sequential start time)
            if (isActive) {
                const start = pulseStartRef.current.get(node.id) ?? performance.now();
                const t = Math.max(0, performance.now() - start) / 1500; // 1.5s cycle
                const phase = (t % 1);
                const haloR = baseR + 4 + phase * 18;
                const haloAlpha = (1 - phase) * 0.45;
                ctx.beginPath();
                ctx.arc(node.x, node.y, haloR, 0, 2 * Math.PI);
                ctx.fillStyle = hexToRgba(color, haloAlpha);
                ctx.fill();
            }

            // Main node
            ctx.beginPath();
            ctx.arc(node.x, node.y, baseR + (isActive || isHover ? 1.5 : 0), 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.globalAlpha = isActive || isHover ? 1 : 0.85;
            ctx.fill();
            ctx.globalAlpha = 1;

            // Ring on active
            if (isActive || isHover) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, baseR + 2.5, 0, 2 * Math.PI);
                ctx.strokeStyle = color;
                ctx.lineWidth = 1.2 / globalScale;
                ctx.stroke();
            }

            // Label — always show on active subgraph (everyone visible is relevant)
            const showLabel = isActive || isHover || activeSet.size > 0 || globalScale > 1.6;
            if (showLabel) {
                const fontSize = Math.max(10, 12 / globalScale);
                ctx.font = `${isActive || isHover ? "600" : "500"} ${fontSize}px -apple-system, "SF Pro Text", Inter, sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "top";
                const labelY = node.y + baseR + 4;
                // Soft white background pill behind text
                const textWidth = ctx.measureText(node.label).width;
                const pad = 4;
                ctx.fillStyle = "rgba(255,255,255,0.92)";
                ctx.fillRect(node.x - textWidth / 2 - pad, labelY - 1, textWidth + pad * 2, fontSize + 4);
                ctx.fillStyle = "#1d1d1f";
                ctx.fillText(node.label, node.x, labelY);
            }
        },
        [activeSet, hoverId]
    );

    const renderLink = useCallback(
        (rawLink: object, ctx: CanvasRenderingContext2D, globalScale: number) => {
            const link = rawLink as ForceLink;
            const a = link.source as ForceNode;
            const b = link.target as ForceNode;
            if (!a || !b || a.x === undefined || a.y === undefined || b.x === undefined || b.y === undefined) return;

            const aActive = activeSet.has(a.id);
            const bActive = activeSet.has(b.id);

            // When a question is active, only show edges entirely within the active subgraph.
            if (activeSet.size > 0 && !(aActive && bActive)) return;

            const isHighlighted = aActive && bActive;
            ctx.strokeStyle = isHighlighted ? "rgba(0,113,227,0.55)" : "rgba(0,0,0,0.12)";
            ctx.lineWidth = (isHighlighted ? 1.4 : 0.8) / globalScale;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        },
        [activeSet]
    );

    // ForceGraph2D loses its generics through next/dynamic, so we cast props at the boundary.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const FG = ForceGraph2D as unknown as React.ComponentType<any>;

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white">
            {size.w > 0 && (
                <FG
                    ref={fgRef}
                    width={size.w}
                    height={size.h}
                    graphData={data}
                    backgroundColor="#ffffff"
                    nodeRelSize={6}
                    nodeCanvasObject={renderNode}
                    nodeCanvasObjectMode={() => "replace"}
                    linkCanvasObject={renderLink}
                    linkCanvasObjectMode={() => "replace"}
                    linkDirectionalParticles={0}
                    cooldownTime={4000}
                    d3AlphaDecay={0.02}
                    d3VelocityDecay={0.3}
                    onNodeClick={(n: object) => onNodeClick?.(n as GraphNode)}
                    onNodeHover={(n: object | null) => setHoverId(n ? (n as ForceNode).id : null)}
                    enableNodeDrag
                />
            )}
        </div>
    );
}

function hexToRgba(hex: string, a: number): string {
    const m = hex.replace("#", "");
    const v =
        m.length === 3
            ? m
                  .split("")
                  .map((c) => c + c)
                  .join("")
            : m;
    const r = parseInt(v.slice(0, 2), 16);
    const g = parseInt(v.slice(2, 4), 16);
    const b = parseInt(v.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
}
