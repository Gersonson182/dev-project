import { useDesarrolladores, useProyectos } from '../queries';
import MetricCard from './MetricCard';

const DashboardMetrics = () => {
  const {
    data: desarrolladores = [],
    isLoading: loadingDevs,
    isError: errorDevs,
  } = useDesarrolladores();

  const {
    data: proyectos = [],
    isLoading: loadingPro,
    isError: errorPro,
  } = useProyectos();

  const isLoading = loadingDevs || loadingPro;
  const isError = errorDevs || errorPro;

  const totalDevs = desarrolladores.length;
  const devsActivos = desarrolladores.filter((d) => d.registroActivo).length;

  const totalProyectos = proyectos.length;
  const proyectosActivos = proyectos.filter((p) => p.registroActivo).length;

  if (isLoading) return <p className="text-gray-500">Cargando métricas...</p>;
  if (isError) return <p className="text-red-500">Error al cargar datos</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard title="Total Devs" value={totalDevs} color="blue" />
      <MetricCard title="Activos" value={devsActivos} color="green" />
      <MetricCard title="Total Proyectos" value={totalProyectos} color="blue" />
      <MetricCard title="Proyectos Activos" value={proyectosActivos} color="green" />
    </div>
  );
};

export default DashboardMetrics;
