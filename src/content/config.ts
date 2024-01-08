import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
})

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.string().array(),
  }),
})

const pics = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      src: image(),
      alt: z.string(),
    }),
})

export const collections = { blog, projects, pics }
