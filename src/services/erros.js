// Converte erros técnicos do Firebase em mensagens claras, em português, para o usuário.
// As telas exibem `erro.message` diretamente.

export class ErroAmigavel extends Error {
  constructor(mensagem, codigo) {
    super(mensagem);
    this.name = 'ErroAmigavel';
    this.codigo = codigo;
  }
}

const MENSAGENS_FIRESTORE = {
  'permission-denied':
    'Você não tem permissão para realizar esta operação. Entre novamente com uma conta de administrador.',
  unauthenticated: 'Sua sessão expirou. Entre novamente.',
  unavailable: 'Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.',
  'deadline-exceeded': 'Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.',
  'resource-exhausted': 'O limite diário de uso gratuito do serviço foi atingido. Tente novamente amanhã.',
  'not-found': 'Produto não encontrado. Ele pode ter sido excluído.',
  'invalid-argument': 'Os dados foram recusados pelo servidor. Revise os campos e tente novamente.',
  'failed-precondition': 'Os dados foram recusados pelo servidor. Revise os campos e tente novamente.',
};

export function traduzirErroFirestore(erro, padrao = 'Não foi possível concluir a operação. Tente novamente.') {
  if (erro instanceof ErroAmigavel) return erro;
  return new ErroAmigavel(MENSAGENS_FIRESTORE[erro?.code] ?? padrao, erro?.code);
}

const MENSAGENS_AUTH = {
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/wrong-password': 'E-mail ou senha incorretos.',
  'auth/user-not-found': 'E-mail ou senha incorretos.',
  'auth/invalid-email': 'E-mail ou senha incorretos.',
  'auth/user-disabled': 'Esta conta foi desativada. Fale com o responsável pelo sistema.',
  'auth/too-many-requests': 'Muitas tentativas de acesso. Aguarde alguns minutos e tente novamente.',
  'auth/network-request-failed': 'Sem conexão com o servidor. Verifique sua internet e tente novamente.',
};

export function traduzirErroAuth(erro) {
  if (erro instanceof ErroAmigavel) return erro;
  return new ErroAmigavel(
    MENSAGENS_AUTH[erro?.code] ?? 'Não foi possível entrar. Tente novamente.',
    erro?.code,
  );
}
