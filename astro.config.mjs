// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./plugins/remark-reading-time.mjs";

import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://rohid.dev",

  markdown: {
    remarkPlugins: [remarkReadingTime],
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx(),
    sitemap(),
  ],

  output: "hybrid",
  adapter: vercel(),
});
