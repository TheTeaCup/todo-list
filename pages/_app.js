import {ChakraProvider, CSSReset} from '@chakra-ui/react'
import Head from 'next/head';
import '@/styles/globals.css'
import theme from '@/utils/theme'
import {useState} from "react";

export default function App({Component, pageProps}) {
    const [appReady, setAppReady] = useState(false)
    const [userData, setUserData] = useState(null)

    const dataProps = {
        appReady: {
            state: appReady,
            stateSetter: setAppReady
        },
        userData: {
            state: userData,
            stateSetter: setUserData
        }
    }

    return (
        <ChakraProvider theme={theme}>
            <CSSReset/>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
            </Head>
            <Component {...pageProps} dataProps={dataProps}/>
        </ChakraProvider>
    )
}
