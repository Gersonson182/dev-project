import { useProyectos } from "../queries";
import { useProjectsUIStore } from "@/stores/projectUIStore";
import { useMemo } from "react";
import ProjectRow from "./ProjectRow";

export default function ProjectTable() {
  const { data: proyectos, isLoading } = useProyectos();

  const {
    nombre,
    estado,
    fechaInicio,
    fechaTermino,
  } = useProjectsUIStore();

  const proyectosFiltrados = useMemo(() => {
    if (!proyectos) return [];

    return proyectos
      .filter((p) => {
        const nombreMatch = p.nombre.toLowerCase().includes(nombre.toLowerCase());
        const estadoMatch =
          estado === "todos" ||
          (estado === "activo" && p.registroActivo) ||
          (estado === "inactivo" && !p.registroActivo);
        const inicioProyecto = p.fechaInicio.split("T")[0];
        const finProyecto = p.fechaTermino.split("T")[0];
        const inicioFiltro = fechaInicio;
        const finFiltro = fechaTermino;
        const fechaInicioMatch = !inicioFiltro || inicioProyecto >= inicioFiltro;
        const fechaTerminoMatch = !finFiltro || finProyecto <= finFiltro;

        return (
          nombreMatch &&
          estadoMatch &&
          fechaInicioMatch &&
          fechaTerminoMatch
        );
      })
      .sort((a, b) => Number(b.registroActivo) - Number(a.registroActivo)); // Ordena: activos arriba, inactivos abajo
  }, [proyectos, nombre, estado, fechaInicio, fechaTermino]);

  if (isLoading) return <p>Cargando proyectos...</p>;
  if (proyectosFiltrados.length === 0) return <p>No hay proyectos que coincidan.</p>;

  return (
    <table className="w-full table-auto border text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Nombre</th>
          <th className="p-2">Inicio</th>
          <th className="p-2">Término</th>
          <th className="p-2"># Devs</th>
          <th className="p-2">Estado</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {proyectosFiltrados.map((p) => (
          <ProjectRow key={p.codigoProyecto} proyecto={p} />
        ))}
      </tbody>
    </table>
  );
}



