import { FC } from 'react'
import { ICardProps } from '.'

export const Card: FC<ICardProps> = ({
  className,
  text,
  cardNumber,
  ...rest
}) => {
  return (
    <div
      className={`bg-primary-2 flex flex-col justify-between rounded-xl text-primary-dark-1 w-full max-w-4xl md:text-lg leading-normal font-medium ${className}`}
      {...rest}
    >
      <div className="p-10">{text}</div>

      <div className="text-primary-pink-1 font-bold p-3 text-right">
        {cardNumber}
      </div>
    </div>
  )
}
