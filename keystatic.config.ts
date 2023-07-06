import { collection, config, fields, singleton } from "@keystatic/core";

export default config({
  storage:
    process.env.NODE_ENV === "development"
      ? {
          kind: "local",
        }
      : {
          kind: "github",
          repo: { name: "rohid.dev", owner: "iam-rohid" },
        },
  singletons: {
    settings: singleton({
      label: "Settings",
      path: "src/content/settings",
      schema: {
        headline: fields.text({ label: "Headline" }),
      },
    }),
  },
  collections: {
    posts: collection({
      label: "Posts",
      path: "src/content/posts/*/",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: {
              length: {
                max: 100,
              },
            },
          },
        }),
        excerpt: fields.text({
          label: "Excerpt",
          multiline: true,
          validation: {
            length: {
              max: 300,
            },
          },
        }),
        draft: fields.checkbox({
          label: "Draft",
          description:
            "Set this post as draft to prevent it from being published",
        }),
        document: fields.document({
          label: "Document",
          formatting: true,
          links: true,
        }),
      },
      slugField: "title",
    }),
  },
});
