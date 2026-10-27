import { useState } from 'react';
import { Link } from 'react-router-dom';
import Campo from './Campo.jsx';
import { valoresIniciais, valoresParaProduto } from '../utils/produto.js';
import { focarPrimeiroCampoComErro, validarProduto } from '../utils/validacao.js';

// Ordem visual dos campos (usada para focar o primeiro erro).
const ORDEM = ['nome', 'descricao', 'categoria', 'preco', 'precoPromocional', 'imagem'];

// Formulário de cadastro/edição. `inicial` é o produto editado (ou undefined no cadastro).
// `onSalvar` recebe o produto já validado e convertido; deve retornar uma Promise.
export default function ProdutoForm({ inicial, categorias, rotuloEnviar, onSalvar, cancelarPara }) {
  const [valores, setValores] = useState(() => valoresIniciais(inicial));
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [erroGeral, setErroGeral] = useState('');

  const quantidadeErros = Object.values(erros).filter(Boolean).length;

  function alterar(e) {
    const { name, type, value, checked } = e.target;
    setValores((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    setErros((er) => ({ ...er, [name]: undefined }));
  }

  async function enviar(e) {
    e.preventDefault();
    const novos = validarProduto(valores, categorias);
    setErros(novos);
    if (Object.keys(novos).length) {
      focarPrimeiroCampoComErro(novos, ORDEM, 'produto-');
      return;
    }
    setEnviando(true);
    setErroGeral('');
    try {
      await onSalvar(valoresParaProduto(valores));
    } catch {
      setErroGeral('Não foi possível salvar o produto. Tente novamente.');
      setEnviando(false);
    }
  }

  return (
    <form className="form-cartao" onSubmit={enviar} noValidate>
      <p className="texto-apoio">
        Campos marcados com <span aria-hidden="true">*</span>
        <span className="sr-only">asterisco</span> são obrigatórios.
      </p>

      {(quantidadeErros > 0 || erroGeral) && (
        <div className="aviso aviso-erro" role="alert">
          {erroGeral ||
            (quantidadeErros === 1
              ? 'Há 1 campo com problema. Corrija o campo destacado e tente novamente.'
              : `Há ${quantidadeErros} campos com problema. Corrija os campos destacados e tente novamente.`)}
        </div>
      )}

      <Campo
        id="produto-nome"
        name="nome"
        rotulo="Nome"
        obrigatorio
        maxLength={80}
        autoComplete="off"
        value={valores.nome}
        onChange={alterar}
        erro={erros.nome}
      />
      <Campo
        id="produto-descricao"
        name="descricao"
        como="textarea"
        rotulo="Descrição"
        obrigatorio
        maxLength={240}
        value={valores.descricao}
        onChange={alterar}
        erro={erros.descricao}
        ajuda="Até 240 caracteres."
      />
      <Campo
        id="produto-categoria"
        name="categoria"
        como="select"
        rotulo="Categoria"
        obrigatorio
        value={valores.categoria}
        onChange={alterar}
        erro={erros.categoria}
      >
        <option value="">Selecione uma categoria</option>
        {categorias.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Campo>
      <Campo
        id="produto-preco"
        name="preco"
        rotulo="Preço normal (R$)"
        obrigatorio
        inputMode="decimal"
        autoComplete="off"
        value={valores.preco}
        onChange={alterar}
        erro={erros.preco}
        ajuda="Use vírgula para os centavos. Exemplo: 12,90."
      />

      <fieldset className="grupo-opcoes">
        <legend>Disponibilidade</legend>
        <label className="opcao">
          <input type="radio" name="disponivel" value="sim" checked={valores.disponivel === 'sim'} onChange={alterar} />
          Disponível
        </label>
        <label className="opcao">
          <input type="radio" name="disponivel" value="nao" checked={valores.disponivel === 'nao'} onChange={alterar} />
          Indisponível
        </label>
        <p className="campo-ajuda">Informação registrada manualmente por você; não é um controle de estoque.</p>
      </fieldset>

      <div className="grupo-opcoes">
        <label className="opcao">
          <input type="checkbox" name="emPromocao" checked={valores.emPromocao} onChange={alterar} />
          Produto em promoção
        </label>
      </div>
      {valores.emPromocao && (
        <Campo
          id="produto-precoPromocional"
          name="precoPromocional"
          rotulo="Preço promocional (R$)"
          obrigatorio
          inputMode="decimal"
          autoComplete="off"
          value={valores.precoPromocional}
          onChange={alterar}
          erro={erros.precoPromocional}
          ajuda="Deve ser menor que o preço normal."
        />
      )}

      <Campo
        id="produto-imagem"
        name="imagem"
        rotulo="Endereço da imagem (opcional)"
        inputMode="url"
        autoComplete="off"
        value={valores.imagem}
        onChange={alterar}
        erro={erros.imagem}
        ajuda="Cole o endereço (URL) de uma imagem. O envio de arquivos ficará para a etapa do backend."
      />

      <div className="form-acoes">
        <button type="submit" className="botao botao-primario" disabled={enviando}>
          {enviando ? 'Salvando…' : rotuloEnviar}
        </button>
        <Link to={cancelarPara} className="botao botao-sec">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
