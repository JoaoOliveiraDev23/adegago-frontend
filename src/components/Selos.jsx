import { IconeCheck, IconeTag, IconeX } from './Icones.jsx';

// Disponibilidade e promoção sempre aparecem com ícone E texto (não dependem só de cor).
export function SeloDisponibilidade({ disponivel }) {
  return disponivel ? (
    <span className="selo selo-ok">
      <IconeCheck /> Disponível
    </span>
  ) : (
    <span className="selo selo-indisp">
      <IconeX /> Indisponível
    </span>
  );
}

export function SeloPromocao() {
  return (
    <span className="selo selo-promo">
      <IconeTag /> Promoção
    </span>
  );
}
