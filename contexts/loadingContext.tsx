import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

export const LoadingContext = createContext<{
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}>({
  loading: false,
  setLoading: () => {},
})

const LoadingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  const { loading, setLoading } = useContext(LoadingContext)

  return { loading, setLoading }
}

export default LoadingProvider
