import { formatarMoeda } from '../utils/formatters.js';
import { temPromocao } from '../utils/produto.js';

// Etiqueta de preço. Textos .sr-only deixam claro, para leitores de tela,
// qual valor é o normal e qual é o promocional.
export default function PrecoProduto({ produto }) {
  if (temPromocao(produto)) {
    return (
      <div className="etiqueta etiqueta-promo">
        <p className="preco-antigo">
          <span className="sr-only">Preço normal: </span>
          <s>{formatarMoeda(produto.preco)}</s>
        </p>
        <p className="preco-atual">
          <span className="sr-only">Preço promocional: </span>
          {formatarMoeda(produto.precoPromocional)}
        </p>
      </div>
    );
  }
  return (
    <div className="etiqueta">
      <p className="preco-atual">
        <span className="sr-only">Preço: </span>
        {formatarMoeda(produto.preco)}
      </p>
    </div>
  );
}
