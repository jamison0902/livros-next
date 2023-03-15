import { useState } from 'react';
import Layout from '../components/Layout';

type Props = {
  livros: [Livro]
}

type Livro = {
  _id: String;
  titulo: String;
  resumo: String;
  editora: String;
  autor: String;
}

export async function getServerSideProps() {
  try {
    let response = await fetch(`${process.env.URL}/api/getLivros`);
    let livros = await response.json();

    return {
      props: { livros: JSON.parse(JSON.stringify(livros)) },
    };
  } catch (e) {
    console.error(e);
  }
}

export default function Livros(props: Props) {
  const [livros, setLivros] = useState<[Livro]>(props.livros);

  const handleDeleteLivro = async (livroId: string) => {
    try {
      let response = await fetch(`${process.env.URL}/api/deleteLivro?id=${livroId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      window.location.reload();
    } catch (error) {
      console.log('Um erro ocorreu enquanto deletava o livro ', error);
    }
  }

  return (
    <Layout>
      <div>
        <h1 >Top 20 Added Posts</h1>
        {
          livros.length > 0 ? (
            <ul>
              {livros.map((livro, index) => {
                return (
                  <li key={index} >
                    <div>
                      <h2>{livro.titulo}</h2>
                      <p>{livro.resumo}</p>
                      <p>{livro.editora}</p>
                      <p>{livro.autor}</p>
                    </div>
                    <div>
                      {/* <a href={`/livros/${livro._id}`}>Editar</a> */}
                      <button onClick={() => handleDeleteLivro(livro._id as string)}>Deletar</button>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
            <h2>Sem Livros para exibir</h2>
          )
        }
      </div>
    </Layout>
  );
}