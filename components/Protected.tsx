import Router from 'next/router'
import { FC, useEffect, ReactNode } from 'react'
import { useUser } from '../lib/store'

// type Protect = (Component: FC<any>) => JSX.Element

const Protected: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useUser()

  useEffect(() => {
    if (!user) {
      Router.push('/')
    }
  }, [user])

  return <>{children}</>
}

export default Protected
