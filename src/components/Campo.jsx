import { IconeAlerta } from './Icones.jsx';

// Rótulo + controle (input, select ou textarea) + ajuda + erro, com associação ARIA correta.
// `como` define o elemento do controle. `refControle` permite focar o controle programaticamente.
export default function Campo({
  id,
  rotulo,
  erro,
  ajuda,
  obrigatorio = false,
  como: Controle = 'input',
  refControle,
  children,
  ...resto
}) {
  const idAjuda = ajuda ? `${id}-ajuda` : null;
  const idErro = erro ? `${id}-erro` : null;
  const descrito = [idAjuda, idErro].filter(Boolean).join(' ') || undefined;

  return (
    <div className="campo">
      <label htmlFor={id}>
        {rotulo}
        {obrigatorio && (
          <span className="obrigatorio" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      <Controle
        id={id}
        ref={refControle}
        className="controle"
        aria-invalid={erro ? 'true' : undefined}
        aria-describedby={descrito}
        aria-required={obrigatorio ? 'true' : undefined}
        {...resto}
      >
        {children}
      </Controle>
      {ajuda && (
        <p id={idAjuda} className="campo-ajuda">
          {ajuda}
        </p>
      )}
      {erro && (
        <p id={idErro} className="campo-erro">
          <IconeAlerta />
          <span>{erro}</span>
        </p>
      )}
    </div>
  );
}
