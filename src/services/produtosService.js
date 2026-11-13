// Camada de acesso aos dados de produtos — agora com o Cloud Firestore.
// As funções mantêm os mesmos nomes e formatos de retorno de antes, então contextos,
// páginas e componentes não precisaram ser reescritos.
//
// Formato usado pelo app:      { id, nome, descricao, categoria, preco, disponivel,
//                                emPromocao, precoPromocional, imagem }
// Formato salvo no Firestore:  { nome, descricao, categoria, preco, disponivel,
//                                precoPromocional?, imagem?, createdAt, updatedAt }
//   - o id é o ID do documento;
//   - "emPromocao" NÃO é gravado: é derivado da existência de precoPromocional;
//   - precoPromocional e imagem só existem quando têm valor (campo ausente = sem valor).
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, exigirFirebase } from '../config/firebase.js';
import { categorias } from '../data/categorias.js';
import { ErroAmigavel, traduzirErroFirestore } from './erros.js';

const COLECAO = 'produtos';
const TEMPO_LIMITE_MS = 15000;

// Documento do Firestore -> produto do app
function paraProduto(snapshot) {
  const d = snapshot.data();
  return {
    id: snapshot.id,
    nome: d.nome,
    descricao: d.descricao,
    categoria: d.categoria,
    preco: d.preco,
    disponivel: d.disponivel,
    emPromocao: d.precoPromocional != null,
    precoPromocional: d.precoPromocional ?? null,
    imagem: d.imagem ?? null,
  };
}

// Dados do app -> campos do Firestore. `null` significa "remover o campo".
function paraFirestore(dados) {
  const campos = {};
  for (const campo of ['nome', 'descricao', 'categoria', 'preco', 'disponivel']) {
    if (campo in dados) campos[campo] = dados[campo];
  }
  if ('emPromocao' in dados || 'precoPromocional' in dados) {
    const semPromocao = dados.emPromocao === false;
    campos.precoPromocional = semPromocao ? null : (dados.precoPromocional ?? null);
  }
  if ('imagem' in dados) campos.imagem = dados.imagem || null;
  return campos;
}

// Sem conexão, o Firestore deixa escritas "na fila" e a promessa nunca termina.
// Para o administrador não ficar esperando sem resposta, falhamos antes (offline) ou após um tempo limite.
function exigirConexao() {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    throw new ErroAmigavel(
      'Você está sem conexão com a internet. Reconecte-se e tente novamente.',
      'unavailable',
    );
  }
}

function comTempoLimite(promessa) {
  let temporizador;
  const limite = new Promise((_, rejeitar) => {
    temporizador = setTimeout(() => rejeitar({ code: 'deadline-exceeded' }), TEMPO_LIMITE_MS);
  });
  return Promise.race([promessa, limite]).finally(() => clearTimeout(temporizador));
}

export async function listarProdutos() {
  exigirFirebase();
  try {
    // Mais recentes primeiro (consulta por um único campo: não exige índice composto).
    const consulta = query(collection(db, COLECAO), orderBy('createdAt', 'desc'));
    const resultado = await comTempoLimite(getDocs(consulta));
    return resultado.docs.map(paraProduto);
  } catch (erro) {
    throw traduzirErroFirestore(erro, 'Não foi possível carregar os produtos. Tente novamente.');
  }
}

export async function listarCategorias() {
  return [...categorias];
}

export async function criarProduto(dados) {
  exigirFirebase();
  exigirConexao();
  try {
    const campos = Object.fromEntries(Object.entries(paraFirestore(dados)).filter(([, v]) => v != null));
    const referencia = await comTempoLimite(
      addDoc(collection(db, COLECAO), {
        ...campos,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }),
    );
    return paraProduto(await comTempoLimite(getDoc(referencia)));
  } catch (erro) {
    throw traduzirErroFirestore(erro, 'Não foi possível salvar o produto. Tente novamente.');
  }
}

export async function atualizarProduto(id, dados) {
  exigirFirebase();
  exigirConexao();
  try {
    const alteracoes = Object.fromEntries(
      Object.entries(paraFirestore(dados)).map(([campo, valor]) => [campo, valor === null ? deleteField() : valor]),
    );
    const referencia = doc(db, COLECAO, id);
    await comTempoLimite(updateDoc(referencia, { ...alteracoes, updatedAt: serverTimestamp() }));
    // Relê o documento: o contexto espera receber o produto COMPLETO de volta.
    return paraProduto(await comTempoLimite(getDoc(referencia)));
  } catch (erro) {
    throw traduzirErroFirestore(erro, 'Não foi possível atualizar o produto. Tente novamente.');
  }
}

export async function excluirProduto(id) {
  exigirFirebase();
  exigirConexao();
  try {
    await comTempoLimite(deleteDoc(doc(db, COLECAO, id)));
  } catch (erro) {
    throw traduzirErroFirestore(erro, 'Não foi possível excluir o produto. Tente novamente.');
  }
}
