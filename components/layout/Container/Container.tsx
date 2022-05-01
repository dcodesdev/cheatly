import { FC } from 'react'
import { IContainerProps } from './Container.types'

export const Container: FC<IContainerProps> = ({ children }) => {
  return <div className="mx-auto max-w-7xl pt-5 px-5">{children}</div>
}
