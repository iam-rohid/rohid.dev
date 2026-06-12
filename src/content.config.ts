import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogPosts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    isDraft: z.boolean().default(true),
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()),
    relatedPosts: z.array(reference("blog")).optional(),
  }),
});

const projectCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().url(),
    icon: z.string(),
    iconDark: z.string().optional(),
    githubRepo: z.string().url().optional(),
    technologies: z.array(reference("technologies")),
    featured: z.boolean().default(false),
    weight: z.number().optional().default(0),
  }),
});

const technologyCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/technologies' }),
  schema: z.object({
    name: z.string(),
    icon: z.string(),
    iconDark: z.string().optional(),
  }),
});

export const collections = {
  blog: blogPosts,
  projects: projectCollection,
  technologies: technologyCollection,
};
