import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div>
      <Link href="/">
        <a>
          <Image
            width={80}
            height={80}
            src="/assets/logo.svg"
            alt="cheatsheet logo"
          />
        </a>
      </Link>
    </div>
  )
}

export default Navbar
