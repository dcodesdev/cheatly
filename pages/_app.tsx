import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import Loader from '../components/Loader'
import { RecoilRoot } from 'recoil'
import { FC, ReactNode, useEffect } from 'react'
import { useLoading, useUser } from '../lib/store'
import axios from '../lib/client'
import Cookies from 'js-cookie'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <UserProvider>
        <div className="bg-primary-3 min-h-screen">
          <Loader />
          <Component {...pageProps} />
          <Toaster />
        </div>
      </UserProvider>
    </RecoilRoot>
  )
}

// initiates the user state
const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { user, setUser } = useUser()
  const { loading, setLoading } = useLoading()

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      setLoading(false)
      return
    }

    if (user) return

    setLoading(true)
    axios
      .get('/api/auth/me')
      .then((r) => {
        setUser(r.data)
      })
      .catch((e) => {
        console.log(e.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <Loader />

  return <>{children}</>
}

export default MyApp
