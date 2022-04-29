import { Button, Container } from '.'
import Navbar from '../components/layout/Navbar'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '../components/layout/Footer'
import Router from 'next/router'
import { useStore } from '../lib/store'
import { useEffect } from 'react'
import client from '../lib/client'
import { GetStaticProps } from 'next'
import PopularCheatsheets from '../components/layout/popularCheatsheets/PopularCheatsheets'
import CheatsheetItem from '../components/pages/dashboard/CheatsheetItem'

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

export default Dashboard
