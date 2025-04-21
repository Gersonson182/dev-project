import { useParams, useNavigate } from "react-router-dom";
import {
  useDetalleProyecto,
  useDesarrolladoresPorProyecto,
} from "../queries";
import { Button } from "@/components/ui/button";
import { useDesasignarDesarrollador } from "../mutations";
import { useNotification } from "@/components/useNotifications";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: proyecto, isLoading } = useDetalleProyecto(Number(id));
  const {
    data: desarrolladores,
    isLoading: cargandoDevs,
    isError,
    refetch: refetchDevs,
  } = useDesarrolladoresPorProyecto(proyecto?.codigoProyecto ?? 0);

  const desasignar = useDesasignarDesarrollador();
  const notificar = useNotification();

  const handleDesasignar = (idDev: number) => {
    if (!proyecto) return;

    notificar.notifyConfirm(
      "¿Estás seguro de desasignar este desarrollador?",
      () => {
        desasignar.mutate(
          {
            idProyecto: proyecto.codigoProyecto,
            idDev,
          },
          {
            onSuccess: () => {
              notificar.notifySuccess("Desarrollador desasignado con éxito");
              refetchDevs(); // refresca la tabla sin recargar
            },
            onError: () => {
              notificar.notifyError("Error al desasignar desarrollador");
            },
          }
        );
      }
    );
  };

  if (isLoading) return <p>Cargando proyecto...</p>;
  if (!proyecto) return <p>Proyecto no encontrado.</p>;

  return (
    <div className="space-y-4 p-4">
      <Button onClick={() => navigate(-1)}>← Volver</Button>

      <h2 className="text-xl font-bold">{proyecto.nombre}</h2>
      <p>
        <strong>Fecha de inicio:</strong>{" "}
        {new Date(proyecto.fechaInicio).toLocaleDateString("es-CL")}
      </p>
      <p>
        <strong>Fecha de término:</strong>{" "}
        {new Date(proyecto.fechaTermino).toLocaleDateString("es-CL")}
      </p>
      <p>
        <strong>Estado:</strong>{" "}
        <span
          className={
            proyecto.registroActivo
              ? "text-green-600 font-medium"
              : "text-red-600 font-medium"
          }
        >
          {proyecto.registroActivo ? "Activo" : "Inactivo"}
        </span>
      </p>

      <div>
        <h3 className="text-lg font-semibold mb-2">
          Desarrolladores asignados:
        </h3>

        {cargandoDevs ? (
          <p className="text-muted-foreground">Cargando desarrolladores...</p>
        ) : isError ? (
          <p className="text-red-600">Error al cargar desarrolladores.</p>
        ) : desarrolladores?.length ? (
          <table className="w-full table-auto border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Nombre</th>
                <th className="p-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {desarrolladores.map((dev) => (
                <tr key={dev.codigoDesarrollador} className="border-t">
                  <td className="p-2">{dev.nombre}</td>
                  <td className="p-2 text-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="hover:bg-red-700 transition"
                      onClick={() =>
                        handleDesasignar(dev.codigoDesarrollador)
                      }
                    >
                      Desasignar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="italic text-gray-500">
            Este proyecto no tiene desarrolladores asignados.
          </p>
        )}
      </div>
    </div>
  );
}


