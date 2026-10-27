import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  atualizarProduto,
  criarProduto,
  excluirProduto,
  listarCategorias,
  listarProdutos,
} from '../services/produtosService.js';

// Estado único de produtos compartilhado entre catálogo público e área administrativa.
// Toda leitura/escrita passa por services/produtosService.js (futura API).
const ProdutosContext = createContext(null);

export function ProdutosProvider({ children }) {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const recarregar = useCallback(async () => {
    setCarregando(true);
    setErro('');
    try {
      const [listaProdutos, listaCategorias] = await Promise.all([listarProdutos(), listarCategorias()]);
      setProdutos(listaProdutos);
      setCategorias(listaCategorias);
    } catch {
      setErro('Não foi possível carregar os produtos. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  const criar = useCallback(async (dados) => {
    const novo = await criarProduto(dados);
    setProdutos((atual) => [novo, ...atual]);
    return novo;
  }, []);

  const atualizar = useCallback(async (id, dados) => {
    const atualizado = await atualizarProduto(id, dados);
    setProdutos((atual) => atual.map((p) => (p.id === id ? atualizado : p)));
    return atualizado;
  }, []);

  const excluir = useCallback(async (id) => {
    await excluirProduto(id);
    setProdutos((atual) => atual.filter((p) => p.id !== id));
  }, []);

  const valor = useMemo(
    () => ({ produtos, categorias, carregando, erro, recarregar, criar, atualizar, excluir }),
    [produtos, categorias, carregando, erro, recarregar, criar, atualizar, excluir],
  );
  return <ProdutosContext.Provider value={valor}>{children}</ProdutosContext.Provider>;
}

export function useProdutos() {
  const contexto = useContext(ProdutosContext);
  if (!contexto) throw new Error('useProdutos deve ser usado dentro de ProdutosProvider.');
  return contexto;
}
