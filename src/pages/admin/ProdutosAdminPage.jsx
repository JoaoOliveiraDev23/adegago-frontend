import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ConfirmDialog from '../../components/ConfirmDialog.jsx';
import EstadoVazio from '../../components/EstadoVazio.jsx';
import ListaProdutosAdmin from '../../components/ListaProdutosAdmin.jsx';
import PrecoPromocaoDialog from '../../components/PrecoPromocaoDialog.jsx';
import { useProdutos } from '../../context/ProdutosContext.jsx';
import { useTituloPagina } from '../../hooks/useTituloPagina.js';

export default function ProdutosAdminPage() {
  useTituloPagina('Produtos');
  const local = useLocation();
  const { produtos, carregando, erro, recarregar, atualizar, excluir } = useProdutos();
  const [aviso, setAviso] = useState(
    local.state?.aviso ? { tipo: 'sucesso', texto: local.state.aviso } : null,
  );
  const [dialogo, setDialogo] = useState(null); // { tipo: 'excluir' | 'preco', produto }
  const regiaoAviso = useRef(null);
  const focarNoAviso = useRef(false);

  // Após excluir, o botão que abriu o diálogo deixa de existir; o foco vai para o aviso.
  useEffect(() => {
    if (aviso && focarNoAviso.current) {
      regiaoAviso.current?.focus();
      focarNoAviso.current = false;
    }
  }, [aviso]);

  function informar(texto, tipo = 'sucesso', focar = false) {
    focarNoAviso.current = focar;
    setAviso({ tipo, texto });
  }

  async function alternarDisponibilidade(produto) {
    const novo = !produto.disponivel;
    try {
      await atualizar(produto.id, { disponivel: novo });
      informar(`“${produto.nome}” marcado como ${novo ? 'disponível' : 'indisponível'}.`);
    } catch {
      informar('Não foi possível alterar a disponibilidade. Tente novamente.', 'erro');
    }
  }

  async function salvarPreco(dados) {
    const { produto } = dialogo;
    try {
      await atualizar(produto.id, dados);
      setDialogo(null);
      informar(`Preço e promoção de “${produto.nome}” atualizados.`);
    } catch {
      setDialogo(null);
      informar('Não foi possível atualizar o preço. Tente novamente.', 'erro');
    }
  }

  async function confirmarExclusao() {
    const { produto } = dialogo;
    try {
      await excluir(produto.id);
      setDialogo(null);
      informar(`Produto “${produto.nome}” excluído.`, 'sucesso', true);
    } catch {
      setDialogo(null);
      informar('Não foi possível excluir o produto. Tente novamente.', 'erro');
    }
  }

  let conteudo;
  if (carregando) {
    conteudo = <p role="status">Carregando produtos…</p>;
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
      <EstadoVazio titulo="Nenhum produto cadastrado" texto="Cadastre o primeiro produto para exibi-lo no catálogo.">
        <Link to="/admin/produtos/novo" className="botao botao-primario">
          Cadastrar produto
        </Link>
      </EstadoVazio>
    );
  } else {
    conteudo = (
      <ListaProdutosAdmin
        produtos={produtos}
        onPreco={(produto) => setDialogo({ tipo: 'preco', produto })}
        onAlternar={alternarDisponibilidade}
        onExcluir={(produto) => setDialogo({ tipo: 'excluir', produto })}
      />
    );
  }

  return (
    <>
      <div className="pagina-cabecalho">
        <h1 tabIndex={-1}>Produtos</h1>
        <Link to="/admin/produtos/novo" className="botao botao-primario">
          Cadastrar produto
        </Link>
      </div>
      <p className="texto-apoio">
        As alterações valem apenas durante esta demonstração: os dados são fictícios e voltam ao inicial
        ao recarregar a página.
      </p>

      <div ref={regiaoAviso} tabIndex={-1} role="status" className="regiao-aviso">
        {aviso && <p className={`aviso aviso-${aviso.tipo}`}>{aviso.texto}</p>}
      </div>

      {conteudo}

      {dialogo?.tipo === 'preco' && (
        <PrecoPromocaoDialog produto={dialogo.produto} onSalvar={salvarPreco} onCancelar={() => setDialogo(null)} />
      )}
      {dialogo?.tipo === 'excluir' && (
        <ConfirmDialog
          titulo="Excluir produto"
          mensagem={`Tem certeza de que deseja excluir “${dialogo.produto.nome}”? Esta ação não pode ser desfeita.`}
          rotuloConfirmar="Excluir produto"
          onConfirmar={confirmarExclusao}
          onCancelar={() => setDialogo(null)}
        />
      )}
    </>
  );
}
