import csrf from "@/utils/csrf";
import {sessionOptions} from "@/utils/sessionSettings";
import {withIronSessionSsr} from "iron-session/next";
import Navbar from "@/components/navbar";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {Box, Spinner, Stack} from "@chakra-ui/react";
import * as api from "@/utils/api";

export default function App_Logout({user, dataProps}) {
    const router = useRouter();
    useEffect(() => {
        (async () => {
            try {
                let res = await api.logout(user.token);
                if (!res.user) {
                    router.push('/');
                } else router.reload()
            } catch (e) {
                console.log(e)
            }

        })()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>


            <Navbar user={user}>
                <Box pt={5} min={'100vh'}>
                    <Stack p={5} alignItems={'center'}>
                        <Spinner pt={5} size='xl'/>
                    </Stack>
                </Box>
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