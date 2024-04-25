import { defineCollection, z } from 'astro:content'
import { marked } from 'marked'

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tech: z.string().array(),
      cover: image(),
      coverAlt: z.string(),
      preview: z.string().transform(preview => marked.parse(preview)),
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

const bookmarks = defineCollection({
  type: 'data',
  schema: z.array(z.string().url()),
})

export const collections = { projects, pics, bookmarks }
