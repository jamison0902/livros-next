import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("catalogo");

    const livros = await db.collection("livro").find({}).limit(20).toArray();

    res.json(livros);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};