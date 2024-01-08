import type { ImageMetadata } from 'astro'
import { getImage } from 'astro:assets'
import os from 'node:os'
import fs from 'node:fs/promises'
import { getPlaiceholder } from 'plaiceholder'

export type ImageWithBlurhash = Awaited<
  ReturnType<typeof getImagesWithBlurhash>
>[number]

export async function getImagesWithBlurhash(
  images: Array<{
    src: ImageMetadata
    alt: string
  }>
) {
  return await Promise.all(
    images.map(async image => {
      const { src, attributes } = await getImage({ src: image.src })

      const original = image.src.src.split('?')[0]
      const path = new URL(
        replaceFileSystemReferences(original),
        import.meta.url
      )
      const buffer = await fs.readFile(path)

      const {
        metadata: { height, width },
        css,
      } = await getPlaiceholder(buffer)

      return {
        css,
        img: { ...attributes, src, height, width, alt: image.alt },
      }
    })
  )
}

// From https://github.com/withastro/astro/blob/d77a0320b7c0f499b357e7831f967628d1a80f18/packages/astro/src/assets/endpoint/node.ts#L12
function replaceFileSystemReferences(src: string) {
  return os.platform().includes('win32')
    ? src.replace(/^\/@fs\//, '')
    : src.replace(/^\/@fs/, '')
}
