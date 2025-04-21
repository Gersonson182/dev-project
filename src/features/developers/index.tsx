import { useState } from "react";
import FiltrosDesarrollador from "./components/DevFilters";
import CrearDesarrolladorModal from "./components/DevFormModalCreate";
import DevFormModalEdit from "./components/DevFormModalEdit";
import DesarrolladoresTable from "./components/DevTable";
import AsignarProyectoModal from "./components/DevProjectModal";

export default function DesarrolladorPage() {
  const [crearModalAbierto, setCrearModalAbierto] = useState(false);

  return (
    <div className="space-y-6">
      <FiltrosDesarrollador onCrear={() => setCrearModalAbierto(true)} />
      <CrearDesarrolladorModal
        isOpen={crearModalAbierto}
        onClose={() => setCrearModalAbierto(false)}
      />
      <DevFormModalEdit />
      <AsignarProyectoModal />
      <DesarrolladoresTable />
    </div>
  );
}
