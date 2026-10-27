import { parseMoeda } from './formatters.js';

const PRECO_MAXIMO = 99999.99;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_URL_IMAGEM = /^(https?:\/\/|\/)\S+$/i;

// Retorna a mensagem de erro (string) ou '' quando o valor é válido.
export function validarPreco(texto, rotulo) {
  const valor = String(texto ?? '').trim();
  if (!valor) return `Informe o ${rotulo}.`;
  const numero = parseMoeda(valor);
  if (Number.isNaN(numero)) {
    return `Informe um valor válido para o ${rotulo}, com no máximo duas casas decimais. Exemplo: 12,90.`;
  }
  if (numero < 0) return `O ${rotulo} não pode ser negativo.`;
  if (numero === 0) return `O ${rotulo} deve ser maior que zero.`;
  if (numero > PRECO_MAXIMO) return `O ${rotulo} deve ser de no máximo R$ 99.999,99.`;
  return '';
}

// Valida preço normal e preço promocional (usado no formulário e no diálogo rápido).
export function validarPrecos({ preco, emPromocao, precoPromocional }) {
  const erros = {};
  const erroPreco = validarPreco(preco, 'preço normal');
  if (erroPreco) erros.preco = erroPreco;
  if (emPromocao) {
    const erroPromo = validarPreco(precoPromocional, 'preço promocional');
    if (erroPromo) erros.precoPromocional = erroPromo;
    else if (!erroPreco && parseMoeda(precoPromocional) >= parseMoeda(preco)) {
      erros.precoPromocional = 'O preço promocional deve ser menor que o preço normal.';
    }
  }
  return erros;
}

export function validarProduto(valores, categorias) {
  const erros = {};
  const nome = valores.nome.trim();
  if (!nome) erros.nome = 'Informe o nome do produto.';
  else if (nome.length < 2) erros.nome = 'O nome deve ter pelo menos 2 caracteres.';
  else if (nome.length > 80) erros.nome = 'O nome deve ter no máximo 80 caracteres.';

  const descricao = valores.descricao.trim();
  if (!descricao) erros.descricao = 'Informe uma descrição do produto.';
  else if (descricao.length > 240) erros.descricao = 'A descrição deve ter no máximo 240 caracteres.';

  if (!valores.categoria) erros.categoria = 'Selecione uma categoria.';
  else if (!categorias.includes(valores.categoria)) erros.categoria = 'Selecione uma categoria da lista.';

  Object.assign(erros, validarPrecos(valores));

  const imagem = valores.imagem.trim();
  if (imagem && !REGEX_URL_IMAGEM.test(imagem)) {
    erros.imagem = 'Informe um endereço de imagem que comece com http:// ou https://.';
  }
  return erros;
}

export function validarLogin({ email, senha }) {
  const erros = {};
  const e = email.trim();
  if (!e) erros.email = 'Informe o e-mail.';
  else if (!REGEX_EMAIL.test(e)) erros.email = 'Informe um e-mail válido, por exemplo nome@dominio.com.';
  if (!senha) erros.senha = 'Informe a senha.';
  else if (senha.length < 6) erros.senha = 'A senha deve ter pelo menos 6 caracteres.';
  return erros;
}

// Move o foco para o primeiro campo com erro, seguindo a ordem visual do formulário.
export function focarPrimeiroCampoComErro(erros, ordem, prefixoId) {
  const campo = ordem.find((c) => erros[c]);
  if (campo) document.getElementById(`${prefixoId}${campo}`)?.focus();
}
