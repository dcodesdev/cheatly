import { atom, useRecoilState } from "recoil"
import { UserType } from "../db/models/User"

const userState = atom<UserType | null>({
  key: "user",
  default: null,
})

export const useUser = () => {
  const [user, setUser] = useRecoilState(userState)
  const { loading } = useLoading()

  return {
    user,
    setUser,
    loading,
  }
}

const loadingState = atom({
  key: "loading",
  default: true,
})

export const useLoading = () => {
  const [loading, setLoading] = useRecoilState(loadingState)

  return {
    loading,
    setLoading,
  }
}
