export default async function newList(req, res) {
    if (req.method === 'POST') {
        res.json({error: false, message: "Not Done"});

        /*
        * Verify authorization header
        * Create a new list and send back the ID
        * Save things like: name, public (t/f), array list of the todos
        * */

    } else {
        res.json({error: true, message: "Method not allowed"});
    }
}