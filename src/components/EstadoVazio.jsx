import { IconeGarrafa } from './Icones.jsx';

export default function EstadoVazio({ titulo, texto, children }) {
  return (
    <div className="estado">
      <IconeGarrafa className="estado-icone" />
      <h2>{titulo}</h2>
      <p>{texto}</p>
      {children}
    </div>
  );
}
