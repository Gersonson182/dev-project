import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashBoardView from '@/views/DashBoardView';
import AppLayout from '@/layout/AppLayout';
import DesarrolladorView from './views/DesarrolladorView';
import ProyetoView from '@/views/ProyetoView';
import DeveloperDetailsPage from '@/features/developers/components/DeveloperDetailsPage'
import ProjectDetailsPage from '@/features/projects/components/ProjectDetails'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AppLayout contiene el sidebar, header y footer */}
        <Route element={<AppLayout />}>
          {/* Dashboard como ruta principal por eso tiene INDERX en elemento */}
          {/* Página principal */}
          <Route index element={<DashBoardView />} />
          <Route path="/desarrolladores" element={<DesarrolladorView />} />
          <Route path="/proyectos" element={<ProyetoView/>} />
          <Route path="/desarrolladores/:id" element={<DeveloperDetailsPage />} />
          <Route path="/proyectos/:id" element={<ProjectDetailsPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
