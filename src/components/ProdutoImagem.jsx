import { useState } from 'react';
import { IconeGarrafa } from './Icones.jsx';

// Mostra a imagem ilustrativa quando existe (e carrega); caso contrário, um espaço reservado.
export default function ProdutoImagem({ produto }) {
  const [falhou, setFalhou] = useState(false);
  const exibir = produto.imagem && !falhou;
  return (
    <div className="produto-imagem">
      {exibir ? (
        <img
          src={produto.imagem}
          alt={`Imagem ilustrativa de ${produto.nome}`}
          width="400"
          height="300"
          loading="lazy"
          onError={() => setFalhou(true)}
        />
      ) : (
        <div className="produto-imagem-vazia">
          <IconeGarrafa className="produto-imagem-icone" />
          <span>Sem imagem</span>
        </div>
      )}
    </div>
  );
}
