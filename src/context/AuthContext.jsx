import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { entrar as entrarNoServico, observarSessao, sair as sairDoServico } from '../services/authService.js';

// Sessão real (Firebase Authentication). `carregando` fica true até o Firebase informar se já
// existe uma sessão salva neste navegador — assim a tela não redireciona para o login por engano.
// Se a sessão expirar ou for encerrada, a observação abaixo atualiza o estado automaticamente.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(
    () =>
      observarSessao((novoUsuario) => {
        setUsuario(novoUsuario);
        setCarregando(false);
      }),
    [],
  );

  const entrar = useCallback(async (email, senha) => {
    setUsuario(await entrarNoServico(email, senha));
  }, []);

  const sair = useCallback(async () => {
    await sairDoServico();
    setUsuario(null);
  }, []);

  const valor = useMemo(
    () => ({ usuario, autenticado: usuario !== null, carregando, entrar, sair }),
    [usuario, carregando, entrar, sair],
  );
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  return contexto;
}
