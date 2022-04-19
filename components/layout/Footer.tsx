import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="text-center text-lg font-extrabold mt-20 pb-5">
      This project is made by
      <Link href="https://twitter.com/dawsoncodes">
        <a target={'_blank'}>
          <span className="text-primary-orange-1"> @Dawson</span>
        </a>
      </Link>
    </div>
  )
}

export default Footer
