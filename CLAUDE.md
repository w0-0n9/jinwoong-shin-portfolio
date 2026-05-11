# Project rules for AI agents (Claude Code, Antigravity, etc.)

> Read this **before** making any change. These rules exist because the
> portfolio's UI and the AI Assistant's knowledge graph must stay in sync —
> if they drift, the chatbot answers a different story than the site shows.

---

## TL;DR — what you absolutely must not forget

1. **The knowledge graph is the chatbot's brain.** `lib/knowledge-graph.ts`
   is the **single source of truth**. `functions/src/knowledge-graph.ts` is
   an auto-generated mirror — **do not edit it by hand**. It is regenerated
   by `npm run sync:graph` (also runs automatically on `prebuild` and on
   Firebase functions `predeploy`).
2. **Section data and graph data describe the same things.** When you add
   a project/job/cert/conference, you must update both the relevant section
   data (e.g. `lib/career-data.ts`, `components/home/Projects.tsx`) **AND**
   the knowledge graph.
3. **Documents and images live in `public/`.** Any new PDF or photo
   referenced by a node must exist as a real file there, with a URL-safe
   filename, before deploy.
4. **Deploy both.** A graph change is a *backend* change. After committing,
   the GitHub Action will deploy hosting + functions; if you're deploying
   manually, run `firebase deploy` (no `--only` flag) or both
   `--only hosting` and `--only functions`.

---

## Repository map

```
app/                      Next.js App Router pages
  page.tsx                Home composition (Hero → About → … → Contact)
  chat/page.tsx           AI Assistant route (force-graph + chat)
  blog/                   Blog index + dynamic [slug]
  layout.tsx              Root layout, CustomCursor mount
  globals.css             Apple-light theme tokens + utilities
components/
  home/                   Section components (Hero, About, Career, Projects,
                          Education, Certifications, Conferences, Contact)
  projects/ProjectCard.tsx
  chatbot/                AI Assistant components — GraphView, ChatPanel,
                          FileCard, ImageCard, PdfViewerModal
  ui/                     Reusable primitives — Carousel, Button,
                          CustomCursor, ImageLightbox
  layout/Navbar.tsx
lib/
  knowledge-graph.ts      ★ SINGLE SOURCE OF TRUTH for the chatbot graph
  career-data.ts          Career section data
  blog-data.ts            Blog posts
  ai-assistant-context.tsx (legacy; chat is now a /chat route)
  firebase.ts             Client SDK init
  utils.ts                cn() helper
functions/
  src/index.ts            ★ Cloud Function (Vertex AI Gemini structured output)
  src/knowledge-graph.ts  AUTO-GENERATED mirror — do not hand-edit
scripts/
  sync-graph.ts           Generator that writes functions/src/knowledge-graph.ts
                          from lib/knowledge-graph.ts
public/
  resume.pdf              Latest resume (Navbar Download)
  diploma.pdf             UW–Madison diploma (Education modal)
  admission-offer.pdf     GT OMSCS admission letter
  companies/              School + employer logos
  projects/               Project preview images
  certifications/         Cert badges
  conferences/            Conference photos
  blog-html/              Self-contained HTML blog posts
.github/workflows/
  deploy.yml              Auto-deploy on push to main
firebase.json             Firebase Hosting + Functions config
deployment_guide.md       Detailed deploy notes (work-network workarounds)
```

---

## When you add a new <thing>

### Adding a new **project** (work or personal)

1. **Decide if it's work or personal.**
   - Work project at a company → add an entry under that company in
     `lib/career-data.ts` (inside the `projects` array if it's an LG CNS-style
     sub-project, or as `achievements` for older roles).
   - Personal / standalone → add a card entry in
     `components/home/Projects.tsx` and a node in the graph.

2. **Add a graph node** in `lib/knowledge-graph.ts`:
   ```ts
   {
       id: "proj-<kebab-case-id>",        // proj- prefix
       type: "project",
       label: "Human-readable name",
       description: "1–2 sentence summary",
       meta: { type: "personal" | "work", liveUrl?, github? },
   }
   ```

3. **Add edges**:
   - `jinwoong → built / led → proj-<id>` (always)
   - `<company-id> → hosted → proj-<id>` if it was at a job
   - `proj-<id> → uses → skill-<id>` for each tech used (use existing
     skill IDs, add new ones if needed)

4. **Add an image** if the project card has one — drop it under
   `public/projects/<slug>.{jpg,png}` and reference it from the section data.

5. **Commit + push.** GitHub Action redeploys hosting + functions
   automatically. Manually: `firebase deploy`.

### Adding a new **job / company**

