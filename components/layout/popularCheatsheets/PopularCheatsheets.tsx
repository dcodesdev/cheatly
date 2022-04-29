import SmallCard from './SmallCard'

const PopularCheatsheets = () => {
  return (
    <>
      <h4 className="font-bold text-5xl mt-10 mb-5 text-primary-dark-1">
        Popular cheatsheets
      </h4>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-10">
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
      </div>
    </>
  )
}

export default PopularCheatsheets
