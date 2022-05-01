import { DetailedHTMLProps, HTMLAttributes } from "react"

export interface ICardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string
  cardNumber: string
}
