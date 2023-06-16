import Head from "next/head";
import csrf from "@/utils/csrf";
import {sessionOptions} from "@/utils/sessionSettings";
import {withIronSessionSsr} from "iron-session/next";
import Navbar from "@/components/navbar";
import {
    Button,
    Divider,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    useToast
} from "@chakra-ui/react";
import {useState} from "react";
import * as api from "@/utils/api";

export default function Home({user, dataProps}) {
    console.log(user)
    const toast = useToast()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const TextColor = useColorModeValue('gray.800', 'gray.400');

    const submit = async event => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let email = event.target.email.value;
            let username = event.target.username.value;

            let res = await api.userEdit(user.email, user.token, {username, email});
            if (res.error) {
                setError(res.message);
                setLoading(false);
            } else if (res.message === 'OK') {
                toast({
                    title: "Success!",
                    description: "Your settings have been updated.",
                    status: "success",
                    position: 'bottom-right',
                    duration: 9000,
                    isClosable: true,
                })
                setLoading(false);
            } else {
                setError('Unknown error occurred.');
                setLoading(false);
            }


        } catch (e) {
            console.log(e)
            setError('Unknown error occurred.');
            setLoading(false);
        }

    }

    return (
        <>

            <Navbar user={user}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <form onSubmit={submit}>
                            <Stack
                                spacing={4}
                                w={'full'}
                                maxW={'xl'}
                                bg={useColorModeValue('white', 'gray.700')}
                                rounded={'xl'}
                                boxShadow={'lg'}
                                p={10}
                                my={12}>


                                <center>
                                    <Heading lineHeight={1.1} fontSize={{base: '3xl', md: '4xl'}}>
                                        User Settings
                                    </Heading>

                                    <Text
                                        fontSize={{base: 'sm', sm: 'md'}}
                                        color={TextColor}>
                                        Edit your user settings here.
                                    </Text>
                                    {error ?
                                        <Text
                                            fontSize={{base: 'sm', sm: 'md'}}
                                            bgGradient="linear(to-r, red.400,pink.400)"
                                            bgClip="text">
                                            {error}
                                        </Text> : <br/>
                                    }
                                </center>

                                <Flex>
                                    <FormControl id="username" mr="5%">
                                        <FormLabel htmlFor="username" fontWeight={'normal'}>
                                            Username
                                        </FormLabel>
                                        <Input
                                            placeholder="CoolUsername"
                                            _placeholder={{color: 'gray.500'}}
                                            id={'username'}
                                            required={true}
                                            type={'text'}
                                            defaultValue={user.username}
                                        />
                                    </FormControl>

                                    <FormControl id="email">
                                        <FormLabel htmlFor="email" fontWeight={'normal'}>
                                            Email
                                        </FormLabel>
                                        <Input
                                            placeholder="your-email@example.com"
                                            _placeholder={{color: 'gray.500'}}
                                            id={'email'}
                                            required={true}
                                            type={'email'}
                                            defaultValue={user.email}
                                            disabled={true}
                                        />
                                        <FormHelperText>Email changes will be available soon.</FormHelperText>
                                    </FormControl>
                                </Flex>

                                <Stack spacing={6}>
                                    <Button
                                        isLoading={loading}
                                        type={'submit'}
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Submit
                                    </Button>
                                </Stack>

                                <Divider/>

                                <Stack spacing={6}>
                                    <Button onClick={() =>
                                        toast({
                                            title: 'Change Password',
                                            description: "This feature is not available yet.",
                                            status: 'warning',
                                            position: 'bottom-right',
                                            duration: 9000,
                                            isClosable: true,
                                        })
                                    }>Change Password</Button>
                                </Stack>

                            </Stack>
                        </form>
                    </Stack>
                </Stack>
            </Navbar>

        </>
    )
}

export const getServerSideProps = withIronSessionSsr(async function ({req, res}) {
    const user = req.session.user;

    await csrf(req, res);

    if (user === undefined) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    } else {
        return {
            props: {user: req.session.user, csrfToken: req.csrfToken()}
        };
    }
}, sessionOptions)