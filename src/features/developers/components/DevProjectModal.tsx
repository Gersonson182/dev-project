import { useDevUIStore } from "../../../stores/devUIStore"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useProyectosActivos, useProyectosPorDesarrollador, useDesarrolladores } from "../queries"
import { useState, useMemo } from "react"
import { useAsignarProyecto } from "../mutations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQueryClient } from '@tanstack/react-query';
import { useNotification } from "@/components/useNotifications";
import { Checkbox } from "@/components/ui/checkbox";

export default function AsignarProyectoModal() {
  const { asignacionModalOpen, devIdAsignar, cerrarAsignacion } = useDevUIStore()
  const [selected, setSelected] = useState<number[]>([]);
  const [filtro, setFiltro] = useState('');
  const { mutateAsync: asignarAsync } = useAsignarProyecto()
  const [isAssigning, setIsAssigning] = useState(false);
  const { notifySuccess, notifyError } = useNotification();  
  const queryClient = useQueryClient();

  const { data: proyectosActivos = [] } = useProyectosActivos();
  const { data: proyectosAsignados = [] } = useProyectosPorDesarrollador(devIdAsignar ?? 0);
  const { data: desarrolladores = [] } = useDesarrolladores();
  const devActual = desarrolladores.find(dev => dev.codigoDesarrollador === devIdAsignar);

  const proyectosDisponibles = useMemo(() => {
    return proyectosActivos.filter(
      (proy) =>
        !proyectosAsignados.some(
          (asignado) => asignado.codigoProyecto === proy.codigoProyecto
        ) &&
        proy.nombre.toLowerCase().includes(filtro.toLowerCase())
    );
  }, [proyectosActivos, proyectosAsignados, filtro]);

  const toggleProyecto = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAsignar = async () => {
    if (!devIdAsignar || selected.length === 0) return;

    setIsAssigning(true);
    try {
      const asignaciones = selected.map((proyectoId) =>
        asignarAsync({ proyectoId, devId: devIdAsignar })
      );

      await Promise.all(asignaciones);

      notifySuccess("Todos los proyectos fueron asignados correctamente");

      queryClient.invalidateQueries({ queryKey: ["cantidadProyectosMap"] });
      queryClient.refetchQueries({ queryKey: ["cantidadProyectosMap"] });

      queryClient.invalidateQueries({ queryKey: ["proyectosPorDesarrollador", devIdAsignar] });
      queryClient.invalidateQueries({ queryKey: ["desarrolladores"] });

      cerrarAsignacion();
    } catch (error) {
      console.error("Error al asignar:", error);
      notifyError("Ocurrió un error al asignar uno o más proyectos");
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <Dialog open={asignacionModalOpen} onOpenChange={cerrarAsignacion}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Asignar proyectos</DialogTitle>
          <DialogDescription>
            Marca los proyectos que deseas asignar a este desarrollador.
          </DialogDescription>
          {devActual && (
            <p className="text-sm text-muted-foreground">
              Asignando a: <span className="font-semibold text-blue-700">{devActual.nombre}</span>
            </p>
          )}
        </DialogHeader>

        <p className="text-sm text-muted-foreground mb-2">
          {proyectosDisponibles.length === 0
            ? "No hay proyectos disponibles para asignar."
            : `Hay ${proyectosDisponibles.length} proyecto(s) disponible(s) para asignar`}
        </p>

        <Input
          placeholder="Buscar por nombre..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="mb-3"
        />

        {proyectosDisponibles.length > 0 ? (
          <div className="space-y-2">
            {proyectosDisponibles.map((proy) => (
              <label key={proy.codigoProyecto} className="flex items-center gap-3">
                <Checkbox
                  checked={selected.includes(proy.codigoProyecto)}
                  onCheckedChange={() => toggleProyecto(proy.codigoProyecto)}
                />
                {proy.nombre}
              </label>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic mt-2">
            Todos los proyectos activos ya están asignados a este desarrollador.
          </p>
        )}

        <div className="text-sm text-muted-foreground pt-2">
          Seleccionados: {selected.length}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={cerrarAsignacion} disabled={isAssigning}>
            Cancelar
          </Button>
          <Button
            onClick={handleAsignar}
            disabled={isAssigning || selected.length === 0}
          >
            {isAssigning ? "Asignando..." : `Guardar (${selected.length})`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

