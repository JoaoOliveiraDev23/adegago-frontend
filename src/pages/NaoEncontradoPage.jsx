import { Link } from 'react-router-dom';
import { useTituloPagina } from '../hooks/useTituloPagina.js';

export default function NaoEncontradoPage() {
  useTituloPagina('Página não encontrada');
  return (
    <div className="container pagina-simples">
      <h1 tabIndex={-1}>Página não encontrada</h1>
      <p>O endereço acessado não existe. Confira o link ou volte ao catálogo.</p>
      <Link to="/" className="botao botao-primario">
        Ir para o catálogo
      </Link>
    </div>
  );
}
