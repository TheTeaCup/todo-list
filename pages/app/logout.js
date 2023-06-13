import Head from "next/head";
import csrf from "@/utils/csrf";
import {sessionOptions} from "@/utils/sessionSettings";
import {withIronSessionSsr} from "iron-session/next";
import Navbar from "@/components/navbar";
import {useEffect} from "react";
import * as api from "@/utils/api";
import {useRouter} from "next/router";

export default function App_Logout({user, dataProps}) {
    const router = useRouter();
    useEffect(() => {
        (async () => {
            try {
                let res = await api.logout(user.token);
                if(!res.user) {
                    router.push('/');
                } else router.reload()
            } catch (e) {
                console.log(e)
            }

        })()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <Head>
                <title>ToDo App</title>
            </Head>

            <Navbar user={user}/>

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