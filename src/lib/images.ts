import type { ImageMetadata } from 'astro'
import { getImage } from 'astro:assets'
import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs/promises'
import { getPlaiceholder } from 'plaiceholder'

export type ImageWithBlurhash = Awaited<ReturnType<typeof getImageWithBlurhash>>

export async function getImageWithBlurhash(image: {
  src: ImageMetadata | string
  alt: string
}) {
  const buffer = await getImageBuffer(image.src)
  const {
    metadata: { height, width },
    css,
  } = await getPlaiceholder(buffer)

  const { src, attributes, srcSet } = await getImage({
    src: image.src,
    height,
    width,
    quality: 'low',
    densities: [1.5, 2],
  })

  return {
    css,
    img: {
      ...attributes,
      src,
      height,
      width,
      alt: image.alt,
      srcSet: srcSet.attribute,
    },
  }
}

async function getImageBuffer(src: ImageMetadata | string) {
  if (typeof src === 'object') {
    const original = src.src.split('?')[0]
    const imagePath = import.meta.env.PROD
      ? path.join('../../', replaceFileSystemReferences(original))
      : replaceFileSystemReferences(original)

    const url = new URL(imagePath, import.meta.url)
    return await fs.readFile(url)
  }

  const res = await fetch(src)
  if (!res.ok) {
    throw new Error(`Error fetching ${src}`)
  }
  const arrayBuffer = await res.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

// From https://github.com/withastro/astro/blob/d77a0320b7c0f499b357e7831f967628d1a80f18/packages/astro/src/assets/endpoint/node.ts#L12
function replaceFileSystemReferences(src: string) {
  return os.platform().includes('win32')
    ? src.replace(/^\/@fs\//, '')
    : src.replace(/^\/@fs/, '')
}
