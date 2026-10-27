import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// ATENÇÃO: isto é apenas navegação simulada para a demonstração da interface.
// Não é segurança: o código do frontend roda no navegador e pode ser contornado.
// A autorização real (quem pode ver/alterar dados) será responsabilidade do backend.
export default function RotaAdmin({ children }) {
  const { autenticado } = useAuth();
  const local = useLocation();
  if (!autenticado) {
    return <Navigate to="/admin/login" replace state={{ de: local.pathname }} />;
  }
  return children;
}
