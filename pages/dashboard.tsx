import { Button, Container } from '.'
import Navbar from '../components/layout/Navbar'
import { FaTrash, FaEdit, FaThumbsUp } from 'react-icons/fa'
import { AiTwotoneLike } from 'react-icons/ai'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '../components/layout/Footer'
import Router, { useRouter } from 'next/router'
import { useStore } from '../lib/store'
import { FC, useEffect } from 'react'
import client from '../lib/client'
import { GetStaticProps } from 'next'
import { CheatsheetType } from '../db/models/Cheatsheet'

const Dashboard = () => {
  const { user, setMyCheatsheets, myCheatsheets } = useStore((state) => ({
    user: state.user,
    setMyCheatsheets: state.setMyCheatsheets,
    myCheatsheets: state.myCheatsheets,
  }))

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
              key={sheet.id}
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

      <PopularCheatsheets />

      <Footer />
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      protected: true,
    },
  }
}

export const PopularCheatsheets = () => {
  return (
    <>
      <h4 className="font-bold text-5xl mt-10 mb-5 text-primary-dark-1">
        Popular cheatsheets
      </h4>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-10">
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
      </div>
    </>
  )
}

const SmallCard = () => {
  return (
    <div className="bg-white p-7 rounded-3xl max-w-xl mx-auto w-full">
      <p className="text-2xl font-bold text-primary-dark-1">
        REST API cheatsheet
      </p>

      <div className="flex items-center gap-2 mt-5 mb-2">
        <Image
          className="object-cover rounded-full"
          width={40}
          height={40}
          src="https://i.ibb.co/yFk24Gr/image-2.png"
          alt="avatar"
        />
        <p className="font-bold text-lg text-primary-dark-1">By Jon Doe</p>
      </div>

      <div className="flex items-center text-primary-4 gap-5 mt-5">
        <div className="flex gap-2 items-center">
          <FaThumbsUp />
          <p>32</p>
        </div>

        <div className="flex items-center text-primary-pink-1 font-bold">
          232 Views
        </div>

        <div className="flex items-center text-primary-pink-1 font-bold">
          23 Cards
        </div>
      </div>
    </div>
  )
}

const CheatsheetItem: FC<{
  cheatsheet: CheatsheetType
  deleteHandler: (id: string) => Promise<void>
}> = ({ cheatsheet, deleteHandler }) => {
  return (
    <div className="bg-white p-7 py-10 pb-7 rounded-3xl">
      <div className="flex justify-between text-4xl items-start">
        <Link href={`/cheatsheets/${cheatsheet._id}`}>
          <a>
            <h2 className="font-extrabold text-primary-dark-1">
              {cheatsheet.name}
            </h2>
          </a>
        </Link>

        <div className="flex gap-2 text-gray-700">
          <FaTrash
            onClick={() => deleteHandler(cheatsheet._id)}
            className="bg-gray-200 hover:bg-gray-100 p-2 rounded-md cursor-pointer"
          />

          <FaEdit
            onClick={() => {
              Router.push(`/cheatsheets/edit/${cheatsheet._id}`)
            }}
            className="bg-gray-200 hover:bg-gray-100 p-2 rounded-md cursor-pointer"
          />
        </div>
      </div>

      <div className="flex items-center mt-10 gap-5 font-bold text-xl">
        <div className="flex items-center gap-1 text-primary-4">
          <AiTwotoneLike />
          <p>24</p>
        </div>
        <p className="text-primary-pink-1">2022 views</p>
        <p className="text-primary-pink-1">
          {cheatsheet.cards.length} Card
          {cheatsheet.cards.length === 1 ? ' ' : 's'}
        </p>
      </div>
    </div>
  )
}

export default Dashboard
