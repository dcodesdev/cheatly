import { UserType } from "../db/models/User"
import create from "zustand"
import { CheatsheetType } from "../db/models/Cheatsheet"

interface IStore {
  user: UserType | null
  setUser: (user: UserType | null) => void

  loading: boolean
  setLoading: (loading: boolean) => void

  myCheatsheets: CheatsheetType[]
  setMyCheatsheets: (cheatsheets: CheatsheetType[]) => void
}

export const useStore = create<IStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  loading: true,
  setLoading: (loading) => set({ loading }),

  myCheatsheets: [],
  setMyCheatsheets: (cheatsheets) => set({ myCheatsheets: cheatsheets }),
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
