import type { NextPage } from 'next'
import Image from 'next/image'
import Router from 'next/router'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import Footer from '../components/layout/Footer'
import H1 from '../components/typography/H1'
import H2 from '../components/typography/H2'
import H3 from '../components/typography/H3'

export const Container: FC<{ children: any }> = ({ children }) => {
  return <div className="mx-auto max-w-7xl pt-5 px-5">{children}</div>
}

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 1 | 2
}

export const Button: FC<IButtonProps> = ({
  children,
  className,
  variant = 1,
  ...rest
}) => {
  return (
    <button
      className={`bg-primary-4 shadow-lg text-primary-dark-1 p-5 rounded-md font-bold text-2xl my-2 hover:opacity-80 duration-200 active:translate-y-1 ${
        variant === 1
          ? 'bg-primary-4'
          : 'bg-primary-2 border-2 border-primary-4'
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

const Home: NextPage = () => {
  const createCheatsheetHandler = () => {
    Router.push('/create')
  }

  return (
    <Container>
      <div className="w-full flex flex-col items-center pt-20 justify-center mx-auto">
        <Image
          width={200}
          height={200}
          src="/assets/logo.svg"
          alt="cheater logo"
        />
        <H1 className="text-center">Cheater</H1>
        <H3 className="md:w-1/2 py-10 pt-5 text-center">
          Create a cheatsheet, and share it with your audience
        </H3>
        <Button onClick={createCheatsheetHandler}>Create a cheatsheet</Button>
        <hr className="my-10 border bg-primary-dark-1 rounded-full h-2 opacity-90 w-full" />

        <H2 className="md:w-10/12 text-center mt-10">
          Create your cheatsheet easily
        </H2>
        <H3 className="py-5 text-center md:w-10/12">
          Creating a cheatsheet is just a few clicks away.
        </H3>

        <H2 className="md:w-10/12 text-center mt-10">Share your cheatsheet</H2>
        <H3 className="py-5 text-center md:w-10/12">
          You create a cheatsheet, and you get a link, that&apos;s how easy it
          is to share your cheatsheets.
        </H3>
      </div>
      <Footer />
    </Container>
  )
}

export default Home
