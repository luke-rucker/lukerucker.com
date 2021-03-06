import clsx from 'clsx'
import { Link as RemixLink, LinkProps } from 'remix'

export function Link({
  prefetch = 'intent',
  className,
  children,
  ...props
}: LinkProps) {
  return (
    <RemixLink
      prefetch={prefetch}
      className={clsx('link', className)}
      {...props}
    >
      {children}
    </RemixLink>
  )
}
