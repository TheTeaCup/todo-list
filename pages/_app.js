import {ChakraProvider, CSSReset} from '@chakra-ui/react'
import Head from 'next/head';
import '@/styles/globals.css'
import theme from '@/utils/theme'

export default function App({ Component, pageProps }) {
  return (
      <ChakraProvider theme={theme}>
          <CSSReset />
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
  )
}
