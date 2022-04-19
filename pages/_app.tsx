import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import Loader from '../components/Loader'
import LoadingProvider from '../contexts/loadingContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <div className="bg-primary-3 min-h-screen">
        <Loader />
        <Component {...pageProps} />
        <Toaster />
      </div>
    </LoadingProvider>
  )
}

export default MyApp
