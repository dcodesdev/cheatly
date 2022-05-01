import { FormEventHandler, useEffect, useState } from 'react'
import Head from 'next/head'
import toast from 'react-hot-toast'
import Router, { useRouter } from 'next/router'

import { useLoading, useUser, client } from '@lib'
import {
  Container,
  Footer,
  H1,
  Loader,
  Navbar,
  PrimaryButton,
  PrimaryInput,
  TextArea,
  Detail,
  Label,
} from '@components'

const Edit = () => {
  const { user } = useUser()
  const { loading, setLoading } = useLoading()

  const [cheatSheetName, setCheatSheetName] = useState('')

  const [cardInputs, setCardInputs] = useState([''])

  const router = useRouter()

  useEffect(() => {
    if (!user || !router.query.id) return
    client.get(`/api/cheatsheets/${router.query.id}`).then((r) => {
      const userId = r.data.user_id
      if (userId !== user._id) {
        Router.push('/dashboard')
        return
      }
      setCheatSheetName(r.data.name)
      setCardInputs(
        r.data.cards?.map((card: { content: string }) => card.content),
      )
    })
  }, [user, router]) // eslint-disable-line

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

    const id = router.query.id
    client
      .put(`/api/cheatsheets/${id}`, {
        name: cheatSheetName,
        cards: cardInputs,
      })
      .then((r) => {
        Router.push(`/cheatsheets/${r.data._id}`)
      })
      .catch((e) => {
        toast.error(e.response.data.error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

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
    const newCards = cardInputs?.filter((i) => i) || []

    setCardInputs([...newCards, ''])
  }

  if (!user || loading) return <Loader />

  return (
    <Container>
      <Head>
        <title>Cheatly | Edit</title>
      </Head>

      <Navbar />
      <H1 className="mt-10 text-5xl md:text-7xl leading-snug">
        Create your cheatsheet
      </H1>
      <form onSubmit={submitHandler}>
        <Label className="mt-20">Cheatsheet name</Label>
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
              Update Cheatsheet
            </PrimaryButton>
          </div>
        </div>
        <Footer />
      </form>
    </Container>
  )
}

export default Edit
