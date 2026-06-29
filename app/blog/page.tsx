import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata: Metadata = {
    title: "Blog — Notes & Writeups",
    description:
        "Bilingual (EN/KO) writeups on RAG, LLM quantization, model compression, on-prem & edge AI, and more — researched from primary sources.",
    alternates: { canonical: "/blog" },
    openGraph: {
        type: "website",
        title: "Blog — Notes & Writeups | Jinwoong Shin",
        description:
            "Bilingual writeups on RAG, LLM quantization, model compression, on-prem & edge AI, and more.",
        url: "/blog",
    },
};

export default function BlogPage() {
    return <BlogIndex />;
}
