import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";

const BASE = "https://jinwoong-shin-portfolio.web.app";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    // Avoid new Date() (non-deterministic); use the newest post date as a stamp.
    const latest = [...blogPosts.map((p) => p.date)].sort().reverse()[0] ?? "2026-06-29";

    const staticPages: MetadataRoute.Sitemap = [
        { url: `${BASE}/`, lastModified: latest, changeFrequency: "monthly", priority: 1.0 },
        { url: `${BASE}/blog`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE}/chat`, lastModified: latest, changeFrequency: "monthly", priority: 0.6 },
    ];

    const posts: MetadataRoute.Sitemap = blogPosts.map((p) => ({
        url: `${BASE}/blog/${p.slug}`,
        lastModified: p.date,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [...staticPages, ...posts];
}
