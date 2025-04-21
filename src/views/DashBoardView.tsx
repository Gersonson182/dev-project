import DashboardMetrics from '@/features/dashboard/components/DashboardMetrics';
import GestionCards from '@/features/dashboard/components/GestionCards';

export default function DashboardView() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        Panel de Métricas
      </h1>

      <DashboardMetrics />
      <GestionCards />
    </div>
  );
}
