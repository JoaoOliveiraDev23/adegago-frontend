import { Link, useNavigate, useParams } from 'react-router-dom';
import ProdutoForm from '../../components/ProdutoForm.jsx';
import { useProdutos } from '../../context/ProdutosContext.jsx';
import { useTituloPagina } from '../../hooks/useTituloPagina.js';

// Usada para cadastrar (/admin/produtos/novo) e editar (/admin/produtos/:id/editar).
export default function ProdutoFormPage() {
  const { id } = useParams();
  const edicao = id !== undefined;
  const navigate = useNavigate();
  const { produtos, categorias, carregando, criar, atualizar } = useProdutos();
  const titulo = edicao ? 'Editar produto' : 'Cadastrar produto';
  useTituloPagina(titulo);

  const produto = edicao ? produtos.find((p) => String(p.id) === id) : undefined;

  async function salvar(dados) {
    if (edicao) {
      await atualizar(produto.id, dados);
      navigate('/admin/produtos', { state: { aviso: `Produto “${dados.nome}” atualizado.` } });
    } else {
      await criar(dados);
      navigate('/admin/produtos', { state: { aviso: `Produto “${dados.nome}” cadastrado.` } });
    }
  }

  let conteudo;
  if (carregando) {
    conteudo = <p role="status">Carregando…</p>;
  } else if (edicao && !produto) {
    conteudo = (
      <div className="estado" role="alert">
        <p>Produto não encontrado. Ele pode ter sido excluído.</p>
        <Link to="/admin/produtos" className="botao botao-primario">
          Voltar para a lista
        </Link>
      </div>
    );
  } else {
    conteudo = (
      <ProdutoForm
        key={id ?? 'novo'}
        inicial={produto}
        categorias={categorias}
        rotuloEnviar={edicao ? 'Salvar alterações' : 'Cadastrar produto'}
        onSalvar={salvar}
        cancelarPara="/admin/produtos"
      />
    );
  }

  return (
    <>
      <p className="migalha">
        <Link to="/admin/produtos">Voltar para a lista de produtos</Link>
      </p>
      <div className="pagina-cabecalho">
        <h1 tabIndex={-1}>{titulo}</h1>
      </div>
      {conteudo}
    </>
  );
}
