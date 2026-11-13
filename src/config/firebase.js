// Configuração central do Firebase: inicializa o app e exporta Authentication (auth) e Firestore (db).
import { getApp, getApps, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { firebaseConfig, usarEmuladores } from './env.js';
import { ErroAmigavel } from '../services/erros.js';

export const firebaseConfigurado = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
);

let auth = null;
let db = null;

if (firebaseConfigurado) {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  if (usarEmuladores) {
    try {
      connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      connectFirestoreEmulator(db, '127.0.0.1', 8080);
    } catch {
      // Já conectado (acontece na recarga a quente do Vite). Pode ignorar.
    }
  }
} else {
  console.error(
    '[AdegaGo] Configuração do Firebase ausente. Copie .env.example para .env e preencha os valores ' +
      '(ou use "npm run dev:emulador").',
  );
}

export { auth, db };

// Chamada no início dos serviços: dá uma mensagem clara em vez de um erro técnico.
export function exigirFirebase() {
  if (!firebaseConfigurado) {
    throw new ErroAmigavel(
      'O sistema ainda não foi configurado para acessar o banco de dados. Avise o responsável.',
      'sem-configuracao',
    );
  }
}
