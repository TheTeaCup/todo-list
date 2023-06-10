import {withIronSessionApiRoute} from "iron-session/next";
import {sessionOptions} from "@/utils/sessionSettings";
import crypto from "crypto";
import Redis from "@/utils/redis";

export default withIronSessionApiRoute(authLogin, sessionOptions);

async function authLogin(req, res) {
    if (req.method === 'POST') {

        try {
            if (!req.body.email || !req.body.username || !req.body.password || !req.body.passwordVerify) return res.json({
                error: true,
                message: "Missing required fields"
            });

            let cipher = crypto.createCipheriv('aes-256-cbc', process.env.SITECRYPTO, process.env.SITEIV);
            let encrypted = cipher.update(req.body.email, 'utf8', 'base64');
            encrypted += cipher.final('base64');

            let user = await Redis.get('user-' + encrypted);
            if (user) {
                return res.json({error: true, message: 'Invalid Email or Password'});
            } else {
                if (req.body.password !== req.body.passwordVerify) return res.json({
                    error: true,
                    message: "Passwords do not match"
                });

                const passwordHash = crypto.pbkdf2Sync(req.body.password, process.env.SITESALT, 10000, 512, 'sha512').toString('hex');
                let userId = Math.floor(100000000000000 + Math.random() * 900000000000000);
                await Redis.incr("users"); // user count

                let data = {
                    email: encrypted,
                    password: passwordHash,
                    username: req.body.username,
                    created: Date.now(),
                    updated: Date.now(),
                    id: userId,
                    token: crypto.randomBytes(20).toString('hex'),
                }

                Redis.set('user-' + encrypted, JSON.stringify(data));

                data.email = req.body.email;
                delete user.password;
                req.session.user = data;
                await req.session.save();
                // create user session then return a success message
                return res.json({error: false, message: "OK"});
            }

        } catch (e) {
            console.log(e);
            return res.json({error: true, message: e.message});
        }

    } else {
        return res.json({error: true, message: "Method not allowed"});
    }
}