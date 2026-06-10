# Bilingual Educational Web Application

This is the monorepo for the Bilingual Educational Application (Freemium Model).

## Project Structure

- `apps/frontend`: Next.js web application.
- `apps/backend`: Node.js/Express API server.
- `packages/database`: Prisma schema and database models.
- `packages/shared`: Shared TypeScript types across frontend and backend.

## Quick Start

### 1. Start the Database
Make sure you have Docker installed.

```bash
npm run db:up
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Servers

```bash
npm run dev
```
