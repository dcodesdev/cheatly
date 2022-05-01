import { FC } from 'react'
import { ILabelProps } from '.'

export const Label: FC<ILabelProps> = ({ children, className, ...rest }) => {
  return (
    <div
      className={`text-[28px] font-bold text-primary-dark-1 ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
