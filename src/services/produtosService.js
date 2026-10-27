// Camada de acesso aos dados de produtos.
//
// ETAPA ATUAL: os dados ficam em memória (módulo) e são perdidos ao recarregar a página.
// FUTURO: cada função abaixo deve ser trocada por uma chamada HTTP ao backend, mantendo a
// mesma assinatura (retorno via Promise), por exemplo:
//   listarProdutos()          -> GET    `${API_URL}/produtos`
//   criarProduto(dados)       -> POST   `${API_URL}/produtos`
//   atualizarProduto(id, ...) -> PUT    `${API_URL}/produtos/${id}`
//   excluirProduto(id)        -> DELETE `${API_URL}/produtos/${id}`
// Assim, contexto, páginas e componentes não precisarão ser alterados.
import { categorias, produtosIniciais } from '../data/produtosMock.js';

const copiar = (produto) => ({ ...produto });

let produtos = produtosIniciais.map(copiar);
let proximoId = Math.max(0, ...produtos.map((p) => p.id)) + 1;

export async function listarProdutos() {
  return produtos.map(copiar);
}

export async function listarCategorias() {
  return [...categorias];
}

export async function criarProduto(dados) {
  const novo = { ...dados, id: proximoId++ };
  produtos = [novo, ...produtos];
  return copiar(novo);
}

export async function atualizarProduto(id, dados) {
  const existente = produtos.find((p) => p.id === id);
  if (!existente) throw new Error('Produto não encontrado.');
  const atualizado = { ...existente, ...dados, id };
  produtos = produtos.map((p) => (p.id === id ? atualizado : p));
  return copiar(atualizado);
}

export async function excluirProduto(id) {
  if (!produtos.some((p) => p.id === id)) throw new Error('Produto não encontrado.');
  produtos = produtos.filter((p) => p.id !== id);
}
