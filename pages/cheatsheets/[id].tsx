import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { Button, Container } from '..'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import H1 from '../../components/typography/H1'

interface ICardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string
}

const Card: FC<ICardProps> = ({ className, text, ...rest }) => {
  return (
    <div
      className={`bg-primary-2 rounded-xl p-12 text-primary-dark-1 w-full max-w-4xl text-3xl leading-normal font-medium ${className}`}
      {...rest}
    >
      {text}
    </div>
  )
}

const CheatsheetPage = () => {
  return (
    <>
      <Container>
        <Navbar />

        <H1 className="mt-10">Ultimate git cheatsheet</H1>

        <p className="text-[#949494] font-bold text-3xl mt-5">
          Cheatsheet by
          <span className="text-primary-orange-1">Jon Doe</span>
        </p>

        <Card
          text="In 1995, Musk, his brother Kimbal, and Greg Kouri founded web software
      company Zip2 with funds from angel investors.[23] They housed the venture at a small rented office in Palo Alto.[48] The company developed and
      marketed a"
          className="mt-10"
        />
        <div className="mt-10 flex items-center gap-5">
          <Button>Previous card</Button>
          <Button>Next card</Button>
          <Button variant={2}>Share</Button>
        </div>
        <Footer />
      </Container>
    </>
  )
}

export default CheatsheetPage
