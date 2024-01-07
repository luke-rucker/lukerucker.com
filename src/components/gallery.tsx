import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import type { GetImageResult } from 'astro'

type GalleryItem = {
  image: GetImageResult
  alt: string
}

export function Gallery({ items }: { items: Array<GalleryItem> }) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <img
              src={item.image.src}
              alt={item.alt}
              {...item.image.attributes}
              className="aspect-3/4"
              loading="eager"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
