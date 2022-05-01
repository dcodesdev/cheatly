import { UserType } from "../db/models/User"
import create from "zustand"
import { CheatsheetType } from "../db/models/Cheatsheet"

export interface CheatsheetWLikesAndViews extends CheatsheetType {
  likes: number
  views: number
}

interface IStore {
  user: UserType | null
  setUser: (user: UserType | null) => void

  loading: boolean
  setLoading: (loading: boolean) => void

  myCheatsheets: CheatsheetWLikesAndViews[]
  setMyCheatsheets: (cheatsheets: CheatsheetWLikesAndViews[]) => void

  popularCheatsheets: (CheatsheetWLikesAndViews & {
    author: Partial<UserType>
  })[]
  setPopularCheatsheets: (
    popular: (CheatsheetWLikesAndViews & { author: Partial<UserType> })[]
  ) => void
}

export const useStore = create<IStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  loading: true,
  setLoading: (loading) => set({ loading }),

  myCheatsheets: [],
  setMyCheatsheets: (cheatsheets) => set({ myCheatsheets: cheatsheets }),

  popularCheatsheets: [],
  setPopularCheatsheets: (popular) => set({ popularCheatsheets: popular }),
}))

export const useUser = () => {
  const { user, setUser } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }))

  return {
    user,
    setUser,
  }
}

export const useLoading = () => {
  const { loading, setLoading } = useStore((state) => ({
    loading: state.loading,
    setLoading: state.setLoading,
  }))

  return {
    loading,
    setLoading,
  }
}

export const useMyCheatsheets = () => {
  const { myCheatsheets, setMyCheatsheets } = useStore((state) => ({
    myCheatsheets: state.myCheatsheets,
    setMyCheatsheets: state.setMyCheatsheets,
  }))

  return {
    myCheatsheets,
    setMyCheatsheets,
  }
}

export const usePopularCheatsheets = () => {
  const { popularCheatsheets, setPopularCheatsheets } = useStore((state) => ({
    popularCheatsheets: state.popularCheatsheets,
    setPopularCheatsheets: state.setPopularCheatsheets,
  }))

  return {
    popularCheatsheets,
    setPopularCheatsheets,
  }
}
