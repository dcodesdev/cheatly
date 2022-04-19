import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'

interface IInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input: FC<IInputProps> = ({ className, ...rest }) => {
  return (
    <input
      className={`bg-primary-2 py-4 px-8 w-full max-w-lg text-primary-dark-1 placeholder-slate-600 rounded-lg outline-primary-pink-1 ${className}`}
      {...rest}
      type="text"
    />
  )
}

export default Input
