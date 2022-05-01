import { FC } from 'react'
import { IPrimaryButtonProps } from '.'

export const PrimaryButton: FC<IPrimaryButtonProps> = ({
  children,
  className,
  variant = 1,
  ...rest
}) => {
  return (
    <button
      className={`bg-primary-4 shadow-lg text-primary-dark-1 p-4 rounded-md font-bold my-2 hover:opacity-80 duration-200 active:translate-y-1 ${
        variant === 1
          ? 'bg-primary-4'
          : 'bg-primary-2 border-2 border-primary-4'
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
