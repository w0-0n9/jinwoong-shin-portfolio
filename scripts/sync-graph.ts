/**
 * sync-graph.ts
 *
 * Regenerates `functions/src/knowledge-graph.ts` from `lib/knowledge-graph.ts`.
 * Run automatically on `npm prebuild` and as part of `firebase deploy --only functions` predeploy.
 *
 * Why: the Cloud Function bundles its own copy of the graph data (it can't import
 * across the project root). Keeping a hand-edited mirror invites drift. This script
 * removes the mirror as a maintenance surface — edit `lib/knowledge-graph.ts` only.
 *
 * Usage: `npm run sync:graph`
 */

import { writeFileSync } from "fs";
import { resolve } from "path";
import { nodes, edges } from "../lib/knowledge-graph";

const OUT = resolve(__dirname, "../functions/src/knowledge-graph.ts");

const banner = `/**
 * AUTO-GENERATED from lib/knowledge-graph.ts — DO NOT EDIT BY HAND.
 *
 * Run \`npm run sync:graph\` (or just \`npm run build\` / \`firebase deploy\`)
 * to regenerate this file. Any manual edits here will be overwritten.
 *
 * Last generated: ${new Date().toISOString()}
 */
`;

const body = `
export type NodeType =
    | "person"
    | "company"
    | "project"
    | "skill"
    | "certification"
    | "school"
    | "document"
    | "location"
    | "conference"
    | "article";

export interface GraphNode {
    id: string;
    type: NodeType;
    label: string;
    description?: string;
    meta?: Record<string, string | number | boolean>;
    fileSrc?: string;
    fileTitle?: string;
    fileDownloadName?: string;
    imageSrc?: string;
    imageAlt?: string;
}

export interface GraphEdge {
    source: string;
    target: string;
    relation: string;
}

export const nodes: GraphNode[] = ${JSON.stringify(nodes, null, 4)};

export const edges: GraphEdge[] = ${JSON.stringify(
    edges.map((e) => ({ source: e.source, target: e.target, relation: e.relation })),
    null,
    4
)};

export const validNodeIds: ReadonlySet<string> = new Set(nodes.map((n) => n.id));
`;

writeFileSync(OUT, banner + body, "utf-8");

const nodeCount = nodes.length;
const edgeCount = edges.length;
const docCount = nodes.filter((n) => n.type === "document").length;
const imgCount = nodes.filter((n) => n.imageSrc).length;

console.log(
    `✓ wrote ${OUT}\n` +
        `  ${nodeCount} nodes (${docCount} documents, ${imgCount} with images) · ${edgeCount} edges`
);
