import {
  ExclamationIcon,
  FolderIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid'
import clsx from 'clsx'
import * as React from 'react'

type AlertVariant = 'default' | 'success' | 'error'

type AlertProps = {
  variant?: AlertVariant
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'role'>

export function Alert({
  variant = 'default',
  children,
  className,
  ...props
}: AlertProps) {
  const iconClasses = 'w-6 h-6 mx-2 stroke-current'

  const icons: { [key in AlertVariant]: React.ReactNode } = {
    default: <InformationCircleIcon className={iconClasses} />,
    success: <FolderIcon className={iconClasses} />,
    error: <ExclamationIcon className={iconClasses} />,
  }

  return (
    <div
      className={clsx('flex px-3 py-2', className, {
        'bg-white shadow-xl': variant === 'default',
        'bg-green-200 text-green-600': variant === 'success',
        'bg-red-200 text-red-600': variant === 'error',
      })}
      role="alert"
      {...props}
    >
      {icons[variant]}
      {children}
    </div>
  )
}
