// Configurações lidas das variáveis de ambiente do Vite (prefixo VITE_).
// Nesta etapa a URL da API NÃO é usada: os serviços trabalham com dados fictícios em memória.
// Quando o backend existir, src/services/* passarão a chamar `${API_URL}/...`.
export const API_URL = import.meta.env.VITE_API_URL ?? '';
