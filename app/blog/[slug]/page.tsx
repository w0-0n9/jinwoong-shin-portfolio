import { notFound } from "next/navigation";
import { getPostBySlug, blogPosts } from "@/lib/blog-data";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { CertificationBadge } from "@/components/blog/CertificationBadge";

import { HtmlPostReader } from "@/components/blog/HtmlPostReader";

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

    if (post.htmlSource) {
        return (
            <main className="min-h-screen bg-[#fbfbf9] text-[#1d1d1f]">
                <Navbar />
                <div className="pt-28 pb-24">
                    <HtmlPostReader
                        src={post.htmlSource}
                        title={post.title}
                        bilingual={post.bilingual}
                        defaultLang="en"
                        currentSlug={post.slug}
                        date={post.date}
                    />
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white text-[#1d1d1f]">
            <Navbar />

            <article className="pt-32 pb-24 px-4 md:px-8 container mx-auto max-w-4xl">
                <div>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors mb-10 group text-sm"
                    >
                        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
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

                {(
                    <div>
                        <header className="mb-12 pb-10 border-b border-[#e8e8ed]">
                            <div className="flex flex-wrap gap-1.5 mb-6">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#f5f5f7] text-[#424245] border border-[#e8e8ed]">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-[1.1] text-[#1d1d1f] tracking-[-0.04em]">
                                {post.title}
                            </h1>
                            <p className="text-xl text-[#6e6e73] leading-[1.5]">
                                {post.description}
                            </p>
                            <div className="mt-6 flex items-center gap-3 text-sm text-[#86868b]">
                                <time>{post.date}</time>
                                <span className="w-1 h-1 bg-[#d2d2d7] rounded-full" />
                                <span>{post.content.length > 5000 ? "10 min read" : "5 min read"}</span>
                            </div>
                        </header>

                        <div className="prose prose-lg max-w-none
                            prose-headings:text-[#1d1d1f] prose-headings:font-semibold prose-headings:tracking-tight prose-headings:scroll-mt-24
                            prose-h1:text-3xl prose-h1:mt-16 prose-h1:mb-6
                            prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-5
                            prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4

                            prose-p:text-[#424245] prose-p:leading-[1.7] prose-p:mb-5

                            prose-a:text-[#0071e3] hover:prose-a:text-[#0077ed] prose-a:no-underline hover:prose-a:underline

                            prose-strong:text-[#1d1d1f] prose-strong:font-semibold

                            prose-ul:text-[#424245] prose-ul:my-5
                            prose-li:marker:text-[#0071e3] prose-li:pl-1 prose-li:mb-1.5

                            prose-code:text-[#1d1d1f] prose-code:bg-[#f5f5f7] prose-code:border prose-code:border-[#e8e8ed] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none

                            prose-pre:bg-[#f5f5f7] prose-pre:border prose-pre:border-[#e8e8ed] prose-pre:rounded-xl prose-pre:p-5 prose-pre:text-[#1d1d1f]

                            prose-blockquote:border-l-2 prose-blockquote:border-[#0071e3] prose-blockquote:bg-[#f5f5f7] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-[#424245] prose-blockquote:my-8

                            prose-th:text-[#1d1d1f] prose-th:bg-[#f5f5f7] prose-th:p-3 prose-th:border prose-th:border-[#e8e8ed] prose-th:text-left prose-th:font-semibold
                            prose-td:text-[#424245] prose-td:p-3 prose-td:border prose-td:border-[#e8e8ed] prose-td:align-top
                            prose-table:border-collapse prose-table:w-full prose-table:my-10">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </article>
        </main>
    );
}
