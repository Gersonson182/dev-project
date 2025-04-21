import { useDesarrolladores } from '../queries';
import { useDevUIStore } from '../../../stores/devUIStore';
import DevRow from './DevRow';
import { useCantidadProyectosMap } from '../hooks/useCantidadProyectosMap';

export default function DesarrolladoresTable() {
  const {
    data: desarrolladores = [],
    isLoading,
    isError,
  } = useDesarrolladores();

  const { filtros } = useDevUIStore();
  const { data: proyectosMap, isLoading: cargandoProyectos } = useCantidadProyectosMap();

  const desarrolladoresFiltrados = desarrolladores.filter((dev) => {
    const nombreOk = dev.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());
    const experienciaOk = filtros.experiencia === null || dev.aniosExperiencia === filtros.experiencia;
    const cantidadOk =
      filtros.proyectos === null || (proyectosMap?.get(dev.codigoDesarrollador) ?? 0) === filtros.proyectos;
    const estadoOk =
      filtros.estado === 'todos' ||
      (filtros.estado === 'activo' && dev.registroActivo) ||
      (filtros.estado === 'inactivo' && !dev.registroActivo);

    return nombreOk && experienciaOk && cantidadOk && estadoOk;
  });

  const desarrolladoresOrdenados = [...desarrolladoresFiltrados].sort(
    (a, b) => Number(b.registroActivo) - Number(a.registroActivo)
  );
  

  if (isLoading) return <p className="text-gray-500">Cargando desarrolladores...</p>;
  if (isError) return <p className="text-red-500">Error al cargar los desarrolladores.</p>;
  if (desarrolladoresFiltrados.length === 0)
    return <p className="text-gray-500">No hay desarrolladores que coincidan.</p>;

  return (
    <table className="w-full table-auto border text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Nombre</th>
          <th className="p-2">RUT</th>
          <th className="p-2">Correo</th>
          <th className="p-2">Contratación</th>
          <th className="p-2">Experiencia</th>
          <th className="p-2"># Proyectos</th>
          <th className="p-2">Estado</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {desarrolladoresOrdenados.map((dev) => (
          <DevRow
            key={dev.codigoDesarrollador}
            dev={dev}
            cantidadProyectos={proyectosMap?.get(dev.codigoDesarrollador) ?? 0}
            cargandoProyectos={cargandoProyectos}
          />
        ))}
      </tbody>
    </table>
  );
}




