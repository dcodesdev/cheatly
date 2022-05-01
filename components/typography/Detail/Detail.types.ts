import { DetailedHTMLProps, HTMLAttributes } from "react"

export interface IDetailProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {}
