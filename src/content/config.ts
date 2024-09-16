import { defineCollection, reference, z } from "astro:content";

const blogPosts = defineCollection({
  type: "content",
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
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().url(),
    icon: z.string(),
    iconDark: z.string().optional(),
    githubRepo: z.string().url().optional(),
    technologies: z.array(reference("technologies")),
    featured: z.boolean().default(false),
  }),
});

const technologyCollection = defineCollection({
  type: "data",
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
