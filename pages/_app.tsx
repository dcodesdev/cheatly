import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import Loader from '../components/Loader'
import { FC, ReactNode, useEffect } from 'react'
import { useLoading, useUser } from '../lib/store'
import axios from '../lib/client'
import Cookies from 'js-cookie'
import Router from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider pageProps={pageProps}>
      <div className="bg-primary-3 min-h-screen">
        <Loader />
        <Component {...pageProps} />
        <Toaster />
      </div>
    </UserProvider>
  )
}

// initiates the user state
const UserProvider: FC<{ children: ReactNode; pageProps: any }> = ({
  children,
  pageProps,
}) => {
  const { setLoading } = useLoading()
  const { user, setUser } = useUser()

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      setLoading(false)
      Router.push('/')
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
        Router.push('/')
      })
      .finally(() => {
        setLoading(false)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (pageProps.protected && !user) return <Loader />

  return <>{children}</>
}

export default MyApp
