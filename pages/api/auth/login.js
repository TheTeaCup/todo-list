import {withIronSessionApiRoute} from "iron-session/next";
import {sessionOptions} from "@/utils/sessionSettings";
import Redis from "../../../utils/redis"
import * as crypto from "crypto";

export default withIronSessionApiRoute(authLogin, sessionOptions);

async function authLogin(req, res) {
    if (req.method === 'POST') {

        try {
            if (!req.body.email || !req.body.password) return res.json({
                error: true,
                message: "Missing Email or Password"
            });

            let cipher = crypto.createCipheriv('aes-256-cbc', process.env.SITECRYPTO, process.env.SITEIV);
            let encrypted = cipher.update(req.body.email, 'utf8', 'base64');
            encrypted += cipher.final('base64');

            let user = await Redis.get('user-' + encrypted);
            console.log(user)
            if(user) {
                return res.json({error: true, message: 'Not implemented yet'});
            } else {
                return res.json({error: true, message: 'Invalid Email or Password'});
            }

        } catch (e) {
            console.log(e);
            return res.json({error: true, message: e.message});
        }

    } else {
        return res.json({error: true, message: "Method not allowed"});
    }
}