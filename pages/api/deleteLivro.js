import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("catalogo");
        const { id } = req.query;

        const livro = await db.collection("livro").deleteOne({
            '_id': ObjectId(id)
        });

        res.json(livro);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};