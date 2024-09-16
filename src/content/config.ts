import { defineCollection, reference, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    isDraft: z.boolean().default(true),
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    publishDate: z.date(),
    relatedPosts: z.array(reference("blog")).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
