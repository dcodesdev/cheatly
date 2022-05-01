import { FormEventHandler, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Router from 'next/router'
import { useLocalStorage } from 'react-use'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import {
  Container,
  Footer,
  H1,
  Navbar,
  PrimaryButton,
  TextArea,
  Detail,
  Label,
  PrimaryInput,
} from '@components'
import { client, useStore } from '@lib'

const useCards = () => {
  const [cardInputs, setCardInputs] = useState<string[]>([''])
  const [localCards, setLocalCards] = useLocalStorage<string[]>('cards', [''])

  useEffect(() => {
    setLocalCards(cardInputs)
  }, [cardInputs]) // eslint-disable-line

  useEffect(() => {
    setCardInputs(localCards || [''])
  }, []) // eslint-disable-line

  return { cardInputs, setCardInputs }
}

const Create = () => {
  const [cheatSheetName, setCheatSheetName] = useLocalStorage(
    'cheatsheetName',
    '',
  )

  const setLoading = useStore((store) => store.setLoading)

  const { cardInputs, setCardInputs } = useCards()

  const handleCardInputChange = (index: number, value: string) => {
    if (value.length > 300) return

    setCardInputs((p) =>
      p.map((card, _idx) => {
        if (_idx === index) {
          return value
        }
        return card
      }),
    )
  }

  const addNewCard = () => {
    const newCards = cardInputs?.filter((i) => i) || [] // removes empty strings

    setCardInputs([...newCards, ''])
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (!cheatSheetName) {
      toast.error('Cheat Sheet Name is required.')
      return
    }
    if (!cardInputs?.filter((c) => c).length) {
      toast.error('At least one card is required.')
      return
    }

    setLoading(true)

    client
      .post('/api/cheatsheets', {
        name: cheatSheetName,
        cards: cardInputs,
      })
      .then((r) => {
        Router.push(`/cheatsheets/${r.data._id}`)

        setCheatSheetName('')
        setCardInputs([''])
      })
      .catch((e) => {
        toast.error(e.response.data.error)
        setLoading(false)
      })
  }

  return (
    <Container>
      <Head>
        <title>Cheater | Create a cheatsheet</title>
      </Head>

      <Navbar />
      <H1 className="mt-10 text-5xl md:text-7xl leading-snug">
        Create your cheatsheet
      </H1>
      <form onSubmit={submitHandler}>
        <h2 className="text-5xl font-bold text-primary-dark-1 mt-20">Author</h2>

        <Detail className="m-1">
          Your name will not appear on cheatsheets.
        </Detail>

        <h2 className="text-5xl font-bold text-primary-dark-1 mt-10">
          The cheatsheet
        </h2>

        <Label className="mt-5">Cheatsheet name</Label>
        <PrimaryInput
          onChange={(e) => {
            setCheatSheetName(e.target.value)
          }}
          value={cheatSheetName}
          placeholder="What do you want to name your cheatsheet?"
        />
        <Detail className="md:w-1/3 m-1">
          You will have to create cards containing only 300 letters each. A
          cheatsheet can have up to 100 cards.
        </Detail>

        <div className="grid gap-2 my-5">
          {cardInputs?.map((cardInput, index) => {
            return (
              <div key={index}>
                <TextArea
                  value={cardInput}
                  onChange={(e) => handleCardInputChange(index, e.target.value)}
                  placeholder="Your cheatsheet details..."
                />
                <p
                  className={`text-xs ml-2 -mt-1 ${
                    cardInput.length > 200
                      ? 'text-red-500'
                      : cardInput.length > 100
                      ? 'text-yellow-500'
                      : ''
                  }`}
                >
                  {300 - cardInput.length}
                </p>
              </div>
            )
          })}
          <div className="flex flex-col md:flex-row md:items-center gap-x-5">
            <PrimaryButton
              type="button"
              onClick={addNewCard}
              className="w-max text-base py-3"
            >
              Next card
            </PrimaryButton>
            <PrimaryButton type="submit" className="w-max text-base py-3">
              Publish Cheatsheet
            </PrimaryButton>
          </div>
        </div>
        <Footer />
      </form>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { protected: true },
  }
}

export default Create
