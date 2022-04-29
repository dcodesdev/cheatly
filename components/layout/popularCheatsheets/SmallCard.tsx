import Image from 'next/image'
import { FaThumbsUp } from 'react-icons/fa'

const SmallCard = () => {
  return (
    <div className="bg-white p-7 rounded-3xl max-w-xl mx-auto w-full">
      <p className="text-2xl font-bold text-primary-dark-1">
        REST API cheatsheet
      </p>

      <div className="flex items-center gap-2 mt-5 mb-2">
        <Image
          className="object-cover rounded-full"
          width={40}
          height={40}
          src="https://i.ibb.co/yFk24Gr/image-2.png"
          alt="avatar"
        />
        <p className="font-bold text-lg text-primary-dark-1">By Jon Doe</p>
      </div>

      <div className="flex items-center text-primary-4 gap-5 mt-5">
        <div className="flex gap-2 items-center">
          <FaThumbsUp />
          <p>32</p>
        </div>

        <div className="flex items-center text-primary-pink-1 font-bold">
          232 Views
        </div>

        <div className="flex items-center text-primary-pink-1 font-bold">
          23 Cards
        </div>
      </div>
    </div>
  )
}

export default SmallCard
