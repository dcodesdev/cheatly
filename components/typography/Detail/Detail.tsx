import { FC } from 'react'
import { IDetailProps } from '.'

export const Detail: FC<IDetailProps> = ({ className, children, ...rest }) => {
  return (
    <p className={`text-xs md:text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  )
}
