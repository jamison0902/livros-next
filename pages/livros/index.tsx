import React, { useState } from "react";
import Layout from "../../components/Layout";

export default function AddLivro() {
    const [titulo, setTitulo] = useState("");
    const [resumo, setResumo] = useState("");
    const [editora, setEditora] = useState("");
    const [autor, setAutor] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (titulo && resumo && editora && autor) {
            try {

                let response = await fetch(`${process.env.URL}/api/addLivro`, {
                    method: "POST",
                    body: JSON.stringify({
                        titulo, resumo, editora, autor
                    }),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                    },
                });
                response = await response.json();
                setTitulo("");
                setResumo("");
                setEditora("");
                setAutor("");
                setError("");
                setMessage("Livro adicionado com sucesso");
            } catch (errorMessage: any) {
                setError(errorMessage);
            }
        } else {
            return setError("Preencha todos os campos");
        }
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit} >
                {error ? <div className="alert-error">{error}</div> : null}
                {message ? <div className="alert-message">{message}</div> : null}

                <div >
                    <label>Título</label>
                    <input type="text" placeholder="Digite o Título" onChange={(e) => setTitulo(e.target.value)} value={titulo} required />
                </div>

                <div >
                    <label>Resumo</label>
                    <input type="text" placeholder="Digite o Resumo" onChange={(e) => setResumo(e.target.value)} value={resumo} required />
                </div>

                <div >
                    <label>Editora</label>
                    <input type="text" placeholder="Digite a Editora" onChange={(e) => setEditora(e.target.value)} value={editora} required />
                </div>

                <div >
                    <label>Autor</label>
                    <input type="text" placeholder="Digite o Autor" onChange={(e) => setAutor(e.target.value)} value={autor} required />
                </div>

                <div className="form-group">
                    <a href="/">Voltar</a>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </Layout>
    );
}