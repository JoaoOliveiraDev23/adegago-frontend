import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Em aplicações de página única, a troca de rota não move o foco sozinha.
// Ao mudar de rota, leva o foco ao título (h1) da nova página para leitores de tela e teclado.
export function useFocoAoNavegar(refPrincipal) {
  const { pathname } = useLocation();
  const anterior = useRef(pathname);
  useEffect(() => {
    if (anterior.current === pathname) return;
    anterior.current = pathname;
    const principal = refPrincipal.current;
    (principal?.querySelector('h1') ?? principal)?.focus();
  }, [pathname, refPrincipal]);
}
