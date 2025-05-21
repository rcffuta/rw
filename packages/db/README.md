# Willo – DB Package

Handles database access for Willo using Prisma and PostgreSQL.

## Structure

- `prisma/schema.prisma` – Main schema file
- `generated/` – Prisma client output
- `actions/` – Modularized DB access logic (like services)

## Usage

Run the following:

```bash
pnpm prisma generate
pnpm prisma migrate dev
```

## Dev Notes

- Uses Prisma with PostgreSQL

- Shared across both client and admin
