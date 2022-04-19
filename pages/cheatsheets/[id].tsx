import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react'
import { Button, Container } from '..'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import H1 from '../../components/typography/H1'
import CheatSheet, { CheatsheetType } from '../../db/models/Cheatsheet'
import { useCopyToClipboard } from 'react-use'
import toast from 'react-hot-toast'

interface ICardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string
  cardNumber: string
}

const Card: FC<ICardProps> = ({ className, text, cardNumber, ...rest }) => {
  return (
    <div
      className={`bg-primary-2 flex flex-col justify-between rounded-xl text-primary-dark-1 w-full max-w-4xl text-3xl leading-normal font-medium ${className}`}
      {...rest}
    >
      <div className="p-10">{text}</div>

      <div className="text-primary-orange-1 font-bold p-3 text-right">
        {cardNumber}
      </div>
    </div>
  )
}

const CheatsheetPage: FC<{ cheatsheet: CheatsheetType }> = ({ cheatsheet }) => {
  const router = useRouter()

  const [cardIndex, setCardIndex] = useState(0)

  const [, copy] = useCopyToClipboard()

  const nextHandler = () => {
    if (cardIndex + 1 > cheatsheet.cards.length - 1) return
    setCardIndex(cardIndex + 1)
  }

  const prevHandler = () => {
    if (cardIndex - 1 < 0) return

    setCardIndex(cardIndex - 1)
  }

  const shareHandler = () => {
    copy(`${window.location.origin}/cheatsheets/${router.query.id}`)
    toast.success('Copied to clipboard!')
  }

  if (router.isFallback) {
    return <></>
  }

  return (
    <>
      <Container>
        <Navbar />

        <H1 className="mt-10">{cheatsheet.name}</H1>

        {/* <p className="text-[#949494] font-bold text-3xl mt-5">
          Cheatsheet by
          <span className="text-primary-orange-1">Jon Doe</span>
        </p> */}

        <Card
          text={cheatsheet.cards[cardIndex].content}
          className="mt-10"
          cardNumber={`${cardIndex + 1}/${cheatsheet.cards.length}`}
        />
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
    let cheatsheet = await CheatSheet.findById(ctx.params?.id)
      .lean()
      .select('-author_name')
    cheatsheet = JSON.parse(JSON.stringify(cheatsheet))

    return {
      props: {
        cheatsheet,
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
