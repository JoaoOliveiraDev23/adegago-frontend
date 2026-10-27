const formatadorMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export const formatarMoeda = (valor) => formatadorMoeda.format(valor);

// Converte número em texto para campos de formulário: 12.5 -> "12,50"
export const formatarMoedaParaCampo = (valor) => Number(valor).toFixed(2).replace('.', ',');

// Converte texto digitado em número. Aceita "12,90", "12.90", "1.250,00", "R$ 12,90".
// Retorna NaN quando o texto não é um valor válido (inclui mais de 2 casas decimais).
export function parseMoeda(texto) {
  let t = String(texto).trim().replace(/^R\$\s*/i, '').replace(/\s/g, '');
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^-?\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  if (!/^-?\d+(\.\d{1,2})?$/.test(t)) return NaN;
  return Number(t);
}

// Remove acentos e diferenças de maiúsculas/minúsculas para pesquisa.
export const normalizarTexto = (texto) =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
