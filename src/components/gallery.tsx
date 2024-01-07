import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import type { GetImageResult } from 'astro'
import Autoplay from 'embla-carousel-autoplay'

type GalleryItem = {
  image: GetImageResult
  alt: string
}

export function Gallery({ items }: { items: Array<GalleryItem> }) {
  return (
    <Carousel
      className="overflow-x-hidden"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{
        align: 'start',
        loop: true,
      }}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className="basis-1/12">
            <img
              src={item.image.src}
              alt={item.alt}
              {...item.image.attributes}
              className="aspect-3/4 rounded"
              loading="eager"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
