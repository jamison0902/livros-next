import React, { useState } from "react";
import type { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Layout from "../../components/Layout";

type PageParams = {
    id: string;
};

type ContentPageProps = {
    livro: Livro;
};

type Livro = {
    _id: string;
    titulo: string;
    resumo: string;
    editora: string;
    autor: string;
}

type ResponseFromServer = {
    _id: string;
    titulo: string;
    resumo: string;
    editora: string;
    autor: string;
};

export async function getStaticProps({
    params,
}: GetStaticPropsContext<PageParams>): Promise<
    GetStaticPropsResult<ContentPageProps>
> {
    try {
        let response = await fetch(
            `${process.env.URL}/api/getLivro?id=` + params?.id
        );

        let responseFromServer: ResponseFromServer = await response.json();

        return {
            // Passed to the page component as props
            props: {
                livro: {
                    _id: responseFromServer._id,
                    titulo: responseFromServer.titulo,
                    resumo: responseFromServer.resumo,
                    editora: responseFromServer.editora,
                    autor: responseFromServer.autor
                },
            },
        };
    } catch (e) {
        console.log("error ", e);
        return {
            props: {
                livro: {
                    _id: "",
                    titulo: "",
                    resumo: "",
                    editora: "",
                    autor: ""
                },
            },
        };
    }
}

export async function getStaticPaths() {
    let livros = await fetch(`${process.env.URL}/api/getLivros`);

    let livroFromServer: [Livro] = await livros.json();
    return {
        paths: livroFromServer.map((livro) => {
            return {
                params: {
                    id: livro._id,
                },
            };
        }),
        fallback: false, // can also be true or 'blocking'
    };
}


export default function EditLivro({
    livro: { _id, titulo, resumo, editora, autor },
}: ContentPageProps) {
    const [livroTitulo, setLivroTitulo] = useState(titulo);
    const [livroResumo, setLivroResumo] = useState(resumo);
    const [livroEditora, setLivroEditora] = useState(editora);
    const [livroAutor, setLivroAutor] = useState(autor);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (livroTitulo && livroResumo && livroEditora && livroAutor) {
            try {
                let response = await fetch(
                    `${process.env.URL}/api/editLivro?id=` + _id,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            titulo: livroTitulo,
                            resumo: livroResumo,
                            editora: livroEditora,
                            autor: livroAutor
                        }),
                        headers: {
                            Accept: "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                        },
                    }
                );
                response = await response.json();
                setLivroTitulo("");
                setLivroResumo("");
                setLivroEditora("");
                setLivroAutor("");
                setError("");
                setMessage("Livro editado com sucesso");
            } catch (errorMessage: any) {
                setError(errorMessage);
            }
        } else {
            return setError("Preencha todos os campos");
        }
    };

    // no such post exists
    if (!titulo && !resumo && !editora && !autor && process.browser) {
        return (window.location.href = "/");
    }

    return (
        <Layout>
            <div className="container" style={{ marginTop: '10px' }}>
                <h2>Atualizar Livro</h2>
                <hr className="border border-dark border-1 opacity-50" />

                <form onSubmit={handleSubmit} >
                    {error ? <div className="alert alert-danger">{error}</div> : null}
                    {message ? <div className="alert alert-success">{message}</div> : null}

                    <div className="mb-3">
                        <label className="form-label">Titulo</label>
                        <input type="text" className="form-control" placeholder="Digite o título" onChange={(e) => setLivroTitulo(e.target.value)} value={livroTitulo ? livroTitulo : ""}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Resumo</label>
                        <input type="text" className="form-control" placeholder="Digite o Resumo" onChange={(e) => setLivroResumo(e.target.value)} value={livroResumo ? livroResumo : ""} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Editora</label>
                        <input type="text" className="form-control" placeholder="Digite a Editora" onChange={(e) => setLivroEditora(e.target.value)} value={livroEditora ? livroEditora : ""} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Autor</label>
                        <input type="text" className="form-control" placeholder="Digite o Autor" onChange={(e) => setLivroAutor(e.target.value)} value={livroAutor ? livroAutor : ""} required />
                    </div>

                    <div className="mb-3">
                        <a className="btn btn-primary me-3" href="/">Voltar</a>
                        <button className="btn btn-primary" type="submit" >Atualizar</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}