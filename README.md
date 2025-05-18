# Willo Monorepo

A modern e-commerce platform for digital products such as games, gift cards, and books.

## 🧩 Monorepo Structure

This monorepo uses [pnpm workspaces](https://pnpm.io/workspaces) and [Turborepo](https://turbo.build) for scalable development.

### Apps

- `client/` – Public-facing storefront built with Next.js
- `admin/` – Admin dashboard for managing products and orders

### Packages

- `db/` – Prisma schema and database access layer
- `ui/` – Shared React UI components (if applicable)
- `config/` – Shared configurations (ESLint, Tailwind, etc.)

## 🚀 Getting Started

```bash
pnpm install
pnpm dev  # Runs all apps
```

## 🛠 Tech Stack

- Frontend: Next.js 14+, TypeScript, TailwindCSS, Mobx

- Backend: Next.js API Routes, Prisma, PostgreSQL

- Auth: JWT + bcrypt

- Deployment: Vercel

## 📁 Scripts

```bash
turbo dev        # Start all apps
turbo build      # Build all apps
turbo lint       # Lint everything
```
