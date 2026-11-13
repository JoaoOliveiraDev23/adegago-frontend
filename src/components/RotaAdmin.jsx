import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Esta verificação melhora a navegação (esconde as telas de quem não entrou), mas NÃO é o que
// protege os dados: o código do React roda no navegador e pode ser contornado.
// A proteção real está nas Security Rules do Firestore (repositório adegago-backend).
export default function RotaAdmin({ children }) {
  const { autenticado, carregando } = useAuth();
  const local = useLocation();
  if (carregando) {
    return (
      <p className="container pagina-simples" role="status">
        Verificando sessão…
      </p>
    );
  }
  if (!autenticado) {
    return <Navigate to="/admin/login" replace state={{ de: local.pathname }} />;
  }
  return children;
}
