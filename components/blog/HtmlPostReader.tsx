"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

type Lang = "en" | "ko";

const LANG_KEY = "blog-lang";
const LANG_EVENT = "blog-lang-change";

function readStoredLang(fallback: Lang): Lang {
    try {
        const v = window.localStorage.getItem(LANG_KEY);
        if (v === "en" || v === "ko") return v;
    } catch {
        /* storage may be unavailable */
    }
    return fallback;
}

function subscribeLang(callback: () => void) {
    window.addEventListener("storage", callback);
    window.addEventListener(LANG_EVENT, callback);
    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener(LANG_EVENT, callback);
    };
}

interface TocItem {
    id: string;
    n: string;
    ko: string;
    en: string;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Format an ISO date ("2026-06-29") without Date() to avoid timezone drift.
function formatDate(iso: string, lang: Lang): string {
    const parts = iso.split("-").map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN)) return iso;
    const [y, m, d] = parts;
    return lang === "ko" ? `${y}년 ${m}월 ${d}일` : `${MONTHS[m - 1]} ${d}, ${y}`;
}

interface HtmlPostReaderProps {
    src: string;
    title: string;
    /** Enables the EN / 한국어 floating toggle and language syncing. */
    bilingual?: boolean;
    /** Language shown before the visitor has made a choice. */
    defaultLang?: Lang;
    /** Slug of the post being read — excluded from the "Read next" list. */
    currentSlug?: string;
    /** ISO publish date ("2026-06-29"), shown above the article. */
    date?: string;
}

// Top offset (px) used both for sticky positioning and scroll-spy thresholds.
const NAV_OFFSET = 96;

