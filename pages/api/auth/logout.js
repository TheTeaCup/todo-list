import {withIronSessionApiRoute} from "iron-session/next";
import {sessionOptions} from "@/utils/sessionSettings";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

async function logoutRoute(req, res) {
    if (req.method === 'POST') {
        req.session.destroy();
        res.json({error: false, user: null});
    } else {
        res.json({error: true, message: "Method not allowed"});
    }
}