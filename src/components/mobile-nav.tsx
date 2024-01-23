import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import * as React from 'react'

export function MobileNav() {
  const [currentPathname, setCurrentPathname] = React.useState('')

  React.useEffect(() => {
    setCurrentPathname(window.location.pathname)
  }, [])

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
                {...(currentPathname === navItem.to
                  ? { 'aria-current': 'page' }
                  : null)}
                href={navItem.to}
                className="aria-[current=page]:underline"
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
