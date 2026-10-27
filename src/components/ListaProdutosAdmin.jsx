import AcoesProduto from './AcoesProduto.jsx';
import PrecoProduto from './PrecoProduto.jsx';
import { SeloDisponibilidade, SeloPromocao } from './Selos.jsx';
import { temPromocao } from '../utils/produto.js';

// Em telas largas mostra uma tabela; em telas estreitas, uma lista de cartões.
// As duas versões são renderizadas e o CSS esconde uma delas (display: none a remove
// também para leitores de tela), evitando uma tabela "quebrada" no celular.
export default function ListaProdutosAdmin({ produtos, onPreco, onAlternar, onExcluir }) {
  const acoes = { onPreco, onAlternar, onExcluir };
  return (
    <>
      <div className="lista-desktop tabela-wrap">
        <table className="tabela">
          <caption className="sr-only">Produtos cadastrados</caption>
          <thead>
            <tr>
              <th scope="col">Produto</th>
              <th scope="col">Preço</th>
              <th scope="col">Situação</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <th scope="row">
                  {p.nome}
                  <span className="tabela-cat">{p.categoria}</span>
                </th>
                <td>
                  <PrecoProduto produto={p} />
                </td>
                <td>
                  <div className="produto-selos">
                    <SeloDisponibilidade disponivel={p.disponivel} />
                    {temPromocao(p) && <SeloPromocao />}
                  </div>
                </td>
                <td>
                  <AcoesProduto produto={p} {...acoes} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="lista-mobile">
        {produtos.map((p) => (
          <li key={p.id}>
            <article className="cartao-admin" aria-labelledby={`adm-${p.id}-nome`}>
              <h2 id={`adm-${p.id}-nome`}>{p.nome}</h2>
              <p className="tabela-cat">{p.categoria}</p>
              <div className="produto-selos">
                <SeloDisponibilidade disponivel={p.disponivel} />
                {temPromocao(p) && <SeloPromocao />}
              </div>
              <PrecoProduto produto={p} />
              <AcoesProduto produto={p} {...acoes} />
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
