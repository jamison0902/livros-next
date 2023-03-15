import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("catalogo");
        const { titulo, resumo, editora, autor } = req.body;

        const livro = await db.collection("livro").insertOne({
            titulo,
            resumo,
            editora,
            autor
        });

        res.json(livro);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};