import { useState } from "react";
import ProjectFilters from "./components/ProjectFilters";
import ProjectFormModalCreate from "./components/ProjectFormModalCreate";
import ProjectFormModalEdit from "./components/ProjectFormModalEdit";
import ProjectAssignModal from "./components/ProjectAssignModal";
import ProjectTable from "./components/ProjectTable";

export default function ProjectPage() {
  const [crearModalAbierto, setCrearModalAbierto] = useState(false);

  return (
    <div className="space-y-6">
      <ProjectFilters onCrear={() => setCrearModalAbierto(true)} />
      <ProjectFormModalCreate
        isOpen={crearModalAbierto}
        onClose={() => setCrearModalAbierto(false)}
      />
      <ProjectFormModalEdit />
      <ProjectAssignModal />
      <ProjectTable />
    </div>
  );
}
