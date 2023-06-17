export default async function newList(req, res) {
    if (req.method === 'GET') {
        res.json({error: false, message: "Not Done"});

        /*
        * Verify authorization header
        * Fetch the user from the database
        * return: userID, username, array of their personal categories
         */

    } else {
        res.json({error: true, message: "Method not allowed"});
    }
}