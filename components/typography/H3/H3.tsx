import { FC } from 'react'
import { IH3Props } from './H3.types'

export const H3: FC<IH3Props> = ({ children, className, ...rest }) => {
  return (
    <h2
      className={`text-primary-dark-1 text-3xl md:text-4xl leading-snug ${className}`}
      {...rest}
    >
      {children}
    </h2>
  )
}
