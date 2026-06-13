# rohid.dev

My personal portfolio and blog, live at **[rohid.dev](https://rohid.dev)**.

Built with Astro and React islands, styled with Tailwind CSS v4, and deployed to Cloudflare. Content (blog posts, projects, and the technologies behind them) is managed as type-safe content collections.

## Tech stack

- **[Astro 6](https://astro.build)** — static site with selective React islands
- **[React 19](https://react.dev)** — interactive components
- **[Tailwind CSS v4](https://tailwindcss.com)** — via the `@tailwindcss/vite` plugin, with shadcn/ui conventions
- **[MDX](https://mdxjs.com)** — for blog posts
- **[Cloudflare](https://developers.cloudflare.com/workers/)** — hosting via `@astrojs/cloudflare`
- **[Resend](https://resend.com)** — "hire me" contact form
- **[@vercel/og](https://vercel.com/docs/og-image-generation)** — dynamic per-page OG images
- **TypeScript** in strict mode

Package manager is **pnpm** (note `pnpm-lock.yaml`).

## Getting started

```sh
pnpm install
pnpm dev
```

The dev server runs at [http://localhost:4321](http://localhost:4321).

## Commands

All commands are run from the root of the project:

| Command          | Action                                                   |
| :--------------- | :------------------------------------------------------- |
| `pnpm dev`       | Start the local dev server at `localhost:4321`           |
| `pnpm build`     | Type-check (`astro check`) then build to `./dist/`       |
| `pnpm preview`   | Serve the production build locally                       |
| `pnpm format`    | Run Prettier across the repo                             |
| `pnpm astro ...` | Run Astro CLI commands (e.g. `astro add`, `astro check`) |

There is no separate test suite — `pnpm build` (which runs `astro check`) is the source of truth for type safety.

## Project structure

```text
/
├── public/                 # Static assets (fonts, images)
├── plugins/
│   └── remark-reading-time.mjs   # Injects reading time into post frontmatter
├── src/
│   ├── components/         # Astro + React components (ui/ for shadcn)
│   ├── content/
│   │   ├── blog/           # Blog posts (.mdx)
│   │   ├── projects/       # Project entries (.json)
│   │   └── technologies/   # Reusable tech metadata (.json)
│   ├── content.config.ts   # Collection schemas (Zod)
│   ├── pages/              # File-based routing
│   │   ├── api/            # OG image + contact endpoints
│   │   ├── blog/[slug]     # Blog post pages
│   │   └── tags/[slug]     # Tag archives
│   └── styles/             # globals.css (theme tokens), button variants
└── astro.config.mjs
```

## Content

Content lives in three [content collections](https://docs.astro.build/en/guides/content-collections/), all schema-validated:

- **blog** — `src/content/blog/*.mdx`. Frontmatter includes `title`, `description`, `publishDate`, `tags[]`, optional `relatedPosts`, and `isDraft` (defaults to `true`). The slug is the filename.
- **projects** — `src/content/projects/*.json`. Includes `featured`, `weight` (sort order), and `technologies` (references into the technologies collection).
- **technologies** — `src/content/technologies/*.json`. Reusable name + light/dark icons, referenced by projects.

**Drafts** are visible in dev and hidden in production (`import.meta.env.PROD ? data.isDraft !== true : true`).

## License

Source code is available for reference. Content (blog posts, images, and other writing) is © Rohid — please don't republish without permission.
</content>