export function HtmlPostReader({
    src,
    title,
    bilingual = false,
    defaultLang = "en",
    currentSlug,
    date,
}: HtmlPostReaderProps) {
    const morePosts = blogPosts.filter((p) => p.slug !== currentSlug).slice(0, 3);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [height, setHeight] = useState("80vh");
    const [toc, setToc] = useState<TocItem[]>([]);
    const tocRef = useRef<TocItem[]>([]);
    const [activeId, setActiveId] = useState("");
    const [progress, setProgress] = useState(0);
    const [readMinutes, setReadMinutes] = useState(0);

    const lang = useSyncExternalStore(
        subscribeLang,
        () => readStoredLang(defaultLang),
        () => defaultLang,
    );
    const langRef = useRef<Lang>(defaultLang);

    const setLang = useCallback((next: Lang) => {
        try {
            window.localStorage.setItem(LANG_KEY, next);
        } catch {
            /* storage may be unavailable */
        }
        window.dispatchEvent(new Event(LANG_EVENT));
    }, []);

    const recomputeHeight = useCallback(() => {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentWindow) {
            setHeight(`${iframe.contentWindow.document.body.scrollHeight + 40}px`);
        }
    }, []);

    // Estimate reading time from the visible-language text (innerText skips the
    // hidden language). ~200 English words/min + ~500 CJK chars/min.
    const computeReadMinutes = useCallback(() => {
        try {
            const text = iframeRef.current?.contentDocument?.body?.innerText ?? "";
            if (!text) return;
            const cjkRe = /[ㄱ-힝一-鿿぀-ヿ]/g;
            const cjk = (text.match(cjkRe) || []).length;
            const words = (text.replace(cjkRe, " ").match(/[A-Za-z0-9]+/g) || []).length;
            const minutes = Math.max(1, Math.round(words / 200 + cjk / 500));
            setReadMinutes(minutes);
        } catch {
            /* cross-origin guard */
        }
    }, []);

    const applyLang = useCallback((next: Lang) => {
        const iframe = iframeRef.current;
        try {
            iframe?.contentDocument?.documentElement.setAttribute("data-lang", next);
        } catch {
            /* cross-origin guard — no-op */
        }
        setTimeout(recomputeHeight, 60);
    }, [recomputeHeight]);

    useEffect(() => {
        langRef.current = lang;
    }, [lang]);

    useEffect(() => {
        tocRef.current = toc;
    }, [toc]);

    // On load: mark the doc as embedded (hides its own TOC/progress), read its
    // table of contents, set language, and watch for height changes.
    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        let observer: ResizeObserver | undefined;

        const handleLoad = () => {
            const doc = iframe.contentDocument;
            try {
                doc?.documentElement.setAttribute("data-embed", "");
            } catch {
                /* cross-origin guard */
            }
            if (bilingual) applyLang(langRef.current);
            recomputeHeight();

            try {
                const anchors = Array.from(doc?.querySelectorAll("#toc a") ?? []);
                const items: TocItem[] = anchors
                    .map((a) => {
                        const href = a.getAttribute("href") || "";
                        const id = href.startsWith("#") ? href.slice(1) : "";
                        const n = a.querySelector(".n")?.textContent?.trim() || "";
                        const ko = a.querySelector(".lang-ko")?.textContent?.trim() || "";
                        const en = a.querySelector(".lang-en")?.textContent?.trim() || "";
                        let fallback = "";
                        if (!ko && !en) {
                            const clone = a.cloneNode(true) as HTMLElement;
                            clone.querySelector(".n")?.remove();
                            fallback = clone.textContent?.trim() || "";
                        }
                        return { id, n, ko: ko || fallback, en: en || fallback };
                    })
                    .filter((i) => i.id);
                setToc(items);
            } catch {
                /* cross-origin guard */
            }

            try {
                const body = iframe.contentDocument?.body;
                if (body && typeof ResizeObserver !== "undefined") {
                    observer = new ResizeObserver(() => recomputeHeight());
                    observer.observe(body);
                }
            } catch {
                /* cross-origin guard */
            }

            // After the shared stylesheet has applied (so the hidden language is
            // excluded), estimate the reading time.
            setTimeout(computeReadMinutes, 200);
        };

        iframe.addEventListener("load", handleLoad);
        window.addEventListener("resize", recomputeHeight);

        return () => {
            iframe.removeEventListener("load", handleLoad);
            window.removeEventListener("resize", recomputeHeight);
            observer?.disconnect();
        };
    }, [bilingual, applyLang, recomputeHeight, computeReadMinutes]);

    // Apply language changes triggered by the toggle, and re-estimate read time.
    useEffect(() => {
        if (bilingual) applyLang(lang);
        const t = setTimeout(computeReadMinutes, 120);
        return () => clearTimeout(t);
    }, [lang, bilingual, applyLang, computeReadMinutes]);

    // Drive the progress gauge + active-section highlight from the window scroll.
    useEffect(() => {
        let raf = 0;
        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                const iframe = iframeRef.current;
                if (!iframe) return;
                const rect = iframe.getBoundingClientRect();
                const vh = window.innerHeight;
                const total = rect.height - vh;
                const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
                const p = total > 0 ? scrolled / total : rect.top <= 0 ? 1 : 0;
                setProgress(Math.min(1, Math.max(0, p)));

                const doc = iframe.contentDocument;
                if (!doc) return;
                let current = "";
                for (const item of tocRef.current) {
                    const el = doc.getElementById(item.id);
                    if (!el) continue;
                    const top = rect.top + el.getBoundingClientRect().top;
                    if (top - NAV_OFFSET - 24 <= 0) current = item.id;
                }
                if (!current && tocRef.current[0]) current = tocRef.current[0].id;
                setActiveId(current);
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        onScroll();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    const scrollToSection = useCallback((id: string) => {
        const iframe = iframeRef.current;
        const el = iframe?.contentDocument?.getElementById(id);
        if (!iframe || !el) return;
        const rect = iframe.getBoundingClientRect();
        const target = window.scrollY + rect.top + el.getBoundingClientRect().top - NAV_OFFSET;
        window.scrollTo({ top: target, behavior: "smooth" });
    }, []);

    return (
        <>
            {/* reading progress gauge */}
            <div aria-hidden className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-[#0071e3]/10">
                <div
                    className="h-full bg-[#0071e3] transition-[width] duration-100 ease-out"
                    style={{ width: `${progress * 100}%` }}
                />
            </div>

            <div className="mx-auto w-full max-w-[1200px] px-6 lg:grid lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-12">
                {/* left table of contents (desktop) */}
                <aside className="hidden lg:block">
                    <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
                        <Link
                            href="/blog"
                            className="group inline-flex items-center gap-2 text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors mb-7"
                        >
                            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                            Back to Blog
                        </Link>

                        {toc.length > 0 && (
                            <>
                                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#86868b] mb-3">
                                    {lang === "ko" ? "목차" : "Contents"}
                                </p>
                                <nav className="flex flex-col">
                                    {toc.map((item) => {
                                        const label = lang === "ko" ? item.ko : item.en;
                                        const active = activeId === item.id;
                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => scrollToSection(item.id)}
                                                className={`text-left flex gap-2.5 items-baseline py-[7px] pl-3.5 -ml-px border-l-2 transition-colors ${
                                                    active
                                                        ? "border-[#0071e3] text-[#0058c4] font-semibold"
                                                        : "border-transparent text-[#6e6e73] hover:text-[#1d1d1f]"
                                                }`}
                                            >
                                                <span
                                                    className={`font-mono text-[11px] tabular-nums ${
                                                        active ? "text-[#0071e3]" : "text-[#a1a1a8]"
                                                    }`}
                                                >
                                                    {item.n}
                                                </span>
                                                <span className="text-[13.5px] leading-snug">{label}</span>
                                            </button>
                                        );
                                    })}
                                </nav>
                            </>
                        )}
                    </div>
                </aside>

                {/* mobile back link */}
                <div className="lg:hidden mb-6">
                    <Link
                        href="/blog"
                        className="group inline-flex items-center gap-2 text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
                    >
                        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                        Back to Blog
                    </Link>
                </div>

                {/* article content — full-bleed, sits directly on the page background */}
                <div className="min-w-0">
                    {/* date · reading time, aligned to the article's reading width */}
                    {(date || readMinutes > 0) && (
                        <div className="mx-auto max-w-[740px] mb-2 flex items-center gap-2 text-sm text-[#86868b]">
                            {date && <time dateTime={date}>{formatDate(date, lang)}</time>}
                            {date && readMinutes > 0 && <span className="w-1 h-1 rounded-full bg-[#d2d2d7]" />}
                            {readMinutes > 0 && <span>{readMinutes}{lang === "ko" ? "분 읽기" : " min read"}</span>}
                        </div>
                    )}
                    <iframe
                        ref={iframeRef}
                        src={src}
                        title={title}
                        scrolling="no"
                        className="block w-full border-none bg-transparent"
                        style={{ height }}
                    />

                    {/* Read next — other writeups, aligned to the article's reading width */}
                    {morePosts.length > 0 && (
                        <div className="mx-auto max-w-[740px] px-6 lg:px-0 mt-4 mb-20 pt-10 border-t border-[#e8e8ed]">
                            <h2 className="text-lg font-semibold tracking-tight text-[#1d1d1f] mb-5">
                                {lang === "ko" ? "다음 읽을거리" : "Read next"}
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {morePosts.map((p) => (
                                    <Link
                                        key={p.slug}
                                        href={`/blog/${p.slug}`}
                                        className="group block rounded-2xl border border-[#e8e8ed] bg-white p-5 hover:border-[#d2d2d7] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] transition-all"
                                    >
                                        <div className="flex flex-wrap gap-1.5 mb-2.5">
                                            {p.tags.slice(0, 2).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#f5f5f7] text-[#424245] border border-[#e8e8ed]"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-base font-semibold leading-snug text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors line-clamp-2">
                                            {p.title}
                                        </h3>
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-xs text-[#86868b]">{p.date}</span>
                                            <ArrowRight
                                                size={14}
                                                className="text-[#0071e3] group-hover:translate-x-0.5 transition-transform"
                                            />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {bilingual && (
                <div
                    role="group"
                    aria-label="Language"
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-0.5 rounded-full border border-[#e8e8ed] bg-white/85 p-1 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.25)] backdrop-blur-md"
                >
                    {(["en", "ko"] as const).map((l) => (
                        <button
                            key={l}
                            type="button"
                            onClick={() => setLang(l)}
                            aria-pressed={lang === l}
                            className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors ${
                                lang === l ? "bg-[#0071e3] text-white" : "text-[#6e6e73] hover:text-[#1d1d1f]"
                            }`}
                        >
                            {l === "en" ? "EN" : "한국어"}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
}
