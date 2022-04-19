import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-primary-3 min-h-screen">
      <Component {...pageProps} />
      <Toaster />
    </div>
  )
}

export default MyApp
