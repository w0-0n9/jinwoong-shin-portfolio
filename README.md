# Jinwoong Shin — Portfolio

[![Live Site](https://img.shields.io/badge/live-jinwoong--shin--portfolio.web.app-0071e3)](https://jinwoong-shin-portfolio.web.app)
[![Stack](https://img.shields.io/badge/Next.js-16-000000)](https://nextjs.org)
[![Stack](https://img.shields.io/badge/TypeScript-5-3178c6)](https://www.typescriptlang.org)
[![Stack](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com)
[![Hosting](https://img.shields.io/badge/Firebase-Hosting%20%2B%20Functions-ffca28)](https://firebase.google.com)
[![AI](https://img.shields.io/badge/Vertex%20AI-Gemini%202.5%20Flash-4285F4)](https://cloud.google.com/vertex-ai)

A personal portfolio site for **Jinwoong Shin** — AI Engineer at LG CNS America, incoming Georgia Tech OMSCS (Fall 2026, AI & Robotics specialization).

> **Live**: <https://jinwoong-shin-portfolio.web.app>

The flagship feature is an **Obsidian-style AI Assistant** — a force-directed knowledge graph wired to Vertex AI Gemini 2.5 Flash with structured JSON output. Ask the assistant any question; it returns a grounded answer plus the exact graph nodes and PDF documents that back it. Relevant document cards (resume, diploma, admission letter) auto-render in the chat and open inline in a viewer.

---

## ✨ Highlights

| Area | What |
|---|---|
| **Design** | Apple-inspired light theme — `#1d1d1f` text on `#ffffff` / `#f5f5f7` alternating sections, restrained `#0071e3` accent, no glows or gradients. Custom translucent cursor (Mike Matas style) on desktop. |
| **Layout** | Full-width carousels with snap-scroll for Projects, Education, Certifications, Conferences. Active card synced with tab underline + `01/04` counter via scroll-position detection. |
| **AI Assistant** | Fullscreen overlay with split layout: knowledge graph (`react-force-graph-2d`) on the left, chat on the right. Gemini returns `{answer, relevantNodeIds, relevantFileIds}`; the graph hides irrelevant nodes and pulse-highlights matching ones. |
| **PDF Viewer** | Reusable in-page modal: ESC / X / backdrop close, body scroll lock, download button. Used for resume, UW–Madison diploma, GT admission letter, and conference photos (image-lightbox variant). |
| **Knowledge Graph** | 50+ hand-curated nodes (person, company, school, project, certification, skill, document, location, conference) with typed edges. Source-of-truth lives in `lib/knowledge-graph.ts` and is mirrored to `functions/src/knowledge-graph.ts` for the Cloud Function. |

---

## 🧱 Stack

**Frontend**
- [Next.js 16](https://nextjs.org) — App Router, React Server Components, static export
- [TypeScript 5](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com) — `@theme inline` design tokens
- [Framer Motion](https://www.framer.com/motion/) — micro-animations, `layoutId` shared transitions
- [react-force-graph-2d](https://github.com/vasturiano/react-force-graph) — force-directed knowledge graph (canvas, dynamic-imported)
- [react-markdown](https://github.com/remarkjs/react-markdown) + `remark-gfm` — chat + blog rendering
- [lucide-react](https://lucide.dev) — icons

**Backend**
- [Firebase Cloud Functions v2](https://firebase.google.com/docs/functions) — Node 24 runtime
- [Vertex AI Gemini 2.5 Flash](https://cloud.google.com/vertex-ai) — structured output via `responseSchema`

**Hosting**
- [Firebase Hosting](https://firebase.google.com/docs/hosting) — static export from `out/`
- Custom helper scripts in repo root for SSL-intercepting work networks (`deploy.sh`, `deploy-functions.js`)

---

## 📂 Repository structure

```
.
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout, AIAssistantProvider, AIChatBot, CustomCursor
│   ├── page.tsx                  # Home composition (Hero → About → Career → ... → Contact)
│   ├── globals.css               # Design tokens + Apple-light theme + utilities
│   └── blog/                     # Blog index + dynamic [slug] route
├── components/
│   ├── home/                     # Section components (Hero, About, Career, Projects, Education,
│   │                             #   Certifications, Conferences, Contact)
│   ├── projects/ProjectCard.tsx  # Project card with image-or-fallback
│   ├── chatbot/                  # AI Assistant pieces
│   │   ├── GraphView.tsx         # react-force-graph-2d wrapper, pulse animation, hide-non-active
│   │   ├── ChatPanel.tsx         # Messages + input + suggested prompts + file cards in-line
│   │   ├── FileCard.tsx          # Clickable PDF reference rendered under AI answers
│   │   └── PdfViewerModal.tsx    # Shared PDF iframe modal (also used by Education)
│   ├── ui/                       # Reusable primitives
│   │   ├── Carousel.tsx          # Snap-scroll carousel with tab nav, active highlight, arrows
│   │   ├── Button.tsx            # Apple-style pill buttons (primary / secondary / ghost / outline)
│   │   ├── CustomCursor.tsx      # Translucent circle cursor (desktop only)
│   │   └── ImageLightbox.tsx     # Fullscreen image viewer (used by Conferences)
│   ├── layout/Navbar.tsx         # Top nav with AI Assistant + Resume CTAs
│   ├── blog/                     # Blog-specific components (CertificationBadge, AutoResizingIframe)
│   └── AIChatBot.tsx             # Top-level orchestrator: open/close, message state, lightbox state
├── lib/
│   ├── knowledge-graph.ts        # ★ Site-side graph (typed nodes + edges, used by GraphView)
│   ├── ai-assistant-context.tsx  # React context for opening/closing the AI overlay from anywhere
│   ├── career-data.ts            # Career entries (LG CNS, Samsung SDS, NICE Payments)
│   ├── blog-data.ts              # Blog posts metadata + content
│   ├── firebase.ts               # Client SDK init (functions in us-central1)
│   └── utils.ts                  # `cn` Tailwind merge helper
├── functions/
│   ├── src/index.ts              # ★ Cloud Function: Vertex AI call + structured JSON response
│   └── src/knowledge-graph.ts    # Server-side mirror of lib/knowledge-graph.ts (no React deps)
├── public/
│   ├── resume.pdf                # Latest resume — exposed via Navbar Download button
│   ├── diploma.pdf               # UW–Madison diploma (Education modal)
│   ├── admission-offer.pdf       # GT OMSCS admission letter (Education modal)
│   ├── companies/                # School + employer logos
│   ├── projects/                 # Project preview images
│   ├── certifications/           # Cert badges
│   ├── conferences/              # Conference photos (re:Invent, Cloud Next)
│   ├── blog-html/                # Self-contained HTML blog posts (rendered via iframe)
│   ├── robots.txt + sitemap.xml  # SEO
│   └── profile.jpg               # Hero photo + OG image
├── deployment_guide.md           # Detailed deploy + AI chatbot maintenance guide
├── deploy.sh                     # Site deploy with TLS workarounds (work-network)
├── deploy-functions.js           # Functions deploy with TLS workarounds (work-network)
├── firebase.json                 # Firebase project config
├── .firebaserc                   # Firebase project alias (gitignored)
├── key.json                      # Service account key (gitignored — local emulator / scripted deploy)
└── .env.local                    # Public Firebase web config (gitignored)
```

---

## 🤖 AI Assistant — how it works

```
                 ┌─────────────────────────────────────────────────────┐
                 │  User types a question in the chat panel            │
                 └────────────────────────┬────────────────────────────┘
                                          ▼
                 ┌─────────────────────────────────────────────────────┐
                 │  components/AIChatBot.tsx → httpsCallable("onAskAI") │
                 └────────────────────────┬────────────────────────────┘
                                          ▼
                 ┌─────────────────────────────────────────────────────┐
                 │  functions/src/index.ts                              │
                 │  • Injects entire knowledge graph as JSON context    │
                 │  • Calls Gemini 2.5 Flash with responseSchema:       │
                 │    { answer, relevantNodeIds[], relevantFileIds[] }  │
                 │  • Validates ids against the graph (drops bad ones)  │
                 └────────────────────────┬────────────────────────────┘
                                          ▼
                 ┌─────────────────────────────────────────────────────┐
                 │  Frontend                                            │
                 │  • ChatPanel renders the markdown answer            │
                 │  • For each file id → FileCard → PdfViewerModal     │
                 │  • GraphView hides non-active nodes; sequentially   │
                 │    pulse-highlights the relevant ones               │
                 │  • Camera fits the active subgraph automatically    │
                 └─────────────────────────────────────────────────────┘
```

**Adding new knowledge** → edit nodes/edges in *both* `lib/knowledge-graph.ts` and `functions/src/knowledge-graph.ts`. For PDFs, drop the file under `public/` and add a `document` node with `fileSrc`, `fileTitle`, `fileDownloadName`. Then `firebase deploy --only functions` to push to the LLM context.

---

## 🚀 Run locally

```bash
git clone https://github.com/w0-0n9/jinwoong-shin-portfolio.git
cd jinwoong-shin-portfolio
npm install
cp .env.local.example .env.local   # fill in real Firebase web config values
npm run dev                        # http://localhost:3000
```

The chatbot calls the *deployed* Cloud Function in `us-central1`. There is no local function emulator wired up by default — uncomment `connectFunctionsEmulator(...)` in `lib/firebase.ts` if you want one.

```bash
npm run build      # production build (static export to ./out)
npm run lint       # ESLint
```

### Functions

```bash
cd functions
npm install
npm run build      # tsc → lib/
firebase deploy --only functions
```

---

## 🛠 Deploy

### Site (static export → Firebase Hosting)
```bash
./deploy.sh                      # work-network safe (TLS workarounds)
# OR
firebase deploy --only hosting   # any normal network
```

### Functions (Cloud Function → Firebase)
```bash
node deploy-functions.js         # work-network safe
# OR
firebase deploy --only functions # any normal network
```

If `firebase deploy` fails with `Missing permissions ... iam.serviceAccounts.ActAs`, the active gcloud / firebase login isn't the project owner. Either `firebase logout && firebase login` with the owning Google account, or grant the active account the **Service Account User** role in GCP IAM.

See `deployment_guide.md` for the full version-controlled deployment notes.

---

## 📐 Design system at a glance

| Token | Value | Usage |
|---|---|---|
| `--background` | `#ffffff` | Primary section bg |
| `--color-bg-secondary` | `#f5f5f7` | Alternating sections (Apple-style rhythm) |
| `--color-text-primary` | `#1d1d1f` | Headings, body |
| `--color-text-secondary` | `#424245` | Body alt, longer paragraphs |
| `--color-text-tertiary` | `#6e6e73` / `#86868b` | Captions, muted |
| `--color-border` | `#d2d2d7` / `#e8e8ed` | Cards, dividers |
| `--color-accent` | `#0071e3` | Links, primary buttons, active states |

Typography: Inter (sans) + JetBrains Mono (mono). Headings use `font-semibold tracking-[-0.03em]` (or `-0.04em` on the hero) for the tight Apple feel.

---

## 📜 License

Code in this repo is the author's personal work. Photos, PDFs (resume, diploma, admission letter), and personal narrative content are all rights reserved.

If you want to use the patterns here as a template for your own portfolio, feel free — just don't ship the photos or copy as-is.

---

## 👋 Contact

- LinkedIn: <https://linkedin.com/in/w0-0n9>
- GitHub: <https://github.com/w0-0n9>
- Email: jinwoong7116@gmail.com
