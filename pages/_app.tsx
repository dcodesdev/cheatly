import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { usePromiseTracker } from 'react-promise-tracker'
import Loader from '../components/Loader'

function MyApp({ Component, pageProps }: AppProps) {
  const { promiseInProgress } = usePromiseTracker()
  return (
    <div className="bg-primary-3 min-h-screen">
      {promiseInProgress && <Loader />}
      <Component {...pageProps} />
      <Toaster />
    </div>
  )
}

export default MyApp
