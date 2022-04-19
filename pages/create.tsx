import React, {
  DetailedHTMLProps,
  FC,
  FormEventHandler,
  HTMLAttributes,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { Button, Container } from '.'
import TextArea from '../components/inputs/TextArea'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import H1 from '../components/typography/H1'
import axios from 'axios'
import Router from 'next/router'
import { useLocalStorage } from 'react-use'
import { trackPromise } from 'react-promise-tracker'

interface ILabelProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Label: FC<ILabelProps> = ({ children, className, ...rest }) => {
  return (
    <div
      className={`text-[28px] font-bold text-primary-dark-1 ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

interface IInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input: FC<IInputProps> = ({ className, ...rest }) => {
  return (
    <input
      className={`bg-primary-2 py-4 px-8 w-full max-w-lg text-primary-dark-1 placeholder-slate-600 rounded-lg outline-primary-pink-1 ${className}`}
      {...rest}
      type="text"
    />
  )
}

interface IDetailProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {}

const Detail: FC<IDetailProps> = ({ className, children, ...rest }) => {
  return (
    <p className={`text-xs md:text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  )
}

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
  const [name, setName] = useLocalStorage('name', '')
  const [cheatSheetName, setCheatSheetName] = useLocalStorage(
    'cheatsheetName',
    '',
  )

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
    const newCards = cardInputs?.filter((i) => i) || []

    setCardInputs([...newCards, ''])
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!name) {
      toast.error('Name is required.')
      return
    }
    if (!cheatSheetName) {
      toast.error('Cheat Sheet Name is required.')
      return
    }
    if (!cardInputs?.filter((c) => c).length) {
      toast.error('At least one card is required.')
      return
    }

    trackPromise(
      axios
        .post('/api/cheatsheets', {
          name: cheatSheetName,
          author_name: name,
          cards: cardInputs,
        })
        .then((r) => {
          Router.push(`/cheatsheets/${r.data._id}`)
          setName('')
          setCheatSheetName('')
          setCardInputs([''])
        })
        .catch((e) => {
          toast.error(e.response.data.error)
        }),
    )
  }

  return (
    <Container>
      <Navbar />
      <H1 className="mt-10 text-5xl md:text-7xl leading-snug">
        Create your cheatsheet
      </H1>
      <form onSubmit={submitHandler}>
        <h2 className="text-5xl font-bold text-primary-dark-1 mt-20">Author</h2>

        <Label className="mt-10">Name</Label>
        <Input
          onChange={(e) => {
            setName(e.target.value)
          }}
          value={name}
          placeholder="Enter your name"
        />
        <Detail className="m-1">
          Your name will not appear on cheatsheets.
        </Detail>

        <h2 className="text-5xl font-bold text-primary-dark-1 mt-10">
          The cheatsheet
        </h2>

        <Label className="mt-5">Cheatsheet name</Label>
        <Input
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
            <Button
              type="button"
              onClick={addNewCard}
              className="w-max text-base py-3"
            >
              Next card
            </Button>
            <Button type="submit" className="w-max text-base py-3">
              Publish Cheatsheet
            </Button>
          </div>
        </div>
        <Footer />
      </form>
    </Container>
  )
}

export default Create
