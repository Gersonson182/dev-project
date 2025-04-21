type MetricCardProps = {
    title: string;
    value: number;
    color?: 'blue' | 'green' | 'red'; // COLORES DE LAS METRICAS DE SERVICIO
  };
  
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-900 border-blue-300',
    green: 'bg-green-100 text-green-900 border-green-300',
    red: 'bg-red-100 text-red-900 border-red-300',
  };
  
  export default function MetricCard({ title, value, color = 'blue' }: MetricCardProps) {
    return (
      <div className={`rounded-lg p-5 shadow border ${colorMap[color]}`}>
        <h3 className="text-sm font-medium uppercase tracking-wide">{title}</h3>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
    );
  }
  