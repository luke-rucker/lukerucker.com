import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import type { OgObject } from 'open-graph-scraper/dist/lib/types'

export function LinkPreview({
  href,
  title,
  children,
}: {
  href?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href={href} target="_blank">
          <h3 className="text-2xl font-semibold hover:underline">{title}</h3>
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-96">{children}</HoverCardContent>
    </HoverCard>
  )
}

export function Favicon({ og }: { og: OgObject }) {
  const faviconUrl = () => {
    if (!og.favicon) return
    if (og.favicon?.startsWith('http')) return og.favicon

    if (!og.requestUrl) return
    const requestUrl = new URL(og.requestUrl)
    requestUrl.pathname = og.favicon
    return requestUrl.toString()
  }

  const fallback = () => {
    if (og.requestUrl) {
      const host = new URL(og.requestUrl).host
      return host.startsWith('www.') ? host.slice(4, 6) : host.slice(0, 2)
    }
  }

  return (
    <Avatar className="w-5 h-5">
      <AvatarImage src={faviconUrl()} />
      <AvatarFallback>{fallback()}</AvatarFallback>
    </Avatar>
  )
}
