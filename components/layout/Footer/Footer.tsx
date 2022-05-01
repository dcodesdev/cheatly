import Link from 'next/link'
import React from 'react'
import { AiFillGithub } from 'react-icons/ai'

export const Footer = () => {
  return (
    <div className="py-5">
      <div className="text-center text-lg font-extrabold mt-20 text-primary-dark-1">
        This project is made by
        <Link href="https://twitter.com/dawsoncodes">
          <a target={'_blank'}>
            <span className="text-primary-pink-1"> @Dawson</span>
          </a>
        </Link>
      </div>
      <div className="text-center justify-center flex items-center gap-2">
        <Link href="https://github.com/dawsoncodes/cheatly">
          <a target="_blank">
            <div className="justify-center flex gap-2 items-center">
              <p>Contribute on</p>
              <AiFillGithub size={30} />
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}
