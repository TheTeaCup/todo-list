export default async function newList(req, res) {
    if (req.method === 'POST') {
        res.json({error: false, message: "Not Done"});

        /*
        * Verify authorization header
        * Fetch the list from the database
        * Save things like: name, public (t/f), array list of the todos
        * return: error, message: "OK"
        * */

    } else {
        res.json({error: true, message: "Method not allowed"});
    }
}