import { CheatsheetType } from "@db"

export interface ICheatsheetItemProps {
  cheatsheet: CheatsheetType & { likes: number; views: number }
  deleteHandler: (id: string) => Promise<void>
}
