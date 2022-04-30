import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { Button, Container } from '..'
import Footer from '../../components/layout/Footer'
import CheatSheet, { CheatsheetType } from '../../db/models/Cheatsheet'
import { useCopyToClipboard } from 'react-use'
import toast from 'react-hot-toast'
import Head from 'next/head'
import { useStore } from '../../lib/store'
import Card from '../../components/pages/cheatsheet/Card'
import H1 from '../../components/typography/H1'
import Navbar from '../../components/layout/Navbar'
import client from '../../lib/client'
import View from '../../db/models/View'
import { UserType } from '../../db/models/User'
import Image from 'next/image'
import {
  AiFillLike,
  AiFillStar,
  AiOutlineLike,
  AiOutlineStar,
} from 'react-icons/ai'
import Like from '../../db/models/Like'

interface Props {
  cheatsheet: CheatsheetType & {
    views: number
    user_id: UserType
    likes: number
  }
}

const CheatsheetPage: FC<Props> = ({ cheatsheet }) => {
  const router = useRouter()
  const setLoading = useStore((state) => state.setLoading)
  const user = useStore((state) => state.user)

  const [cardIndex, setCardIndex] = useState(0)

  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(0)

  const [isFaved, setIsFaved] = useState(false)

  const favoriteHandler = () => {
    client
      .get(`/api/cheatsheets/${cheatsheet._id}/favorite`)
      .then((r) => {
        setIsFaved((p) => !p)
      })
      .catch((e) => {
        console.log(e.message)
      })
  }

  useEffect(() => {
    if (user)
      client
        .get(`/api/cheatsheets/${cheatsheet._id}/isFaved`)
        .then((r) => {
          setIsFaved(r.data)
        })
        .catch((e) => {
          console.log(e.message)
        })
  }, [user])

  useEffect(() => {
    if (user)
      client
        .get(`/api/cheatsheets/${cheatsheet._id}/isLiked`)
        .then((r) => {
          setIsLiked(r.data)
        })
        .catch((e) => {
          console.log(e.message)
        })
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const [, copy] = useCopyToClipboard()

  // increases page view count
  useEffect(() => {
    client.get(`/api/cheatsheets/${cheatsheet._id}/view`).catch(() => {})
    client
      .get(`/api/cheatsheets/${cheatsheet._id}/likes`)
      .then((r) => {
        setLikes(r.data)
      })
      .catch(() => {})
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const nextHandler = () => {
    if (cardIndex + 1 > cheatsheet.cards.length - 1) return
    setCardIndex(cardIndex + 1)
  }

  const prevHandler = () => {
    if (cardIndex - 1 < 0) return

    setCardIndex(cardIndex - 1)
  }

  const shareHandler = () => {
    copy(`${window.location.origin}/cheatsheets/${cheatsheet._id}`)
    toast.success('Copied to clipboard!')
  }

  const likeHandler = () => {
    client.get(`/api/cheatsheets/${cheatsheet._id}/like`).catch(() => {})
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  useEffect(() => {
    setLoading(false)
  }, []) // eslint-disable-line

  if (router.isFallback) {
    return <></>
  }

  return (
    <>
      <Head>
        <title>Cheater | {cheatsheet.name} </title>
      </Head>

      <Container>
        <Navbar />
        <H1 className="mt-10">{cheatsheet.name}</H1>
        <div className="text-[#949494] font-bold text-3xl mt-5 flex items-center gap-2">
          <p>Cheatsheet by </p>
          <Image
            width={40}
            height={40}
            src={cheatsheet.user_id.profile_picture}
            alt={cheatsheet.user_id.username}
            className="rounded-full"
          />
          <span className="text-primary-pink-1">
            {cheatsheet.user_id.username}
          </span>
        </div>
        <Card
          text={cheatsheet.cards[cardIndex].content}
          className="mt-10"
          cardNumber={`${cardIndex + 1}/${cheatsheet.cards.length}`}
        />
        <div className="pl-1 pt-1 font-bold text-primary-dark-1 gap-2 select-none flex items-center text-xl">
          <p>
            {cheatsheet.views + (cheatsheet.views > 1 ? ' views' : ' view')}
          </p>

          {isLiked ? (
            <AiFillLike
              onClick={likeHandler}
              className="text-primary-pink-1 cursor-pointer"
            />
          ) : (
            <AiOutlineLike
              onClick={likeHandler}
              className="text-primary-pink-1 cursor-pointer"
            />
          )}
          <p>{likes}</p>

          {isFaved ? (
            <AiFillStar onClick={favoriteHandler} className="cursor-pointer" />
          ) : (
            <AiOutlineStar
              onClick={favoriteHandler}
              className="cursor-pointer"
            />
          )}
        </div>

        <div className="mt-10 flex items-center gap-5">
          <Button onClick={prevHandler}>Previous card</Button>
          <Button onClick={nextHandler}>Next card</Button>
          <Button onClick={shareHandler} variant={2}>
            Share
          </Button>
        </div>
        <Footer />
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const id = ctx.params?.id

    let [cheatsheet, views, likes] = await Promise.all([
      CheatSheet.findOne({ _id: id }).populate({
        path: 'user_id',
        select: 'username profile_picture',
      }),
      View.countDocuments({ cheatsheet_id: id }),
      Like.countDocuments({ cheatsheet_id: id }),
    ])

    cheatsheet = JSON.parse(JSON.stringify(cheatsheet))

    return {
      props: {
        cheatsheet: {
          ...cheatsheet,
          views,
          likes,
        },
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  let cheatsheets = await CheatSheet.find().select('_id').lean()

  const paths = cheatsheets.map((cheatsheet) => ({
    params: { id: cheatsheet._id.toString() },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default CheatsheetPage
