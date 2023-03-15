import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("catalogo");
        const { id } = req.query;
        const {titulo, resumo, editora, autor } = req.body;

        const livro = await db.collection("livro").updateOne(
            {
                '_id': ObjectId(id)
            },
            {
                $set: {
                    titulo: titulo,
                    resumo: resumo,
                    editora: editora,
                    autor: autor
                },
            }
        );

        res.json(livro);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};