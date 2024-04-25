import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import * as React from 'react'
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'

export function ExpandableText({
  children,
  preview,
}: {
  children: React.ReactNode
  preview: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      {open ? (
        <div className="prose dark:prose-invert prose-p:mb-0">
          <CollapsibleContent>{children}</CollapsibleContent>

          <CollapsibleTrigger asChild>
            <Button variant="link" className="px-0">
              <MinusIcon className="mr-1" />
              <span>Read less</span>
            </Button>
          </CollapsibleTrigger>
        </div>
      ) : (
        <div className="prose dark:prose-invert prose-p:mb-0 ">
          <p
            dangerouslySetInnerHTML={{ __html: preview }}
            className="text-ellipsis line-clamp-3 md:line-clamp-2"
          />

          <CollapsibleTrigger asChild>
            <Button variant="link" className="px-0">
              <PlusIcon className="mr-1" />
              <span>Read more</span>
            </Button>
          </CollapsibleTrigger>
        </div>
      )}
    </Collapsible>
  )
}
