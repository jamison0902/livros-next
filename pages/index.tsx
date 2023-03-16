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
      <div className="container" style={{ marginTop: '10px' }}>
        <h2>Catálogo de Livros</h2>
        <hr className="border border-dark border-1 opacity-50" />
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-success">
              <tr>
                <th>Título</th>
                <th>Resumo</th>
                <th>Editora</th>
                <th>Autores</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>

              {
                livros.length > 0 ? (
                  livros.map((livro, index) => {
                    return (
                      <tr key={index} >

                        <td className="align-middle">{livro.titulo}</td>
                        <td className="align-middle">{livro.resumo}</td>
                        <td className="align-middle">{livro.editora}</td>
                        <td className="align-middle">{livro.autor}</td>
                        <td className="align-middle">
                          <a className="m-1 btn btn-success" href={`/livros/${livro._id}`}>Editar</a>
                          <button className="btn btn-danger" onClick={() => handleDeleteLivro(livro._id as string)}>Deletar</button>
                        </td>
                      </tr>
                    )
                  }
                  )) : (
                  <tr>
                    <td className="align-middle">Sem Livros para exibir</td>
                  </tr>

                )
              }
            </tbody>
          </table>
        </div >
      </div>
    </Layout >
  );
}