import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import { FC } from 'react'

import CheatSheet from '@db/models/User'
import User from '@db/models/User'
import { useUser } from '@lib'
import {
  PrimaryButton,
  Container,
  IHomeProps,
  H1,
  H2,
  H3,
  Footer,
  PopularCheatsheets,
} from '@components'

const Home: FC<IHomeProps> = ({ cheatsheetCount, userCount }) => {
  const { user } = useUser()

  const createCheatsheetHandler = () => {
    if (user) return Router.push('/dashboard')

    Router.push('/api/auth/twitter/login')
  }

  return (
    <>
      <Head>
        <title>Cheater | A simple cheatsheet generator</title>
        <meta
          name="description"
          content="Cheater is a simple cheatsheet generator. It is a free project by built by Dawson."
        />
      </Head>
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

          <div className="font-bold text-primary-dark-1 text-center">
            <span className="text-primary-pink-1">
              {cheatsheetCount} cheatsheets{' '}
            </span>
            are hosted on cheater.link{' '}
            <span className="text-primary-pink-1">
              by {userCount} {userCount === 1 ? 'user' : 'users'}.
            </span>
          </div>
          <PrimaryButton onClick={createCheatsheetHandler}>
            Create a cheatsheet
          </PrimaryButton>
          <hr className="my-10 border bg-primary-dark-1 rounded-full h-2 opacity-90 w-full" />

          <H2 className="md:w-10/12 text-center mt-10">
            Create your cheatsheet easily
          </H2>
          <H3 className="py-5 text-center md:w-10/12">
            Creating a cheatsheet is just a few clicks away.
          </H3>

          <H2 className="md:w-10/12 text-center mt-10">
            Share your cheatsheet
          </H2>
          <H3 className="py-5 text-center md:w-10/12">
            You create a cheatsheet, and you get a link, that&apos;s how easy it
            is to share your cheatsheets.
          </H3>
        </div>
        <hr className="my-10" />
        <PopularCheatsheets />

        <Footer />
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const cheatsheetCount = await CheatSheet.countDocuments()
  const userCount = await User.countDocuments()

  return {
    props: { cheatsheetCount, userCount },
    revalidate: 100,
  }
}

export default Home
