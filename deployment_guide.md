# Deployment Guide

This project ships as two pieces:

| Piece | Service | Source |
|---|---|---|
| Static site (Next.js) | **Firebase Hosting** | `app/`, `components/`, `lib/`, `public/` |
| AI chatbot backend | **Firebase Cloud Functions** (Vertex AI Gemini) | `functions/src/` |

Because of the network environment (SSL interception on the work laptop) the helper scripts wrap `firebase` with TLS workarounds. On a normal network you can call the firebase CLI directly.

---

## 🚀 Standard workflow

### 1. Code & test locally
```bash
npm run dev
```
Visit `http://localhost:3000`. The chatbot calls the deployed Cloud Function — there is no local emulator wired up by default.

### 2. Commit & push
```bash
git add .
git commit -m "Describe your changes"
git push
```

### 3. Deploy

**Site (after editing anything under `app/`, `components/`, `lib/`, `public/`):**
```bash
./deploy.sh
```
This script enables system TLS certs (fixes Google Fonts builds), relaxes strict SSL (fixes Firebase CLI), runs `next build` (static export), then deploys to Firebase Hosting.

On a normal network you can also just run:
```bash
firebase deploy --only hosting
```

**Chatbot backend (after editing anything under `functions/src/` or `lib/knowledge-graph.ts`):**
```bash
firebase deploy --only functions
```
or via the helper:
```bash
node deploy-functions.js
```
Cold start after a fresh deploy takes ~30s.

---

## 🤖 AI Chatbot architecture

The chatbot is **knowledge-graph grounded** with structured output, not a "dump all text into context" approach.

### Source of truth: the knowledge graph

| File | Role |
|---|---|
| `lib/knowledge-graph.ts` | **Site-side** — typed nodes + edges, used for the Obsidian-style graph view in the chat UI. |
| `functions/src/knowledge-graph.ts` | **Server-side mirror** — same data minus React imports, fed to Gemini as JSON context. |

These two files must stay in sync. When you add a node, edge, or document, edit **both**.

### Node types

- `person`, `company`, `school`, `project`, `certification`, `skill`, `document`, `location`

### Document nodes (for in-chat PDF cards)

Each `type: "document"` node has `fileSrc`, `fileTitle`, and `fileDownloadName`. The chatbot returns the node id in `relevantFileIds` and the frontend renders an interactive PDF card under the answer. Files live under `public/` (e.g. `public/resume.pdf`).

### Response contract

The Cloud Function returns:
```ts
{
  answer: string;           // Markdown. Concise, grounded in the graph.
  relevantNodeIds: string[]; // Node ids to highlight in the graph view.
  relevantFileIds: string[]; // Document node ids to render as file cards.
}
```
Validation strips any ids the LLM hallucinates.

### Adding new knowledge

1. Add a node + relevant edges to **both** `lib/knowledge-graph.ts` and `functions/src/knowledge-graph.ts`.
2. If the node represents a PDF, drop the file under `public/` and set `fileSrc`, `fileTitle`, `fileDownloadName`.
3. If the new node deserves explicit prompting (e.g. a new document the LLM should surface on certain questions), add an example to the system instruction in `functions/src/index.ts`.
4. `firebase deploy --only functions` to redeploy the backend.
5. `./deploy.sh` (or `firebase deploy --only hosting`) for the site.

---

## 🔗 Links
- **Live site**: <https://jinwoong-shin-portfolio.web.app>
- **GitHub**: <https://github.com/w0-0n9/jinwoong-shin-portfolio>
- **Firebase console**: <https://console.firebase.google.com/project/jinwoong-shin-portfolio/overview>

---

## 🛠 Troubleshooting

**Error: `SELF_SIGNED_CERT_IN_CHAIN`** (work-network SSL interception)
- Use `./deploy.sh` and `node deploy-functions.js` instead of bare `firebase` commands.
- Or run `npm config set strict-ssl false` in the same shell first.

**Error: `Missing permissions ... iam.serviceAccounts.ActAs ...`**
- The active gcloud / firebase login is not the project owner.
- Switch with `firebase logout && firebase login` (use `jinwoong7116@gmail.com`), or grant the active account the **Service Account User** role in GCP IAM.

**Error: GitHub push rejected (large files)**
- `.firebase/` is gitignored, but if it slipped in: `git rm -r --cached .firebase/` and recommit.
