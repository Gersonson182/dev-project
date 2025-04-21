import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDeleteDesarrollador, useReactivarDesarrollador } from '../mutations';
import { Desarrollador } from '../schema';
import { useDevUIStore } from '../../../stores/devUIStore';
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useNotification } from "@/components/useNotifications";
import { Button } from "@/components/ui/button";

interface Props {
  dev: Desarrollador;
  cantidadProyectos: number;
  cargandoProyectos: boolean;
}

export default function DevRow({ dev, cantidadProyectos, cargandoProyectos }: Props) {
  const navigate = useNavigate();
  const { mutate: eliminar } = useDeleteDesarrollador();
  const { mutate: reactivar } = useReactivarDesarrollador();
  const openForEdit = useDevUIStore((state) => state.openForEdit);
  const abrirAsignacion = useDevUIStore((state) => state.abrirAsignacion);
  const { notifySuccess, notifyError } = useNotification();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmReactivar, setConfirmReactivar] = useState(false);

  const handleEliminar = () => {
    eliminar(dev.codigoDesarrollador, {
      onSuccess: () => {
        notifySuccess("Desarrollador desactivado correctamente");
        setConfirmOpen(false);
      },
      onError: () => {
        notifyError("Error al desactivar el desarrollador");
      },
    });
  };

  const handleReactivar = () => {
    reactivar(dev.codigoDesarrollador, {
      onSuccess: () => {
        notifySuccess("Desarrollador reactivado correctamente");
        setConfirmReactivar(false);
      },
      onError: () => {
        notifyError("Error al reactivar el desarrollador");
      },
    });
  };

  return (
    <tr className="text-center border-t">
      <td className="p-2">{dev.nombre}</td>
      <td className="p-2">{dev.rut}</td>
      <td className="p-2">{dev.correoElectronico}</td>
      <td className="p-2">
        {new Date(dev.fechaContratacion).toLocaleDateString('es-CL')}
      </td>
      <td className="p-2">{dev.aniosExperiencia} años</td>
      <td className="p-2">{cargandoProyectos ? '...' : cantidadProyectos}</td>
      <td className="p-2 capitalize">
        <span
          className={`font-semibold ${
            dev.registroActivo ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {dev.registroActivo ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      <td className="p-2 space-x-1">
        <Button variant="outline" size="sm" onClick={() => openForEdit(dev.codigoDesarrollador)}>
          Editar
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/desarrolladores/${dev.codigoDesarrollador}`)}
        >
          Ver detalles
        </Button>

        {dev.registroActivo && (
          <>
            <Button
              variant="default"
              size="sm"
              onClick={() => abrirAsignacion(dev.codigoDesarrollador)}
            >
              Asignar Proyectos
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => setConfirmOpen(true)}
            >
              Desactivar
            </Button>
          </>
        )}

        {!dev.registroActivo && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setConfirmReactivar(true)}
          >
            Reactivar
          </Button>
        )}
      </td>

      {/* Confirmaciones */}
      <ConfirmDialog
        open={confirmOpen}
        onConfirm={handleEliminar}
        onCancel={() => setConfirmOpen(false)}
        title="¿Desactivar desarrollador?"
        message="Esto cambiará su estado a inactivo. ¿Deseas continuar?"
      />

      <ConfirmDialog
        open={confirmReactivar}
        onConfirm={handleReactivar}
        onCancel={() => setConfirmReactivar(false)}
        title="¿Reactivar desarrollador?"
        message="Esto activará nuevamente al desarrollador. ¿Confirmas?"
      />
    </tr>
  );
}



