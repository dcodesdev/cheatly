import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import { UserType } from '../../../db/models/User'
import { CheatsheetWLikesAndViews } from '../../../lib/store'

interface ISmallCardProps {
  cheatsheet: CheatsheetWLikesAndViews & { author: Partial<UserType> }
}

const SmallCard: FC<ISmallCardProps> = ({ cheatsheet }) => {
  return (
    <div className="bg-white p-7 rounded-3xl max-w-xl mx-auto w-full">
      <Link href={`/cheatsheets/${cheatsheet._id}`}>
        <a>
          <p className="text-2xl font-bold text-primary-dark-1">
            {cheatsheet.name}
          </p>
        </a>
      </Link>

      <div className="flex items-center gap-2 mt-5 mb-2">
        <Image
          className="object-cover rounded-full"
          width={40}
          height={40}
          src={cheatsheet.author.profile_picture as string}
          alt={cheatsheet.author.username}
        />
        <p className="font-bold text-lg text-primary-dark-1">
          By {cheatsheet.author.username}
        </p>
      </div>

      <div className="flex items-center text-primary-4 gap-5 mt-5">
        <div className="flex gap-2 items-center">
          <FaThumbsUp />
          <p>{cheatsheet.likes}</p>
        </div>

        <div className="flex items-center text-primary-pink-1 font-bold">
          {cheatsheet.views} Views
        </div>

        <div className="flex items-center text-primary-pink-1 font-bold">
          {cheatsheet.cards.length} Cards
        </div>
      </div>
    </div>
  )
}

export default SmallCard
