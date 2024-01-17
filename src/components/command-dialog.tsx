import * as React from 'react'
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from '@radix-ui/react-icons'
import { useHotkeys } from 'react-hotkeys-hook'
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

  const goBackAPage = () => setPages(pages => pages.slice(0, -1))

  useHotkeys('mod+k', () => setOpen(open => !open))
  useHotkeys('esc', goBackAPage)

  // const SubItem = (props: React.ComponentProps<typeof CommandItem>) => {
  //   const search = useCommandState(state => state.search)
  //   if (!search) return null
  //   return <CommandItem {...props} />
  // }

  return (
    <CommandDialogRoot
      ignoreEscapeKeyDown={pages.length > 0}
      onIgnoredEscapeKeyDown={goBackAPage}
      open={open}
      onOpenChange={setOpen}
    >
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
