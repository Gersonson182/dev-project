
import { useNavigate } from "react-router-dom";
import { UsersIcon, FolderIcon } from "lucide-react";

export default function GestionCards() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
      {/* Card de Devs */}
      <div
        onClick={() => navigate("/desarrolladores")}
        className="cursor-pointer rounded-xl border p-6 shadow hover:shadow-lg transition"
      >
        <div className="flex items-center gap-4">
          <UsersIcon className="w-12 h-12 text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold">Gestionar Devs</h2>
            <p className="text-sm text-gray-600">
              <span className="font-bold">→ Ir a vista de desarrolladores</span>
            </p>
          </div>
        </div>
      </div>

      {/* Card de Proyectos */}
      <div
        onClick={() => navigate("/proyectos")}
        className="cursor-pointer rounded-xl border p-6 shadow hover:shadow-lg transition"
      >
        <div className="flex items-center gap-4">
          <FolderIcon className="w-12 h-12 text-green-600" />
          <div>
            <h2 className="text-xl font-semibold">Gestionar Proyectos</h2>
            <p className="text-sm text-gray-600">
              <span className="font-bold">→ Ir a vista de Proyectos</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
