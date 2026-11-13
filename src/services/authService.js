// Autenticação REAL com o Firebase Authentication (e-mail e senha).
//
// Ser "administrador" = existir o documento admins/{uid} no Firestore (criado à mão no Console).
// O app lê esse documento só para decidir o que mostrar; quem PROTEGE os dados são as
// Security Rules (firestore.rules) — o React sozinho não protege nada.
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, exigirFirebase, firebaseConfigurado } from '../config/firebase.js';
import { ErroAmigavel, traduzirErroAuth, traduzirErroFirestore } from './erros.js';

async function ehAdministrador(uid) {
  const documento = await getDoc(doc(db, 'admins', uid));
  return documento.exists();
}

const paraUsuario = (usuarioFirebase) => ({ uid: usuarioFirebase.uid, email: usuarioFirebase.email });

export async function entrar(email, senha) {
  exigirFirebase();
  let credencial;
  try {
    credencial = await signInWithEmailAndPassword(auth, email.trim(), senha);
  } catch (erro) {
    throw traduzirErroAuth(erro);
  }

  let administrador;
  try {
    administrador = await ehAdministrador(credencial.user.uid);
  } catch (erro) {
    await signOut(auth);
    throw traduzirErroFirestore(erro, 'Não foi possível verificar sua permissão. Tente novamente.');
  }
  if (!administrador) {
    await signOut(auth); // conta existe, mas não é de administrador
    throw new ErroAmigavel('Esta conta não tem permissão de administrador.', 'nao-administrador');
  }
  return paraUsuario(credencial.user);
}

export async function sair() {
  if (auth) await signOut(auth);
}

// Avisa quando a sessão muda (login, logout, sessão restaurada ao abrir o site, sessão expirada).
// Retorna a função que cancela a observação.
export function observarSessao(aoMudar) {
  if (!firebaseConfigurado) {
    aoMudar(null);
    return () => {};
  }
  return onAuthStateChanged(auth, async (usuarioFirebase) => {
    if (!usuarioFirebase) {
      aoMudar(null);
      return;
    }
    try {
      if (await ehAdministrador(usuarioFirebase.uid)) {
        aoMudar(paraUsuario(usuarioFirebase));
      } else {
        await signOut(auth);
        aoMudar(null);
      }
    } catch {
      aoMudar(null); // sem conexão para confirmar a permissão: trata como não autenticado
    }
  });
}
