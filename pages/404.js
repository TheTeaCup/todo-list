import Head from "next/head";
import {Button, Heading, Text, VStack} from '@chakra-ui/react'
import NextLink from 'next/link'
import {FaHome} from 'react-icons/fa'

function NotFoundPage() {

    return (
        <>
            <Head>
                <title>ToDo App - Page not Found</title>
            </Head>

            <VStack
                justify='center'
                spacing='4'
                as='section'
                mt={['20', null, '40']}
                textAlign='center'
            >
                <Heading>Page Not Found</Heading>
                <Text fontSize={{md: 'xl'}}>You just hit a route that doesn&apos;t exist...</Text>
                <NextLink href='/' passHref>
                    <Button

                        aria-label='Back to Home'
                        leftIcon={<FaHome/>}
                        bgGradient="linear(to-r, blue.400,purple.400)"
                        _hover={{
                            bgGradient: 'linear(to-r, blue.400,purple.400)',
                            boxShadow: 'xl',
                        }}
                        size='lg'
                    >
                        Back to Home
                    </Button>
                </NextLink>
            </VStack>
        </>
    )
}

export default NotFoundPage;