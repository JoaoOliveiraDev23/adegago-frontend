import { Route, Routes } from 'react-router-dom';
import AdminLayout from './components/AdminLayout.jsx';
import PublicLayout from './components/PublicLayout.jsx';
import RotaAdmin from './components/RotaAdmin.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProdutosProvider } from './context/ProdutosContext.jsx';
import CatalogoPage from './pages/CatalogoPage.jsx';
import NaoEncontradoPage from './pages/NaoEncontradoPage.jsx';
import LoginPage from './pages/admin/LoginPage.jsx';
import PainelPage from './pages/admin/PainelPage.jsx';
import ProdutoFormPage from './pages/admin/ProdutoFormPage.jsx';
import ProdutosAdminPage from './pages/admin/ProdutosAdminPage.jsx';

export default function App() {
  return (
    <AuthProvider>
      <ProdutosProvider>
        <Routes>
          {/* Área pública: acesso direto, sem login */}
          <Route element={<PublicLayout />}>
            <Route index element={<CatalogoPage />} />
            <Route path="*" element={<NaoEncontradoPage />} />
          </Route>

          {/* Área administrativa (navegação simulada; sem proteção real) */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <RotaAdmin>
                <AdminLayout />
              </RotaAdmin>
            }
          >
            <Route index element={<PainelPage />} />
            <Route path="produtos" element={<ProdutosAdminPage />} />
            <Route path="produtos/novo" element={<ProdutoFormPage />} />
            <Route path="produtos/:id/editar" element={<ProdutoFormPage />} />
          </Route>
        </Routes>
      </ProdutosProvider>
    </AuthProvider>
  );
}
