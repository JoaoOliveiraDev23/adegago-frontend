// Categorias disponíveis nos formulários. É uma lista fixa, simples de manter: as categorias
// NÃO ficam em uma coleção do Firestore. Se for adicionar uma nova, basta incluí-la aqui.
// (As Security Rules apenas exigem que a categoria seja um texto de 2 a 40 caracteres.)
export const categorias = [
  'Cervejas',
  'Vinhos e espumantes',
  'Destilados',
  'Não alcoólicos',
  'Petiscos e conveniência',
];
