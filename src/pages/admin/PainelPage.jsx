import { Link } from 'react-router-dom';
import { useProdutos } from '../../context/ProdutosContext.jsx';
import { useTituloPagina } from '../../hooks/useTituloPagina.js';

export default function PainelPage() {
  useTituloPagina('Painel');
  const { produtos, carregando, erro } = useProdutos();

  const total = produtos.length;
  const disponiveis = produtos.filter((p) => p.disponivel).length;
  const indicadores = [
    { rotulo: 'Produtos cadastrados', valor: total },
    { rotulo: 'Marcados como disponíveis', valor: disponiveis },
    { rotulo: 'Marcados como indisponíveis', valor: total - disponiveis },
    { rotulo: 'Em promoção', valor: produtos.filter((p) => p.emPromocao).length },
  ];

  return (
    <>
      <div className="pagina-cabecalho">
        <h1 tabIndex={-1}>Painel</h1>
      </div>
      <p className="texto-apoio">
        Resumo do catálogo. A disponibilidade é informada manualmente por você e não representa o estoque.
      </p>

      {carregando && <p role="status">Carregando indicadores…</p>}
      {erro && (
        <p className="aviso aviso-erro" role="alert">
          {erro}
        </p>
      )}

      {!carregando && !erro && (
        <ul className="indicadores" aria-label="Indicadores do catálogo">
          {indicadores.map((i) => (
            <li key={i.rotulo} className="indicador">
              <p className="indicador-rotulo">{i.rotulo}</p>
              <p className="indicador-valor">{i.valor}</p>
            </li>
          ))}
        </ul>
      )}

      <h2>Atalhos</h2>
      <div className="atalhos">
        <Link to="/admin/produtos" className="botao botao-primario">
          Gerenciar produtos
        </Link>
        <Link to="/admin/produtos/novo" className="botao botao-sec">
          Cadastrar produto
        </Link>
        <Link to="/" className="botao botao-sec">
          Ver catálogo público
        </Link>
      </div>
    </>
  );
}
