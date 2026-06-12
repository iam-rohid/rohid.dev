// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./plugins/remark-reading-time.mjs";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://rohid.dev",
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [mdx(), sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: cloudflare({
    imageService: { build: "compile", runtime: "cloudflare-binding" },
  }),
});