1. Add a node `{ id: "<company-slug>", type: "company", label, description, meta: { period } }` to the graph.
2. Add edge `jinwoong → worked_at → <company-slug>`.
3. Add edge `<company-slug> → located_in → loc-<location>` (create the location node if new).
4. Add an entry to `careerData` in `lib/career-data.ts` with role, period, location, description, achievements/projects, techStack.
5. Add the company logo to `public/companies/<slug>.png` and reference it in the careerData entry.

### Adding a new **certification**

1. Add a node `{ id: "cert-<slug>", type: "certification", label, description, meta: { date } }` to the graph.
2. Add edge `jinwoong → holds → cert-<slug>`.
3. Add edge `cert-<slug> → issued_by → issuer-<slug>` (create issuer node if new — type `"company"`).
4. Add an entry in `certifications` array in `components/home/Certifications.tsx`.
5. Drop badge image in `public/certifications/<slug>.png`.

### Adding a new **document** (PDF you want the chatbot to surface)

1. Drop the PDF in `public/<name>.pdf` (URL-safe name).
2. Add a node:
   ```ts
   {
       id: "doc-<slug>",
       type: "document",
       label: "Human label",
       description: "What this document is",
       fileSrc: "/<name>.pdf",
       fileTitle: "Title shown in the modal header",
       fileDownloadName: "Suggested_download_filename.pdf",
   }
   ```
3. Add edge from whatever it documents → `documents` → the new doc node.
4. **Update the system prompt examples** in `functions/src/index.ts` if it's a doc the LLM should learn to surface on specific keywords (e.g. "diploma" → doc-diploma). Look for the `EXAMPLES` block.

### Adding a new **conference / image-bearing node**

1. Drop the photo in `public/conferences/<slug>.jpg`.
2. Add a node:
   ```ts
   {
       id: "conf-<slug>",
       type: "conference",
       label: "Event Name YYYY",
       description: "1-line context",
       meta: { date: "Mon YYYY", location: "City, State" },
       imageSrc: "/conferences/<slug>.jpg",
       imageAlt: "Caption shown in the lightbox",
   }
   ```
3. Add edge `jinwoong → attended → conf-<slug>`.
4. Add an entry to `conferences` array in `components/home/Conferences.tsx`.
5. The chatbot will pick it up automatically because the system prompt
   already covers conference photos via `relevantImageIds`.

### Adding a new **skill / model / platform**

Just add a `{ id: "skill-<slug>", type: "skill", label }` node to the graph
and connect it via `uses` edges from whatever project uses it. No section
file update needed unless you also want it in the About → Tech Stack list
(in `components/home/About.tsx`).

---

## Hard rules

- **Never hand-edit `functions/src/knowledge-graph.ts`.** It is generated.
  Run `npm run sync:graph` or just let the prebuild/predeploy hooks run.
- **Never let a node's IDs differ between lib and section data.** If a
  Project card in `Projects.tsx` doesn't have a matching `proj-…` node in
  the graph, the chatbot can't reason about it.
- **Never commit `key.json`, `.env.local`, or `.firebaserc`.** They're
  already gitignored — don't fight the gitignore.
- **Never skip `firebase deploy --only functions` after touching the graph.**
  Site shows the new node but chatbot doesn't know about it → confusing
  UX. (GitHub Action handles this automatically on push.)
- **Apple-light theme is the design system.** Stick to the tokens declared
  in `app/globals.css`. Accent only `#0071e3`. No glows, no gradient text.
- **Mobile is a first-class viewport.** Test every change at 390px width.
  Section padding pattern: `py-12 sm:py-16 md:py-24 lg:py-32`. Headings:
  `text-3xl sm:text-4xl md:text-5xl`. Forced `<br/>` in headings should
  always be wrapped in `<br className="hidden md:block" />`.

---

## Deploy

```bash
# Local sanity check
npm run build           # runs prebuild → sync-graph → next build (static export)

# Manual deploy (preferred from a normal network)
firebase deploy --only hosting,functions

# Manual deploy on work-network (TLS interception)
./deploy.sh             # site
node deploy-functions.js   # functions

# CI deploy (automatic on push to main)
# Configured in .github/workflows/deploy.yml — requires repo secret
# FIREBASE_SERVICE_ACCOUNT_JINWOONG_SHIN_PORTFOLIO to be set in GitHub.
```

If `firebase deploy` fails with `iam.serviceAccounts.ActAs`, the active
firebase login isn't the project owner. `firebase logout && firebase login`
with `jinwoong7116@gmail.com`.

---

## Tone of voice on the site

- The site speaks in **first person, plain English**, no buzzword bingo.
- The hero subtitle, About copy, and section headings are deliberate;
  don't replace specific phrasing ("End-to-end is the only way I know",
  "On the ground.", "Selected work.") without a good reason.
- Metrics belong in the **Career** section (230K+ records, $1.6M, 11K
  monthly calls, etc.). About section talks about *who* not *what*.
