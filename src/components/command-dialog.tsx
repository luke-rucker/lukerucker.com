import * as React from 'react'
import {
  AvatarIcon,
  BackpackIcon,
  BookmarkIcon,
  CheckCircledIcon,
  CopyIcon,
  CursorArrowIcon,
  GitHubLogoIcon,
  HomeIcon,
  IdCardIcon,
  LaptopIcon,
  LinkedInLogoIcon,
  MoonIcon,
  SunIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons'
import { useHotkeys } from 'react-hotkeys-hook'
import { navigate } from 'astro:transitions/client'
import {
  CommandDialog as CommandDialogRoot,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

export function CommandDialog() {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [pages, setPages] = React.useState<Array<string>>([])
  const page = pages[pages.length - 1]

  const goBackAPage = () => setPages(pages => pages.slice(0, -1))
  const setPage = (page: string) => {
    setPages([...pages, page])
    setSearch('')
  }

  useHotkeys('mod+k', () => setOpen(open => !open))
  useHotkeys('esc', goBackAPage)

  const jumpTo = (path: string) => {
    navigate(path)
    setOpen(false)
  }

  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const reset = setTimeout(() => setCopied(false), 2500)
    return () => clearTimeout(reset)
  }, [copied])

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {}
  }

  return (
    <CommandDialogRoot
      ignoreEscapeKeyDown={pages.length > 0}
      onIgnoredEscapeKeyDown={goBackAPage}
      open={open}
      onOpenChange={setOpen}
    >
      <CommandInput
        value={search}
        onValueChange={setSearch}
        placeholder="Type a command or search..."
      />

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {!page ? (
          <>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => setPage('socials')}>
                <IdCardIcon className="mr-2 h-4 w-4" />
                View Socials
              </CommandItem>

              <CommandItem onSelect={() => setPage('navigation')}>
                <CursorArrowIcon className="mr-2 h-4 w-4" />
                Jump to...
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => setPage('theme')}>
                {document.documentElement.classList.contains('light') ? (
                  <MoonIcon className="mr-2 h-4 w-4" />
                ) : (
                  <SunIcon className="mr-2 h-4 w-4" />
                )}
                Change theme
              </CommandItem>
            </CommandGroup>
          </>
        ) : null}

        {page === 'socials' ? (
          <CommandGroup heading="Socials">
            <CommandItem onSelect={() => copy('luke@springsoftware.dev')}>
              {copied ? (
                <CheckCircledIcon className="mr-2 h-4 w-4" />
              ) : (
                <CopyIcon className="mr-2 h-4 w-4" />
              )}
              Copy Email
            </CommandItem>
            <CommandItem
              onSelect={() => window.open('https://twitter.com/lukeruckerr')}
            >
              <TwitterLogoIcon className="mr-2 h-4 w-4" />
              Open Twitter
            </CommandItem>
            <CommandItem
              onSelect={() => window.open('https://github.com/luke-rucker')}
            >
              <GitHubLogoIcon className="mr-2 h-4 w-4" />
              Open GitHub
            </CommandItem>
            <CommandItem
              onSelect={() =>
                window.open('https://linkedin.com/in/luke-rucker')
              }
            >
              <LinkedInLogoIcon className="mr-2 h-4 w-4" />
              Open LinkedIn
            </CommandItem>
          </CommandGroup>
        ) : null}

        {page === 'navigation' ? (
          <CommandGroup heading="Jump to">
            <CommandItem onSelect={() => jumpTo('/')}>
              <HomeIcon className="mr-2 h-4 w-4" />
              Home
            </CommandItem>
            <CommandItem onSelect={() => jumpTo('/about')}>
              <AvatarIcon className="mr-2 h-4 w-4" />
              About
            </CommandItem>
            <CommandItem onSelect={() => jumpTo('/bookmarks')}>
              <BookmarkIcon className="mr-2 h-4 w-4" />
              Bookmarks
            </CommandItem>
            <CommandItem onSelect={() => jumpTo('/work')}>
              <BackpackIcon className="mr-2 h-4 w-4" />
              Work
            </CommandItem>
          </CommandGroup>
        ) : null}

        {page === 'theme' ? (
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => setTheme('light')}>
              <SunIcon className="mr-2 h-4 w-4" />
              Change theme to light
            </CommandItem>
            <CommandItem onSelect={() => setTheme('dark')}>
              <MoonIcon className="mr-2 h-4 w-4" />
              Change theme to dark
            </CommandItem>
            <CommandItem onSelect={() => setTheme('system')}>
              <LaptopIcon className="mr-2 h-4 w-4" />
              Change theme to system
            </CommandItem>
          </CommandGroup>
        ) : null}
      </CommandList>
    </CommandDialogRoot>
  )
}

type Theme = 'light' | 'dark' | 'system'

function setTheme(theme: Theme) {
  localStorage.setItem('theme', theme)

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

  const newTheme = theme === 'system' ? systemTheme : theme

  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(newTheme)
}
