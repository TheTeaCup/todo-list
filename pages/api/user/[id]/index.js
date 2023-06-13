import crypto from "crypto";
import Redis from "@/utils/redis";
import {withIronSessionApiRoute} from "iron-session/next";
import {sessionOptions} from "@/utils/sessionSettings";

export default withIronSessionApiRoute(user, sessionOptions);

async function user(req, res) {
    if (!req.query.id) return res.json({error: true, message: "Missing required fields"});

    try {
        if (req.method === 'GET') {
            return res.json({error: false, message: "OK"});
        } else if (req.method === 'POST') {
            if (!req.body.email || !req.body.username) return res.json({
                error: true,
                message: "Missing required fields"
            });

            let cipher = crypto.createCipheriv('aes-256-cbc', process.env.SITECRYPTO, process.env.SITEIV);
            let encrypted = cipher.update(req.query.id, 'utf8', 'base64');
            encrypted += cipher.final('base64');

            let user = await Redis.get('user-' + encrypted);
            if (user) {
                if (!req.headers.authorization) return res.json({error: true, message: "Missing authorization header"});

                user = JSON.parse(user);

                if (user.token !== req.headers.authorization) return res.json({error: true, message: "Invalid token"});

                user.username = req.body.username;
                user.updated = Date.now();
                //user.email = req.body.email; soon

                Redis.set('user-' + encrypted, JSON.stringify(user));

                user.email = req.body.email;
                delete user.password;
                req.session.user = user;
                await req.session.save();
                // create user session then return a success message
                res.json({error: false, message: "OK"});
            } else {
                return res.json({error: true, message: 'Invalid Email'});
            }

        } else {
            return res.json({error: true, message: "Method not allowed"});
        }
    } catch (e) {
        console.log(e);
        return res.json({error: true, message: e.message});
    }
}