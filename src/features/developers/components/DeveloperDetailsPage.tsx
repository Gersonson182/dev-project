import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useDesarrollador, useProyectosPorDesarrollador } from '../queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {Button} from '@/components/ui/button'

export default function DeveloperDetails() {
  const { id } = useParams();
  const devId = Number(id);
  const navigate = useNavigate()

  const { data: dev, isLoading: loadingDev, isError: errorDev } = useDesarrollador(devId);
  const {
    data: proyectos,
    isLoading: loadingProyectos,
    isError: errorProyectos,
  } = useProyectosPorDesarrollador(devId);

  if (loadingDev || loadingProyectos) {
    return <Skeleton className="w-full h-32" />;
  }

  if (errorDev || !dev) {
    return <p className="text-red-500">Error al cargar los datos del desarrollador.</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Detalles del Desarrollador</h2>
        <Button variant="outline" onClick={() => navigate(-1)}
             className="bg-blue-700 text-white hover:bg-blue-800 transition-all duration-200 shadow-md hover:shadow-lg border border-blue-900 font-semibold text-sm px-6 py-2 rounded flex items-center gap-2">
          ← Volver
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{dev.nombre}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>RUT:</strong> {dev.rut}</p>
          <p><strong>Correo:</strong> {dev.correoElectronico}</p>
          <p><strong>Contratación:</strong> {new Date(dev.fechaContratacion).toLocaleDateString('es-CL')}</p>
          <p><strong>Experiencia:</strong> {dev.aniosExperiencia} años</p>
          <p>
            <strong>Estado:</strong>{' '}
            <Badge variant={dev.registroActivo ? 'default' : 'destructive'}>
              {dev.registroActivo ? 'Activo' : 'Inactivo'}
            </Badge>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Proyectos Asignados</CardTitle>
        </CardHeader>
        <CardContent>
          {errorProyectos ? (
            <p className="text-red-500">Error al cargar proyectos.</p>
          ) : proyectos && proyectos.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-2 px-3">Nombre</th>
                  <th className="text-left py-2 px-3">Inicio</th>
                  <th className="text-left py-2 px-3">Término</th>
                  <th className="text-left py-2 px-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {proyectos.map((p) => (
                  <tr key={p.codigoProyecto}>
                    <td className="py-2 px-3">{p.nombre}</td>
                    <td className="py-2 px-3">
                      {new Date(p.fechaInicio).toLocaleDateString('es-CL')}
                    </td>
                    <td className="py-2 px-3">
                      {new Date(p.fechaTermino).toLocaleDateString('es-CL')}
                    </td>
                    <td className="py-2 px-3">
                      <Badge variant={p.registroActivo ? 'default' : 'outline'}>
                        {p.registroActivo ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">Este desarrollador no tiene proyectos asignados.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

