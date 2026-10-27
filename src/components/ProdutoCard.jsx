import PrecoProduto from './PrecoProduto.jsx';
import ProdutoImagem from './ProdutoImagem.jsx';
import { SeloDisponibilidade, SeloPromocao } from './Selos.jsx';
import { temPromocao } from '../utils/produto.js';

export default function ProdutoCard({ produto }) {
  const idNome = `produto-${produto.id}-nome`;
  const promo = temPromocao(produto);
  const classes = ['produto', promo && 'produto-promo', !produto.disponivel && 'produto-indisp']
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classes} aria-labelledby={idNome}>
      <ProdutoImagem key={produto.imagem ?? 'sem-imagem'} produto={produto} />
      <div className="produto-corpo">
        <div className="produto-selos">
          <SeloDisponibilidade disponivel={produto.disponivel} />
          {promo && <SeloPromocao />}
        </div>
        <p className="produto-cat">{produto.categoria}</p>
        <h2 id={idNome}>{produto.nome}</h2>
        <p className="produto-desc">{produto.descricao}</p>
        <PrecoProduto produto={produto} />
      </div>
    </article>
  );
}
