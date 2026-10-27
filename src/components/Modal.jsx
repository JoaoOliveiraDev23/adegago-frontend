import { useEffect, useRef } from 'react';

// Diálogo modal baseado no elemento nativo <dialog>, que já oferece:
// foco preso no diálogo, fechamento com Esc e conteúdo de fundo inerte.
// O pai renderiza o Modal apenas enquanto ele deve estar aberto e trata onFechar.
export default function Modal({ titulo, idTitulo, onFechar, children }) {
  const ref = useRef(null);
  // Guarda o elemento que tinha o foco ao abrir, para devolver o foco ao fechar.
  const anterior = useRef(null);
  if (anterior.current === null && typeof document !== 'undefined') {
    anterior.current = document.activeElement;
  }

  useEffect(() => {
    const dialogo = ref.current;
    if (dialogo && !dialogo.open) dialogo.showModal();
    return () => {
      const elemento = anterior.current;
      if (elemento?.isConnected) elemento.focus();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby={idTitulo}
      onClose={onFechar}
      onClick={(e) => {
        // Clique no fundo (fora do conteúdo) fecha o diálogo.
        if (e.target === ref.current) ref.current.close();
      }}
    >
      <div className="modal-conteudo">
        <h2 id={idTitulo}>{titulo}</h2>
        {children}
      </div>
    </dialog>
  );
}
