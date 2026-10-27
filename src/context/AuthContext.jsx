import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { autenticarSimulado } from '../services/authService.js';

// SESSÃO SIMULADA: o estado vive apenas em memória e NÃO protege nada de verdade.
// Qualquer pessoa pode abrir /admin/login e "entrar". A proteção real será feita no backend.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  const entrar = useCallback(async (email, senha) => {
    setUsuario(await autenticarSimulado(email, senha));
  }, []);
  const sair = useCallback(() => setUsuario(null), []);

  const valor = useMemo(
    () => ({ usuario, autenticado: usuario !== null, entrar, sair }),
    [usuario, entrar, sair],
  );
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  return contexto;
}
