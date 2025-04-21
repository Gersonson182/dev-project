// src/components/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { FaHome, FaUsers, FaFolderOpen } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-blue-900 text-white shadow-lg">
      <div className="p-7 text-2xl font-bold border-b border-blue-700">
        Gestión RBU
      </div>

      <nav className="flex flex-col p-4 gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md transition ${
              isActive ? 'bg-blue-700' : 'hover:bg-blue-800'
            }`
          }
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/desarrolladores"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md transition ${
              isActive ? 'bg-blue-700' : 'hover:bg-blue-800'
            }`
          }
        >
          <FaUsers />
          Desarrolladores
        </NavLink>

        <NavLink
          to="/proyectos"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md transition ${
              isActive ? 'bg-blue-700' : 'hover:bg-blue-800'
            }`
          }
        >
          <FaFolderOpen />
          Proyectos
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
