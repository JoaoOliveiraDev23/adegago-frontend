import { useRef, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { IconeGarrafa, IconeMenu, IconeX } from './Icones.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useFocoAoNavegar } from '../hooks/useFocoAoNavegar.js';

export default function AdminLayout() {
  const [menuAberto, setMenuAberto] = useState(false);
  const principal = useRef(null);
  const { usuario, sair } = useAuth();
  const navigate = useNavigate();
  useFocoAoNavegar(principal);
  const fechar = () => setMenuAberto(false);

  function aoSair() {
    sair();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="admin">
      <a className="link-pular" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="admin-lateral">
        <div className="admin-lateral-topo">
          <Link to="/admin" className="logo logo-claro" onClick={fechar}>
            <IconeGarrafa /> AdegaGo <span className="logo-sufixo">Admin</span>
          </Link>
          <button
            type="button"
            className="botao-menu botao-menu-claro"
            aria-expanded={menuAberto}
            aria-controls="menu-admin"
            onClick={() => setMenuAberto((v) => !v)}
          >
            {menuAberto ? <IconeX /> : <IconeMenu />}
            <span>Menu</span>
          </button>
        </div>
        <nav id="menu-admin" aria-label="Administração" className={`admin-nav${menuAberto ? ' aberto' : ''}`}>
          <ul>
            <li>
              <NavLink to="/admin" end className="nav-link" onClick={fechar}>
                Painel
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/produtos" className="nav-link" onClick={fechar}>
                Produtos
              </NavLink>
            </li>
            <li>
              <Link to="/" className="nav-link" onClick={fechar}>
                Ver catálogo público
              </Link>
            </li>
          </ul>
          <p className="admin-usuario">Sessão simulada: {usuario?.email}</p>
          <button type="button" className="botao botao-claro" onClick={aoSair}>
            Sair
          </button>
        </nav>
      </header>
      <div className="admin-corpo">
        <section className="faixa-demo" aria-label="Aviso de demonstração">
          <p>
            Modo demonstração: o acesso é simulado e não oferece proteção real. Os dados são fictícios e
            ficam apenas na memória do navegador.
          </p>
        </section>
        <main id="conteudo" ref={principal} tabIndex={-1} className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
