import { FC } from 'react'
import { IH2Props } from '.'

export const H2: FC<IH2Props> = ({ children, className, ...rest }) => {
  return (
    <h1
      className={`text-5xl md:text-6xl leading-tight font-extrabold text-primary-dark-1 ${className}`}
    >
      {children}
    </h1>
  )
}
