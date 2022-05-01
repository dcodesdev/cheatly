import { TailSpin } from 'react-loader-spinner'
import { useStore } from '../lib/store'

const Loader = () => {
  const loading = useStore((state) => state.loading)

  if (!loading) return <></>

  return (
    <div
      style={{ zIndex: 999 }}
      className="fixed bg-black w-full min-h-screen opacity-50"
    >
      <div className="fixed left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <TailSpin ariaLabel="loading-indicator" />
      </div>
    </div>
  )
}

export default Loader
