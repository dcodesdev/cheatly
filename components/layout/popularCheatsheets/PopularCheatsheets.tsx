import { useEffect } from 'react'
import { client, usePopularCheatsheets } from '@lib'
import { SmallCard } from '.'

export const PopularCheatsheets = () => {
  const { setPopularCheatsheets, popularCheatsheets } = usePopularCheatsheets()

  const getPopularCheatsheets = () => {
    client
      .get('/api/cheatsheets/popular')
      .then((r) => {
        setPopularCheatsheets(r.data)
      })
      .catch((e) => {
        console.log(e.message)
      })
  }

  useEffect(() => {
    getPopularCheatsheets()
  }, []) //  eslint-disable-line

  return !!popularCheatsheets.length ? (
    <>
      <h4 className="font-bold text-3xl mt-10 mb-5 text-primary-dark-1">
        Popular cheatsheets
      </h4>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-10">
        {popularCheatsheets?.map((ch) => (
          <SmallCard key={ch._id} cheatsheet={ch} />
        ))}
      </div>
    </>
  ) : (
    <></>
  )
}
