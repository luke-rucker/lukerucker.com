import { defineCollection, z } from 'astro:content'

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
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

export const collections = { projects, pics }
