import {withIronSessionApiRoute} from "iron-session/next";
import {sessionOptions} from "@/utils/sessionSettings";

export default withIronSessionApiRoute(authLogin, sessionOptions);

async function authLogin(req, res) {
    if (req.method === 'POST') {

        try {
            if (!req.body.email || !req.body.password || !req.body.password || !req.body.passwordVerify) return res.json({
                error: true,
                message: "Missing required fields"
            });

            return res.json({error: true, message: 'Not implemented yet'});

        } catch (e) {
            console.log(e);
            return res.json({error: true, message: e.message});
        }

    } else {
        return res.json({error: true, message: "Method not allowed"});
    }
}