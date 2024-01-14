import * as React from 'react'
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from '@radix-ui/react-icons'
import {
  CommandDialog as CommandDialogRoot,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { useCommandState } from 'cmdk'

export function CommandDialog() {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [pages, setPages] = React.useState<Array<string>>([])
  const page = pages[pages.length - 1]

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      } else if (e.key === 'Escape' && open && pages.length === 0) {
        console.log('here')
        e.preventDefault()
        setOpen(false)
      } else if (e.key === 'Escape' || (e.key === 'Backspace' && !search)) {
        console.log('there')
        e.preventDefault()
        setPages(pages => pages.slice(0, -1))
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, pages.length])

  // const SubItem = (props: React.ComponentProps<typeof CommandItem>) => {
  //   const search = useCommandState(state => state.search)
  //   if (!search) return null
  //   return <CommandItem {...props} />
  // }

  return (
    <CommandDialogRoot open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Type a command or search..."
        value={search}
        onValueChange={setSearch}
      />

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {!page && (
          <>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => setPages([...pages, 'socials'])}>
                View Socials
              </CommandItem>

              <CommandItem onSelect={() => setPages([...pages, 'navigation'])}>
                Jump to...
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => setPages([...pages, 'theme'])}>
                Change Theme
              </CommandItem>
            </CommandGroup>
          </>
        )}
        {page === 'socials' ? (
          <CommandGroup heading="Socials">
            <CommandItem>Copy Email</CommandItem>
            <CommandItem>Open Twitter</CommandItem>
            <CommandItem>Open GitHub</CommandItem>
            <CommandItem>Open LinkedIn</CommandItem>
          </CommandGroup>
        ) : null}
        {page === 'navigation' ? (
          <CommandGroup heading="Jump to">
            <CommandItem>Home</CommandItem>
            <CommandItem>About</CommandItem>
            <CommandItem>Bookmarks</CommandItem>
            <CommandItem>Work</CommandItem>
          </CommandGroup>
        ) : null}
        {page === 'theme' ? (
          <CommandGroup heading="Theme">
            <CommandItem>Change theme to light</CommandItem>
            <CommandItem>Change theme to dark</CommandItem>
            <CommandItem>Change theme to system</CommandItem>
          </CommandGroup>
        ) : null}
      </CommandList>
    </CommandDialogRoot>
  )
}
