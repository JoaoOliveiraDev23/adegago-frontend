import { useMemo, useRef, useState } from 'react';
import Campo from '../components/Campo.jsx';
import EstadoVazio from '../components/EstadoVazio.jsx';
import ProdutoCard from '../components/ProdutoCard.jsx';
import { useProdutos } from '../context/ProdutosContext.jsx';
import { useTituloPagina } from '../hooks/useTituloPagina.js';
import { normalizarTexto } from '../utils/formatters.js';

const OPCOES_FILTRO = [
  { valor: 'todos', rotulo: 'Todos os produtos' },
  { valor: 'disponiveis', rotulo: 'Somente disponíveis' },
  { valor: 'indisponiveis', rotulo: 'Somente indisponíveis' },
];

export default function CatalogoPage() {
  useTituloPagina('Catálogo de produtos');
  const { produtos, carregando, erro, recarregar } = useProdutos();
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('todos');
  const campoBusca = useRef(null);

  const filtrados = useMemo(() => {
    const termo = normalizarTexto(busca.trim());
    return produtos.filter((p) => {
      const combinaNome = !termo || normalizarTexto(p.nome).includes(termo);
      const combinaStatus = filtro === 'todos' || (filtro === 'disponiveis') === p.disponivel;
      return combinaNome && combinaStatus;
    });
  }, [produtos, busca, filtro]);

  function limpar() {
    setBusca('');
    setFiltro('todos');
    campoBusca.current?.focus();
  }

  const total = filtrados.length;
  const resumo = `${total} ${total === 1 ? 'produto encontrado' : 'produtos encontrados'}.`;

  let conteudo;
  if (carregando) {
    conteudo = <p className="estado" role="status">Carregando produtos…</p>;
  } else if (erro) {
    conteudo = (
      <div className="estado" role="alert">
        <p>{erro}</p>
        <button type="button" className="botao botao-primario" onClick={recarregar}>
          Tentar novamente
        </button>
      </div>
    );
  } else if (produtos.length === 0) {
    conteudo = (
      <EstadoVazio
        titulo="Nenhum produto cadastrado"
        texto="O catálogo ainda não tem produtos. Volte em breve para conferir as novidades."
      />
    );
  } else if (total === 0) {
    conteudo = (
      <EstadoVazio
        titulo="Nenhum produto encontrado"
        texto="Nenhum produto corresponde à pesquisa ou ao filtro escolhido. Tente outro nome ou limpe os filtros."
      >
        <button type="button" className="botao botao-primario" onClick={limpar}>
          Limpar pesquisa e filtros
        </button>
      </EstadoVazio>
    );
  } else {
    conteudo = (
      <ul className="grade">
        {filtrados.map((p) => (
          <li key={p.id}>
            <ProdutoCard produto={p} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <section className="hero" aria-labelledby="titulo-catalogo">
        <div className="container">
          <h1 id="titulo-catalogo" tabIndex={-1}>
            Catálogo de produtos
          </h1>
          <p>Consulte preços, promoções e a disponibilidade informada pela adega. Não é preciso cadastro.</p>
        </div>
      </section>

      <div className="container catalogo">
        <p className="aviso aviso-info">
          A disponibilidade mostra a última informação registrada pela adega e pode não refletir o estoque
          em tempo real. Para confirmar um item, fale com o estabelecimento.
        </p>

        <form
          className="barra-filtros"
          role="search"
          aria-label="Pesquisar e filtrar produtos"
          onSubmit={(e) => e.preventDefault()}
        >
          <Campo
            id="busca"
            type="search"
            rotulo="Pesquisar por nome"
            placeholder="Ex.: vinho, cerveja, gin"
            autoComplete="off"
            refControle={campoBusca}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <Campo
            id="filtro-disponibilidade"
            como="select"
            rotulo="Disponibilidade"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            {OPCOES_FILTRO.map((o) => (
              <option key={o.valor} value={o.valor}>
                {o.rotulo}
              </option>
            ))}
          </Campo>
          <button type="button" className="botao botao-sec" onClick={limpar}>
            Limpar filtros
          </button>
        </form>

        {!carregando && !erro && produtos.length > 0 && (
          <p className="resumo" role="status">
            {resumo}
          </p>
        )}

        {conteudo}
      </div>
    </>
  );
}
