import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import Campo from '../../components/Campo.jsx';
import { IconeGarrafa } from '../../components/Icones.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTituloPagina } from '../../hooks/useTituloPagina.js';
import { focarPrimeiroCampoComErro, validarLogin } from '../../utils/validacao.js';

export default function LoginPage() {
  useTituloPagina('Login administrativo');
  const { autenticado, entrar } = useAuth();
  const local = useLocation();
  const [valores, setValores] = useState({ email: '', senha: '' });
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [erroGeral, setErroGeral] = useState('');

  if (autenticado) return <Navigate to={local.state?.de ?? '/admin'} replace />;

  function alterar(e) {
    const { name, value } = e.target;
    setValores((v) => ({ ...v, [name]: value }));
    setErros((er) => ({ ...er, [name]: undefined }));
  }

  async function enviar(e) {
    e.preventDefault();
    const novos = validarLogin(valores);
    setErros(novos);
    if (Object.keys(novos).length) {
      focarPrimeiroCampoComErro(novos, ['email', 'senha'], 'login-');
      return;
    }
    setEnviando(true);
    setErroGeral('');
    try {
      await entrar(valores.email, valores.senha);
    } catch {
      setErroGeral('Não foi possível entrar. Tente novamente.');
      setEnviando(false);
    }
  }

  const temErros = Object.values(erros).some(Boolean);

  return (
    <div className="login">
      <main className="login-cartao">
        <Link to="/" className="logo">
          <IconeGarrafa /> AdegaGo
        </Link>
        <h1 tabIndex={-1}>Acesso administrativo</h1>

        <p className="aviso aviso-info">
          <strong>Login simulado.</strong> Nesta demonstração, qualquer e-mail válido com senha de pelo
          menos 6 caracteres abre o painel. Isso não é segurança: a proteção real virá com o backend.
        </p>

        {(temErros || erroGeral) && (
          <div className="aviso aviso-erro" role="alert">
            {erroGeral || 'Corrija os campos destacados e tente novamente.'}
          </div>
        )}

        <form onSubmit={enviar} noValidate>
          <Campo
            id="login-email"
            name="email"
            type="email"
            rotulo="E-mail"
            obrigatorio
            autoComplete="username"
            value={valores.email}
            onChange={alterar}
            erro={erros.email}
          />
          <Campo
            id="login-senha"
            name="senha"
            type="password"
            rotulo="Senha"
            obrigatorio
            autoComplete="current-password"
            value={valores.senha}
            onChange={alterar}
            erro={erros.senha}
          />
          <button type="submit" className="botao botao-primario botao-bloco" disabled={enviando}>
            {enviando ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <p className="login-voltar">
          <Link to="/">Voltar ao catálogo</Link>
        </p>
      </main>
    </div>
  );
}
