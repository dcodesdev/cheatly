import { FC } from 'react'
import { IH1Props } from '.'

export const H1: FC<IH1Props> = ({ children, className, ...rest }) => {
  return (
    <h1
      className={`text-3xl md:text-7xl font-extrabold text-primary-dark-1 ${className}`}
      {...rest}
    >
      {children}
    </h1>
  )
}
