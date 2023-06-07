import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head';
import '@/styles/globals.css'
export default function App({ Component, pageProps }) {
  return (
      <ChakraProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
  )
}
