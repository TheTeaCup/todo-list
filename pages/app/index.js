import Head from "next/head";
import csrf from "@/utils/csrf";
import {sessionOptions} from "@/utils/sessionSettings";
import {withIronSessionSsr} from "iron-session/next";

export default function Home({userToken, dataProps}) {
    return (
        <>
            <Head>
                <title>ToDO App</title>
            </Head>

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