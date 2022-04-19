import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

interface IH2Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {}

const H3: FC<IH2Props> = ({ children, className, ...rest }) => {
  return (
    <h2
      className={`font-medium text-primary-dark-1 text-4xl leading-snug ${className}`}
      {...rest}
    >
      {children}
    </h2>
  )
}

export default H3
