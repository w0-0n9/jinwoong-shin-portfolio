import { readFileSync } from "fs";
import { join } from "path";

const ENTITIES: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&nbsp;": " ",
};

/**
 * Build-time only. The visible article is rendered in an iframe (great design,
 * but iframe content isn't attributed to the parent page by search engines).
 * This pulls the plain text out of the self-contained blog-html file so the
 * /blog/<slug> page can expose the full article to crawlers (rendered sr-only).
 * Both languages are included — the posts are bilingual.
 */
export function getArticleText(slug: string): string {
    try {
        const file = join(process.cwd(), "public", "blog-html", `${slug}.html`);
        const html = readFileSync(file, "utf8");
        const main = /<main[\s\S]*?>([\s\S]*?)<\/main>/i.exec(html)?.[1] ?? "";
        return main
            .replace(/<script[\s\S]*?<\/script>/gi, " ")
            .replace(/<[^>]+>/g, " ")
            .replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;/g, (m) => ENTITIES[m] ?? " ")
            .replace(/\s+/g, " ")
            .trim();
    } catch {
        return "";
    }
}
