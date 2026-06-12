# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal site / blog for rohid.dev. Astro 6 static site with React islands, deployed to Vercel. Package manager is **pnpm** (note `pnpm-lock.yaml`).

## Commands

- `pnpm dev` — local dev server (http://localhost:4321)
- `pnpm build` — runs `astro check` (type check) then `astro build`. Use this to validate types; there is no separate test suite.
- `pnpm preview` — serve the production build locally
- `pnpm format` — Prettier write across the repo
- `pnpm astro ...` — Astro CLI (e.g. `astro add`, `astro check`)

## Architecture

### Content collections (`src/content.config.ts`)

Content is the heart of the site. Three collections, all loaded via Astro's `glob` loader with Zod schemas:

- **blog** — `src/content/blog/*.mdx`. Frontmatter: `isDraft` (defaults `true`), `title`, `description`, `publishDate`, `tags[]`, optional `relatedPosts` (references other blog entries). The slug is the file's `id` (filename without extension).
- **projects** — `src/content/projects/*.json`. Includes `featured`, `weight` (sort order), and `technologies` which are **references** to the technologies collection.
- **technologies** — `src/content/technologies/*.json`. Reusable tech metadata (name + light/dark icons) referenced by projects.

Cross-collection links use `reference(...)`, so a project's `technologies` array holds technology IDs, resolved at build time.

**Draft handling:** Pages filter drafts in production only — `import.meta.env.PROD ? data.isDraft !== true : true`. Drafts are visible in dev, hidden in prod. Replicate this filter in any new page that lists blog posts (see `src/pages/blog/[slug].astro` and `src/pages/tags/[slug].astro`).

### Routing (`src/pages/`)

File-based. Blog posts at `/blog/[slug]`, tag archives at `/tags/[slug]` (built by grouping all posts by tag in `getStaticPaths`). Both use `getStaticPaths` + `InferGetStaticPropsType`.

### OG images

Dynamic per-page OG images. `src/pages/api/og.png.ts` is a **non-prerendered** (`prerender = false`, runs on Vercel) endpoint that renders `_og-image.tsx` via `@vercel/og`, reading the title from a `?title=` query param and Inter fonts from `public/fonts/`. `MetaTags.astro` auto-generates the OG image URL from the page title unless an explicit `image` is passed.

### Reading time

`plugins/remark-reading-time.mjs` is a remark plugin (wired in `astro.config.mjs`) that injects `minutesRead` into each post's frontmatter, accessed via `remarkPluginFrontmatter` after `render(post)`.

## Styling

- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (not a `tailwind.config` file). Theme tokens live in `src/styles/globals.css` using `@theme` and CSS variables (shadcn-style `--background`, `--primary`, etc., zinc base color). Dark mode is class-based via the `.dark` custom variant; `ThemeToggle.astro` handles toggling.
- shadcn/ui conventions (`components.json`); add UI components under `src/components/ui`. Aliases: `@/*` → `src/*`.
- Button styles use `tailwind-variants` (`tv`) in `src/styles/button-variants.ts`. Merge classes with `cn()` from `src/lib/utils.ts`.
- Prettier is configured with `tailwindFunctions: ["tv", "cn"]` so class strings inside those helpers get sorted.

## Conventions

- TypeScript is in strict mode (`astro/tsconfigs/strict`). `astro check` must pass for the build to succeed.
- `PUBLIC_BASE_URL` env var is used for absolute URLs (OG images, canonical links); see `.env` and `src/env.d.ts`.
