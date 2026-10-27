// LOGIN SIMULADO — não é autenticação real e não oferece nenhuma proteção.
// Qualquer e-mail válido com senha preenchida é aceito (a validação ocorre na tela de login).
// A senha é recebida apenas para manter a assinatura da futura chamada à API e é descartada:
// nunca é armazenada nem comparada com credenciais fixas.
//
// FUTURO: substituir por POST `${API_URL}/auth/login`. A autorização real das rotas
// e operações administrativas deverá ser feita no backend.
export async function autenticarSimulado(email, senha) {
  return { email: email.trim() };
}
