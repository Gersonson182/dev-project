// layout/AppLayout.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4">
          <h1 className="text-xl font-semibold">Gestión de Desarrolladores y Proyectos</h1>
        </header>

        {/* Main */}
        <main className="flex-1 px-6 py-4">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white shadow px-6 py-2 text-sm text-gray-500 text-center">
          © 2025 Gerson Dev. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}

