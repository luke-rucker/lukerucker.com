import { buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

export function MobileNav({ currentPathname }: { currentPathname: string }) {
  return (
    <Sheet>
      <SheetTrigger>
        <HamburgerMenuIcon className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="text-lg font-bold mb-3">
          Luke Rucker
        </SheetHeader>

        <ul className="text-center sm:text-left space-y-4">
          {[
            { title: 'Home', to: '/' },
            { title: 'About', to: '/about' },
            { title: 'Bookmarks', to: '/bookmarks' },
            { title: 'Work', to: '/work' },
          ].map(navItem => (
            <li key={navItem.title}>
              <a
                href={navItem.to}
                className={cn([currentPathname === navItem.to && 'underline'])}
              >
                {navItem.title}
              </a>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}
