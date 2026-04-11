# Aiminote

[中文说明](./README.zh-CN.md)

Aiminote is a full-stack blog demo focused on frontend engineering content. The repository contains a Vite + React client and an Express + TypeScript API with a lightweight mock data layer for local development.

## Highlights

- Browse articles by category, search keyword, and detail page
- Log in with a demo account and create new articles
- Public article comments with authenticated comment deletion
- Safer article rendering with server-side and client-side HTML sanitization
- Separate frontend and backend build and lint workflows

## Tech Stack

- Frontend: React, TypeScript, Vite, React Router, Tailwind CSS
- Backend: Express, TypeScript, Zod, JWT, Sequelize
- Development data: in-memory mock database seeded at server startup

## Repository Structure

```text
.
├─ src/                Frontend application
├─ api/                Backend API
├─ public/             Static assets
├─ DEPLOYMENT.md       Production deployment notes
└─ README.zh-CN.md     Chinese documentation
```

## Requirements

- Node.js 18+
- pnpm 9+

## Getting Started

### 1. Install dependencies

```bash
pnpm install
cd api && pnpm install
```

### 2. Start the backend

```bash
cd api
pnpm dev
```

The API runs on `http://localhost:3001` by default.

### 3. Start the frontend

Open a second terminal:

```bash
pnpm dev
```

The frontend runs on `http://localhost:5173` by default.

## Environment Variables

### Frontend

The frontend reads the API base URL from `VITE_API_BASE_URL`. If it is not set, it falls back to `http://localhost:3001/api`.

Example `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

You can also copy the defaults from [`.env.example`](./.env.example).

### Backend

The backend uses `api/.env`.

Important variables:

```env
PORT=3001
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

The current local setup uses an in-memory SQLite configuration for development-style demo data, so data resets whenever the backend restarts.

## Demo Account

Use the seeded account to test authenticated flows:

- Email: `aimi@example.com`
- Password: `password`

## Available Scripts

### Frontend

```bash
pnpm dev
pnpm check
pnpm lint
pnpm build
pnpm preview
```

### Backend

```bash
cd api
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

## Notes

- Article content is sanitized before storage and again before rendering.
- Comment creation is public, while comment deletion requires authentication.
- `DEPLOYMENT.md` contains a production-oriented deployment walkthrough.
