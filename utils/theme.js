import {extendTheme} from '@chakra-ui/react'
import {mode} from '@chakra-ui/theme-tools';

const theme = extendTheme({
    config: {
        initialColorMode: 'system',
        useSystemColorMode: true,
    },
    styles: {
        global: (props) => ({
            body: {
                bg: mode('gray.50', 'gray.900')(props),
            }
        })
    }
})

export default theme