import Link from 'next/link'
import Router from 'next/router'
import { FC } from 'react'
import { AiTwotoneLike } from 'react-icons/ai'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { ICheatsheetItemProps } from '.'

export const CheatsheetItem: FC<ICheatsheetItemProps> = ({
  cheatsheet,
  deleteHandler,
}) => {
  return (
    <div className="bg-white p-7 py-10 pb-7 rounded-3xl">
      <div className="flex justify-between items-start">
        <Link href={`/cheatsheets/${cheatsheet._id}`}>
          <a>
            <h2 className="font-extrabold text-2xl text-primary-dark-1">
              {cheatsheet.name}
            </h2>
          </a>
        </Link>

        <div className="flex gap-2 text-gray-700 text-3xl">
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
          <p>{cheatsheet.likes}</p>
        </div>
        <p className="text-primary-pink-1">{cheatsheet.views} views</p>
        <p className="text-primary-pink-1">
          {cheatsheet.cards.length} Card
          {cheatsheet.cards.length === 1 ? ' ' : 's'}
        </p>
      </div>
    </div>
  )
}
