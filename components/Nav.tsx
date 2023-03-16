import React from "react";


export default function Nav() {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#087990' }}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item text-black">
                            <a className="nav-link text-light" aria-current="page" href="/">Catálogo</a>
                        </li>
                        <li className="nav-item text-black">
                            <a className="nav-link text-light" href="/livros">Cadastrar</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}