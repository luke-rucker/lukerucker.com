import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import type { ImageWithBlurhash } from '@/lib/images'
import Autoplay from 'embla-carousel-autoplay'

export function Gallery({ items }: { items: Array<ImageWithBlurhash> }) {
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
        duration: 40,
      }}
    >
      <CarouselContent>
        {items.map(({ img, css }, index) => (
          <CarouselItem
            key={index}
            className="basis-1/4 md:basis-1/6 xl:basis-1/12"
          >
            <div className="relative block overflow-hidden aspect-3/4 rounded">
              <div
                aria-hidden
                style={css}
                className="absolute inset-0 w-full h-full transform scale-150 filter blur-2xl z-[-1]"
              />

              <img {...img} loading="lazy" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
