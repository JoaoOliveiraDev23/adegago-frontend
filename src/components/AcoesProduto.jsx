import { Link } from 'react-router-dom';

// Ações administrativas de um produto. Cada botão tem um aria-label que começa com o
// texto visível e inclui o nome do produto, para que leitores de tela distingam as linhas.
export default function AcoesProduto({ produto, onPreco, onAlternar, onExcluir }) {
  const textoAlternar = produto.disponivel ? 'Marcar indisponível' : 'Marcar disponível';
  return (
    <div className="acoes">
      <Link
        className="botao botao-sec botao-peq"
        to={`/admin/produtos/${produto.id}/editar`}
        aria-label={`Editar ${produto.nome}`}
      >
        Editar
      </Link>
      <button
        type="button"
        className="botao botao-sec botao-peq"
        aria-label={`Preço e promoção de ${produto.nome}`}
        onClick={() => onPreco(produto)}
      >
        Preço e promoção
      </button>
      <button
        type="button"
        className="botao botao-sec botao-peq"
        aria-label={`${textoAlternar}: ${produto.nome}`}
        onClick={() => onAlternar(produto)}
      >
        {textoAlternar}
      </button>
      <button
        type="button"
        className="botao botao-perigo botao-peq"
        aria-label={`Excluir ${produto.nome}`}
        onClick={() => onExcluir(produto)}
      >
        Excluir
      </button>
    </div>
  );
}
