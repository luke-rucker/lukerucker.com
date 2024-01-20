import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://lukerucker.com',
  prefetch: {
    defaultStrategy: 'viewport',
  },
  image: {
    remotePatterns: [{ protocol: 'https' }],
  },
  build: {
    format: 'file',
  },
  integrations: [
    mdx(),
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
