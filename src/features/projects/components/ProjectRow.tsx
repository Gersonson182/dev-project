import { useCantidadDevsPorProyecto } from "../queries";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useProjectsUIStore } from "@/stores/projectUIStore";
import { useEliminarProyecto, useReactivarProyecto } from "../mutations";
import { Proyecto } from "../schema";
import { useNotification } from "@/components/useNotifications";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useState } from "react";

interface Props {
  proyecto: Proyecto;
}

export default function ProjectRow({ proyecto }: Props) {
  const navigate = useNavigate();
  const notificar = useNotification();

  const { abrirEditModal, abrirAssignModal } = useProjectsUIStore();

  const eliminarProyecto = useEliminarProyecto();
  const reactivarProyecto = useReactivarProyecto();

  const { data: cantidadDevHook } = useCantidadDevsPorProyecto(proyecto.codigoProyecto);
  const { cantidadDevs: cantidadFiltro } = useProjectsUIStore();

  const [confirmDesactivarOpen, setConfirmDesactivarOpen] = useState(false);
  const [confirmReactivarOpen, setConfirmReactivarOpen] = useState(false);

  if (
    cantidadFiltro !== null &&
    cantidadFiltro !== undefined &&
    cantidadDevHook !== undefined &&
    cantidadDevHook !== cantidadFiltro
  ) {
    return null;
  }

  const handleDesactivar = () => {
    eliminarProyecto.mutate(proyecto.codigoProyecto, {
      onSuccess: () => {
        notificar.notifySuccess("Proyecto desactivado correctamente");
        setConfirmDesactivarOpen(false);
      },
      onError: () => {
        notificar.notifyError("Error al desactivar el proyecto");
      },
    });
  };

  const handleReactivar = () => {
    reactivarProyecto.mutate(proyecto.codigoProyecto, {
      onSuccess: () => {
        notificar.notifySuccess("Proyecto reactivado correctamente");
        setConfirmReactivarOpen(false);
      },
      onError: () => {
        notificar.notifyError("Error al reactivar el proyecto");
      },
    });
  };

  return (
    <>
      <tr className="text-center border-t">
        <td className="p-2">{proyecto.nombre}</td>
        <td className="p-2">{new Date(proyecto.fechaInicio).toLocaleDateString("es-CL")}</td>
        <td className="p-2">{new Date(proyecto.fechaTermino).toLocaleDateString("es-CL")}</td>
        <td className="p-2">{cantidadDevHook ?? "..."}</td>
        <td className="p-2 capitalize">
          <span
            className={`font-semibold ${
              proyecto.registroActivo ? "text-green-600" : "text-red-600"
            }`}
          >
            {proyecto.registroActivo ? "Activo" : "Inactivo"}
          </span>
        </td>
      <td className="p-2 space-x-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => abrirEditModal(proyecto.codigoProyecto)}
        >
          Editar
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/proyectos/${proyecto.codigoProyecto}`)}
        >
          Gestionar Proyecto
        </Button>

        {proyecto.registroActivo && (
          <Button
            variant="default"
            size="sm"
            onClick={() => abrirAssignModal(proyecto.codigoProyecto)}
          >
            Asignar Proyecto a Dev
          </Button>
        )}

        {proyecto.registroActivo ? (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setConfirmDesactivarOpen(true)}
          >
            Desactivar
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setConfirmReactivarOpen(true)}
          >
            Reactivar
          </Button>
        )}
      </td>
      </tr>

      <ConfirmDialog
        open={confirmDesactivarOpen}
        onConfirm={handleDesactivar}
        onCancel={() => setConfirmDesactivarOpen(false)}
        title="¿Desactivar proyecto?"
        message="Esto cambiará su estado a inactivo. ¿Deseas continuar?"
      />

      <ConfirmDialog
        open={confirmReactivarOpen}
        onConfirm={handleReactivar}
        onCancel={() => setConfirmReactivarOpen(false)}
        title="¿Reactivar proyecto?"
        message="Esto activará nuevamente el proyecto. ¿Deseas continuar?"
      />

    </>

    
  );
}
