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
            <div className="container" style={{ marginTop: '10px' }}>
                <h2>Cadastro de Livro</h2>
                <hr className="border border-dark border-1 opacity-50" />
                <form onSubmit={handleSubmit} >
                    {error ? <div className="alert alert-danger">{error}</div> : null}
                    {message ? <div className="alert alert-success">{message}</div> : null}

                    <div className="mb-3">
                        <label className="form-label">Título</label>
                        <input type="text" className="form-control" placeholder="Digite o Título" onChange={(e) => setTitulo(e.target.value)} value={titulo} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Resumo</label>
                        <input type="text" className="form-control" placeholder="Digite o Resumo" onChange={(e) => setResumo(e.target.value)} value={resumo} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Editora</label>
                        <input type="text" className="form-control" placeholder="Digite a Editora" onChange={(e) => setEditora(e.target.value)} value={editora} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Autor</label>
                        <input type="text" className="form-control" placeholder="Digite o Autor" onChange={(e) => setAutor(e.target.value)} value={autor} required />
                    </div>

                    <div className="mb-3">
                        <a className="btn btn-primary me-3" href="/">Voltar</a>
                        <button className="btn btn-primary" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}