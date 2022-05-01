import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

export interface IPrimaryButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 1 | 2
}
