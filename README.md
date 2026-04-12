# Aiminote

[中文说明](./README.zh-CN.md)

Aiminote is now a static-content frontend blog focused on frontend engineering content. Articles live in the repository as Markdown files, and the site builds to a pure Vite + React frontend that can be deployed for free on platforms like Vercel or Cloudflare Pages.

## Highlights

- Browse articles by category, search keyword, and detail page
- Store article content in `src/content/posts/*.md`
- Support Git-based publishing workflows for collaborators who push content directly
- Use Giscus for comments so readers can discuss with GitHub accounts
- Render Markdown safely on the client

## Tech Stack

- Frontend: React, TypeScript, Vite, React Router, Tailwind CSS
- Content source: Markdown files inside the repository
- Comments: Giscus

## Repository Structure

```text
.
├─ src/
│  ├─ content/posts/   Markdown article source
│  ├─ pages/           Frontend pages
│  └─ components/      Shared UI and comments component
├─ public/             Static assets
├─ DEPLOYMENT.md       Static deployment notes
└─ README.zh-CN.md     Chinese documentation
```

## Requirements

- Node.js 18+
- pnpm 9+

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start the frontend

```bash
pnpm dev
```

The site runs on `http://localhost:5173` by default.

## Environment Variables

Comments are configured through Giscus. Example `.env.local`:

```env
VITE_GISCUS_REPO=owner/repo
VITE_GISCUS_REPO_ID=R_kgDOExample
VITE_GISCUS_CATEGORY=General
VITE_GISCUS_CATEGORY_ID=DIC_kwDOExample4Ct
VITE_GISCUS_MAPPING=pathname
VITE_GISCUS_LANG=zh-CN
```

You can copy the defaults from [`.env.example`](./.env.example). If these values are not set, the article page will show a friendly placeholder instead of a live comments widget.

## Available Scripts

```bash
pnpm dev
pnpm check
pnpm lint
pnpm build
pnpm preview
```

## Writing Workflow

- Add a new Markdown file to `src/content/posts/`
- Fill in the frontmatter fields: `title`, `summary`, `category`, `tags`, `coverImage`, `publishedAt`
- Write the article body in Markdown below the frontmatter
- Push to `main`, and the static host can auto-deploy the new article

## Notes

- Article content is rendered from repository Markdown files and sanitized before display.
- The repository has been trimmed to the static blog workflow only; the old backend and login flow have been removed.
- `DEPLOYMENT.md` documents the static deployment workflow.
