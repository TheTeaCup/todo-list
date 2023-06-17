export default async function newList(req, res) {
    if (req.method === 'GET') {
        res.json({error: false, message: "Not Done"});

        /*
        * Verify authorization header
        * Fetch the list from the database
        * Determine if public or not.
        * return: name, public (t/f), array list of the todos, ownerID, etc.
         */

    } else {
        res.json({error: true, message: "Method not allowed"});
    }
}