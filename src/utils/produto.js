import { formatarMoedaParaCampo, parseMoeda } from './formatters.js';

export const temPromocao = (produto) =>
  Boolean(produto.emPromocao) && produto.precoPromocional != null;

// Produto -> valores (texto) dos campos do formulário.
export function valoresIniciais(produto) {
  return {
    nome: produto?.nome ?? '',
    descricao: produto?.descricao ?? '',
    categoria: produto?.categoria ?? '',
    preco: produto ? formatarMoedaParaCampo(produto.preco) : '',
    disponivel: produto && !produto.disponivel ? 'nao' : 'sim',
    emPromocao: Boolean(produto?.emPromocao),
    precoPromocional:
      produto?.precoPromocional != null ? formatarMoedaParaCampo(produto.precoPromocional) : '',
    imagem: produto?.imagem ?? '',
  };
}

// Valores (texto) do formulário já validados -> objeto de produto.
export function valoresParaProduto(v) {
  return {
    nome: v.nome.trim(),
    descricao: v.descricao.trim(),
    categoria: v.categoria,
    preco: parseMoeda(v.preco),
    disponivel: v.disponivel === 'sim',
    emPromocao: v.emPromocao,
    precoPromocional: v.emPromocao ? parseMoeda(v.precoPromocional) : null,
    imagem: v.imagem.trim() || null,
  };
}
