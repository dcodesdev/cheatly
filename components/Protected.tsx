import Router from 'next/router'
import { FC, useEffect, ReactNode } from 'react'
import { useUser } from '../lib/store'
import Loader from './Loader'

// type Protect = (Component: FC<any>) => JSX.Element

const Protected: FC<{ children: ReactNode }> = ({ children }) => {
  const { user, loading } = useUser()

  useEffect(() => {
    if (!user && !loading) {
      Router.push('/')
    }
  }, [user, loading])

  if (!user) return <Loader />

  return <>{children}</>
}

export default Protected
