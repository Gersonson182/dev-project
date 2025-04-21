import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useProjectsUIStore } from "@/stores/projectUIStore";
import { useDetalleProyecto, useDesarrolladoresPorProyecto } from "../queries";
import { useAsignarDesarrolladores } from "../mutations";
import { useDesarrolladores } from "@/features/developers/queries";
import { useEffect, useState, useMemo } from "react";
import { useNotification } from "@/components/useNotifications";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProjectAssignModal() {
  const {
    proyectoIdEditar,
    isAssignModalOpen,
    cerrarAssignModal,
  } = useProjectsUIStore();

  const {
    data: proyecto,
    refetch: refetchProyecto,
  } = useDetalleProyecto(proyectoIdEditar ?? 0, isAssignModalOpen);

  const { data: asignados = [] } = useDesarrolladoresPorProyecto(proyecto?.codigoProyecto ?? 0);
  const { data: todosLosDevs = [] } = useDesarrolladores();

  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const [filtroNombre, setFiltroNombre] = useState("");

  const { mutate: asignar, isPending: asignando } = useAsignarDesarrolladores();
  const notificar = useNotification();

  useEffect(() => {
    if (!isAssignModalOpen) return;

    const actuales = asignados.map((d) => d.codigoDesarrollador);

    const disponiblesIds = todosLosDevs
      .filter(
        (dev) =>
          dev.registroActivo &&
          !asignados.some(
            (a) => a.codigoDesarrollador === dev.codigoDesarrollador
          )
      )
      .map((d) => d.codigoDesarrollador);

    const seleccionables = actuales.filter((id) => disponiblesIds.includes(id));

    const sonIguales =
      seleccionables.length === seleccionados.length &&
      seleccionables.every((id) => seleccionados.includes(id));

    if (!sonIguales) {
      setSeleccionados(seleccionables);
    }
  }, [asignados, todosLosDevs, isAssignModalOpen]);

  const toggleDev = (id: number) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const devsDisponibles = useMemo(() => {
    return todosLosDevs.filter(
      (dev) =>
        dev.registroActivo &&
        !asignados.some((a) => a.codigoDesarrollador === dev.codigoDesarrollador) &&
        dev.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
    );
  }, [todosLosDevs, asignados, filtroNombre]);

  const onSubmit = () => {
    if (!proyectoIdEditar) return;

    notificar.notifyConfirm(
      "¿Deseas confirmar la asignación de desarrolladores?",
      () => {
        asignar(
          { idProyecto: proyectoIdEditar, devsIds: seleccionados },
          {
            onSuccess: () => {
              notificar.notifySuccess("Asignaciones actualizadas correctamente");
              refetchProyecto();
              cerrarAssignModal();
            },
            onError: () => {
              notificar.notifyError("Error al asignar desarrolladores");
            },
          }
        );
      }
    );
  };

  return (
    <Dialog open={isAssignModalOpen} onOpenChange={cerrarAssignModal}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Asignar desarrolladores</DialogTitle>
          <DialogDescription>
            Marca los desarrolladores que deseas asignar a este proyecto.
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm text-muted-foreground mb-2">
          {devsDisponibles.length === 0
            ? "No hay desarrolladores disponibles."
            : `Hay ${devsDisponibles.length} desarrollador(es) disponible(s) para asignar`}
        </p>

        <Input
          placeholder="Buscar por nombre..."
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          className="mb-3"
        />

        {devsDisponibles.length > 0 ? (
          <div className="space-y-2">
            {devsDisponibles.map((dev) => (
              <label
                key={dev.codigoDesarrollador}
                className="flex items-center gap-3"
              >
                <Checkbox
                  checked={seleccionados.includes(dev.codigoDesarrollador)}
                  onCheckedChange={() => toggleDev(dev.codigoDesarrollador)}
                />
                {dev.nombre}
              </label>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic mt-2">
            Todos los desarrolladores activos ya están asignados a este proyecto.
          </p>
        )}

        <div className="text-sm text-muted-foreground pt-2">
          Seleccionados: {seleccionados.length}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={cerrarAssignModal} disabled={asignando}>
            Cancelar
          </Button>
          <Button
            onClick={onSubmit}
            disabled={asignando || seleccionados.length === 0}
          >
            {asignando ? "Asignando..." : `Guardar (${seleccionados.length})`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}




