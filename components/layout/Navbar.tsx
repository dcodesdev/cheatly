import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '../../lib/store'

const Navbar = () => {
  const { user } = useUser()

  return (
    <div className="flex items-center gap-2">
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

      {user && (
        <Link href="/dashboard">
          <a>
            <p className="font-bold text-2xl text-primary-dark-1">Dashboard</p>
          </a>
        </Link>
      )}
    </div>
  )
}

export default Navbar
