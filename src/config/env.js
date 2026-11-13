// Configurações lidas das variáveis de ambiente do Vite (prefixo VITE_).
// Os valores do Firebase são IDENTIFICADORES PÚBLICOS do projeto (não são senhas):
// a segurança dos dados é garantida pelas Security Rules do Firestore, não pelo sigilo destes valores.
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// "true" faz o app conversar com os emuladores locais (npm run dev:emulador) em vez do Firebase real.
export const usarEmuladores = import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true';
