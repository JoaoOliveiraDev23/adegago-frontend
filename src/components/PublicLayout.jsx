import { useRef, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { IconeGarrafa, IconeMenu, IconeX } from './Icones.jsx';
import { useFocoAoNavegar } from '../hooks/useFocoAoNavegar.js';

export default function PublicLayout() {
  const [menuAberto, setMenuAberto] = useState(false);
  const principal = useRef(null);
  useFocoAoNavegar(principal);
  const fechar = () => setMenuAberto(false);

  return (
    <>
      <a className="link-pular" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="cab-publico">
        <div className="container cab-linha">
          <Link to="/" className="logo" onClick={fechar}>
            <IconeGarrafa /> AdegaGo
          </Link>
          <button
            type="button"
            className="botao-menu"
            aria-expanded={menuAberto}
            aria-controls="menu-principal"
            onClick={() => setMenuAberto((v) => !v)}
          >
            {menuAberto ? <IconeX /> : <IconeMenu />}
            <span>Menu</span>
          </button>
          <nav id="menu-principal" aria-label="Principal" className={`nav-principal${menuAberto ? ' aberto' : ''}`}>
            <ul>
              <li>
                <NavLink to="/" end className="nav-link" onClick={fechar}>
                  Catálogo
                </NavLink>
              </li>
              <li>
                <Link to="/admin/login" className="nav-link" onClick={fechar}>
                  Área administrativa
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main id="conteudo" ref={principal} tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="rodape">
        <div className="container">
          <p>
            <strong>AdegaGo</strong> é um catálogo de consulta: não vendemos nem recebemos pedidos por aqui.
          </p>
          <p>Projeto Integrador universitário. Os produtos e preços exibidos são fictícios.</p>
        </div>
      </footer>
    </>
  );
}
