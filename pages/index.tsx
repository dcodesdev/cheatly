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

const desc =
  'Cheatly is a simple cheatsheet generator. Create cheatsheets and share them with your audience.'

const title = 'Cheatly | A simple cheatsheet generator'

const link = 'https://cheatly.vercel.app'

const siteName = 'Cheatly'

const image = 'https://i.ibb.co/Wx91dNP/cheatly.png'

const color = '#F7F7F7'

const Home: FC<IHomeProps> = ({ cheatsheetCount, userCount }) => {
  const { user } = useUser()

  const createCheatsheetHandler = () => {
    if (user) return Router.push('/dashboard')

    Router.push('/api/auth/twitter/login')
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Cheatly is a simple cheatsheet generator. Create cheatsheets and share them with your audience."
        />

        <meta name="description" content={desc} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={link} />
        <meta property="og:site_name" content={siteName} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={image} />
        <meta name="theme-color" content={color} />
      </Head>
      <Container>
        <div className="w-full flex flex-col items-center pt-20 justify-center mx-auto">
          <Image
            width={200}
            height={200}
            src="/assets/logo.svg"
            alt="cheatly logo"
          />
          <H1 className="text-center">Cheatly</H1>
          <H3 className="md:w-1/2 py-10 pt-5 text-center">
            Create a cheatsheet, and share it with your audience
          </H3>

          <div className="font-bold text-primary-dark-1 text-center">
            <span className="text-primary-pink-1">
              {cheatsheetCount} cheatsheets{' '}
            </span>
            are hosted on Cheatly{' '}
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
