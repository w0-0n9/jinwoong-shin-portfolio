import { notFound } from "next/navigation";
import { getPostBySlug, blogPosts } from "@/lib/blog-data";
import { Navbar } from "@/components/layout/Navbar";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { CertificationBadge } from "@/components/blog/CertificationBadge";

import { AutoResizingIframe } from "@/components/blog/AutoResizingIframe";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 relative">
            <BackgroundGrid />
            <div className="relative z-10">
                <Navbar />

                <article className={post.htmlSource ? "w-full min-h-screen flex flex-col pt-32 pb-0 items-center" : "pt-32 pb-24 px-4 md:px-8 container mx-auto max-w-6xl"}>
                    <div className={post.htmlSource ? "w-full max-w-5xl px-6 mb-6" : ""}>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>

                        {post.certification && (
                            <CertificationBadge
                                title={post.certification.title || post.title}
                                issuer={post.certification.issuer}
                                date={post.certification.date}
                                image={post.certification.image}
                                link={post.certification.link}
                            />
                        )}
                    </div>

                    {post.htmlSource ? (
                        <AutoResizingIframe src={post.htmlSource} title={post.title} />
                    ) : (
                        /* Standard Markdown Blog Post */
                        <div className="bg-[#111111]/80 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl">
                            <header className="mb-16 border-b border-white/10 pb-10">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 tracking-wide">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight text-white tracking-tight">
                                    {post.title}
                                </h1>
                                <p className="text-xl text-gray-300 leading-relaxed font-light">
                                    {post.description}
                                </p>
                                <div className="mt-6 flex items-center gap-4 text-sm text-gray-500 font-mono">
                                    <time>{post.date}</time>
                                    <span>•</span>
                                    <span>{post.content.length > 5000 ? "10 min read" : "5 min read"}</span>
                                </div>
                            </header>

                            <div className="prose prose-invert prose-lg md:prose-xl max-w-none 
                                prose-headings:text-white prose-headings:font-bold prose-headings:scroll-mt-24
                                prose-h1:text-4xl prose-h1:border-b prose-h1:border-white/10 prose-h1:pb-4 prose-h1:mb-8
                                prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-blue-100
                                prose-h3:text-2xl prose-h3:mt-12 prose-h3:text-blue-200/90
                                
                                prose-p:text-gray-300 prose-p:leading-8 prose-p:mb-6
                                
                                prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-a:transition-colors prose-a:no-underline hover:prose-a:underline
                                
                                prose-strong:text-white prose-strong:font-bold
                                
                                prose-ul:text-gray-300 prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                                prose-li:marker:text-blue-500 prose-li:pl-2 prose-li:mb-2
                                
                                prose-code:text-blue-300 prose-code:bg-[#1a1a1a] prose-code:border prose-code:border-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                                
                                prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:p-6 prose-pre:shadow-lg
                                
                                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-500/10 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-blue-100 prose-blockquote:not-italic prose-blockquote:my-12
                                
                                prose-th:text-white prose-th:bg-blue-950/30 prose-th:p-4 prose-th:border prose-th:border-white/10 prose-th:text-left prose-th:font-semibold
                                prose-td:text-gray-300 prose-td:p-4 prose-td:border prose-td:border-white/10 prose-td:align-top
                                prose-tr:border-b prose-tr:border-white/5 last:prose-tr:border-none 
                                prose-table:border-collapse prose-table:w-full prose-table:bg-[#1a1a1a]/50 prose-table:rounded-xl prose-table:overflow-hidden prose-table:my-12 prose-table:shadow-lg">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {post.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    )}
                </article>
            </div>
        </main>
    );
}
