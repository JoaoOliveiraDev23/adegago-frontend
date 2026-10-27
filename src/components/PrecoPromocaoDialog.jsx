import { useState } from 'react';
import Campo from './Campo.jsx';
import Modal from './Modal.jsx';
import { formatarMoedaParaCampo, parseMoeda } from '../utils/formatters.js';
import { focarPrimeiroCampoComErro, validarPrecos } from '../utils/validacao.js';

const ORDEM = ['preco', 'precoPromocional'];

// Ação rápida: atualizar o preço e configurar/remover a promoção de um produto.
export default function PrecoPromocaoDialog({ produto, onSalvar, onCancelar }) {
  const [valores, setValores] = useState({
    preco: formatarMoedaParaCampo(produto.preco),
    emPromocao: produto.emPromocao,
    precoPromocional:
      produto.precoPromocional != null ? formatarMoedaParaCampo(produto.precoPromocional) : '',
  });
  const [erros, setErros] = useState({});

  function alterar(e) {
    const { name, type, value, checked } = e.target;
    setValores((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    setErros((er) => ({ ...er, [name]: undefined }));
  }

  function enviar(e) {
    e.preventDefault();
    const novos = validarPrecos(valores);
    setErros(novos);
    if (Object.keys(novos).length) {
      focarPrimeiroCampoComErro(novos, ORDEM, 'dlg-');
      return;
    }
    onSalvar({
      preco: parseMoeda(valores.preco),
      emPromocao: valores.emPromocao,
      precoPromocional: valores.emPromocao ? parseMoeda(valores.precoPromocional) : null,
    });
  }

  return (
    <Modal titulo="Preço e promoção" idTitulo="dialogo-preco-titulo" onFechar={onCancelar}>
      <p className="texto-apoio">{produto.nome}</p>
      <form onSubmit={enviar} noValidate>
        <Campo
          id="dlg-preco"
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
        <div className="grupo-opcoes">
          <label className="opcao">
            <input type="checkbox" name="emPromocao" checked={valores.emPromocao} onChange={alterar} />
            Produto em promoção
          </label>
        </div>
        {valores.emPromocao && (
          <Campo
            id="dlg-precoPromocional"
            name="precoPromocional"
            rotulo="Preço promocional (R$)"
            obrigatorio
            inputMode="decimal"
            autoComplete="off"
            value={valores.precoPromocional}
            onChange={alterar}
            erro={erros.precoPromocional}
            ajuda="Desmarque “Produto em promoção” para remover a promoção."
          />
        )}
        <div className="modal-acoes">
          <button type="button" className="botao botao-sec" onClick={onCancelar}>
            Cancelar
          </button>
          <button type="submit" className="botao botao-primario">
            Salvar alterações
          </button>
        </div>
      </form>
    </Modal>
  );
}
