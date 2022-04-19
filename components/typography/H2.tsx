import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

interface IH1Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {}

const H2: FC<IH1Props> = ({ children, className, ...rest }) => {
  return (
    <h1
      className={`text-7xl leading-tight font-extrabold text-primary-dark-1 ${className}`}
    >
      {children}
    </h1>
  )
}

export default H2
