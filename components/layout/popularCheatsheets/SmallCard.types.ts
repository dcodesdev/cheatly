import { UserType } from "@db"
import { CheatsheetWLikesAndViews } from "@lib"

export interface ISmallCardProps {
  cheatsheet: CheatsheetWLikesAndViews & { author: Partial<UserType> }
}
