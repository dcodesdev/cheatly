import { Button, Container } from '.'
import Navbar from '../components/layout/Navbar'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '../components/layout/Footer'
import Router from 'next/router'
import { CheatsheetWLikesAndViews, useStore } from '../lib/store'
import { FC, useEffect, useState } from 'react'
import client from '../lib/client'
import { GetStaticProps } from 'next'
import PopularCheatsheets from '../components/layout/popularCheatsheets/PopularCheatsheets'
import CheatsheetItem from '../components/pages/dashboard/CheatsheetItem'
import { AiTwotoneLike } from 'react-icons/ai'
import { UserType } from '../db/models/User'

const Dashboard = () => {
  const { user, setMyCheatsheets, myCheatsheets } = useStore((state) => ({
    user: state.user,
    setMyCheatsheets: state.setMyCheatsheets,
    myCheatsheets: state.myCheatsheets,
  }))

  const [favorites, setFavorites] = useState<
    (CheatsheetWLikesAndViews & { user_id: { name: string } })[]
  >([])

  const getFavoriteCheatsheets = () => {
    client
      .get(`/api/cheatsheets/favorites`)
      .then((r) => {
        setFavorites(r.data)
      })
      .catch((e) => {
        console.log(e.message)
      })
  }

  useEffect(() => {
    getFavoriteCheatsheets()
  }, [])

  const getCheatsheets = () =>
    client
      .get('/api/cheatsheets/my')
      .then((r) => {
        setMyCheatsheets(r.data)
      })
      .catch((e) => {
        console.log(e.message)
      })

  useEffect(() => {
    getCheatsheets()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const deleteHandler = async (id: string) => {
    if (!window.confirm('Sure?')) return
    client
      .delete(`/api/cheatsheets/${id}`)
      .then(() => {
        getCheatsheets()
      })
      .catch((e) => {
        console.log(e.message)
      })
  }

  return (
    <Container>
      <Navbar />

      <div className="flex items-center mt-10 gap-2">
        <h3 className="font-bold text-2xl">
          Welcome back{' '}
          <span className="text-primary-pink-1">
            {user?.name?.split(' ')[0]}
          </span>
        </h3>

        <div className="self-center">
          <Image
            className="object-cover rounded-full"
            width={40}
            height={40}
            src={user?.profile_picture as string}
            alt={user?.name}
          />
        </div>
      </div>
      <Button
        onClick={() => {
          Router.push('/create')
        }}
        className="mt-10"
      >
        Create New cheatsheet
      </Button>
      <hr className="mt-10" />

      <h4 className="font-bold text-3xl mt-10 mb-5 text-primary-dark-1">
        Your cheatsheets
      </h4>

      {myCheatsheets.length > 0 ? (
        <div className="grid gap-2">
          {myCheatsheets.map((sheet) => (
            <CheatsheetItem
              deleteHandler={deleteHandler}
              cheatsheet={sheet}
              key={sheet._id}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 text-2xl mt-10 ml-2 min-h-[20rem]">
          <p>
            Currently you have not cheatsheets, why don&apos;t you{' '}
            <Link href="/create">
              <a className="text-primary-pink-1">create one?</a>
            </Link>
          </p>
        </div>
      )}

      <hr className="mt-10" />

      <h4 className="font-bold text-3xl mt-10 mb-5 text-primary-dark-1">
        Your favorites
      </h4>

      {favorites.length > 0 ? (
        <div className="grid gap-2">
          {favorites.map((sheet) => (
            <FavoriteCheatsheetItem cheatsheet={sheet} key={sheet._id} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 text-2xl mt-10 ml-2 min-h-[20rem]">
          <p>Currently you don&apos;t have any favorites.</p>
        </div>
      )}

      <hr className="mt-10" />

      <PopularCheatsheets />

      <Footer />
    </Container>
  )
}

const FavoriteCheatsheetItem: FC<{
  cheatsheet: CheatsheetWLikesAndViews & { user_id: Partial<UserType> }
}> = ({ cheatsheet }) => {
  return (
    <div className="bg-white p-7 py-10 pb-7 rounded-3xl">
      <div className="flex text-4xl items-center gap-5">
        <Link href={`/cheatsheets/${cheatsheet._id}`}>
          <a>
            <h2 className="font-extrabold text-primary-dark-1">
              {cheatsheet.name}
            </h2>
          </a>
        </Link>
        <p className="text-lg font-medium text-gray-500">
          by {cheatsheet.user_id.name?.split(' ')[0]}
        </p>
      </div>

      <div className="flex items-center mt-10 gap-5 font-bold text-xl">
        <div className="flex items-center gap-1 text-primary-4">
          <AiTwotoneLike />
          <p>{cheatsheet.likes}</p>
        </div>
        <p className="text-primary-pink-1">{cheatsheet.views} views</p>
        <p className="text-primary-pink-1">
          {cheatsheet.cards.length} Card
          {cheatsheet.cards.length === 1 ? ' ' : 's'}
        </p>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      protected: true,
    },
  }
}

export default Dashboard
