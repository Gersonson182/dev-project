import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDevUIStore } from "../../../stores/devUIStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { desarrolladorSchema, FormData } from "../schema";
import { useUpdateDesarrollador } from "../mutations";
import { useNotification } from "@/components/useNotifications";
import { useEffect } from "react";
import { useDesarrollador } from "../queries";
import { formatearRut, limpiarRut } from "@/utils/rutChileno";

export default function DevFormModalEdit() {
  const { modalOpen, closeModal, selectedDevId } = useDevUIStore();
  const { notifySuccess, notifyError } = useNotification();
  const { data: devData, isSuccess } = useDesarrollador(selectedDevId || 0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(desarrolladorSchema),
    defaultValues: {
      nombre: "",
      rut: "",
      correoElectronico: "",
      fechaContratacion: "",
      aniosExperiencia: 0,
    },
  });

  const { mutate: actualizarDev, isPending } = useUpdateDesarrollador();

  const onSubmit = (data: FormData) => {
    const payload = {
      ...data,
      rut: limpiarRut(data.rut),
      fechaContratacion: new Date(data.fechaContratacion).toISOString(),
    };

    if (selectedDevId) {
      actualizarDev(
        { id: selectedDevId, data: payload },
        {
          onSuccess: () => {
            notifySuccess("Desarrollador actualizado con éxito");
            closeModal();
          },
          onError: () => notifyError("Error al actualizar"),
        }
      );
    }
  };

  useEffect(() => {
    if (modalOpen && selectedDevId && isSuccess && devData) {
      reset({
        ...devData,
        rut: formatearRut(devData.rut),
        fechaContratacion: devData.fechaContratacion.split("T")[0],
      });
    }
  }, [modalOpen, selectedDevId, isSuccess, devData, reset]);

  return (
    <Dialog open={modalOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar desarrollador</DialogTitle>
          <DialogDescription>
            Modifica los campos necesarios.
          </DialogDescription>
        </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <Input placeholder="Nombre" {...register("nombre")} />
            {errors.nombre && (
              <p className="text-sm text-red-500">{errors.nombre.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              RUT
            </label>
            <Input
              placeholder="RUT"
              value={formatearRut(watch("rut") || "")}
              onChange={(e) => {
                const raw = e.target.value
                  .replace(/\./g, "")
                  .replace(/-/g, "")
                  .replace(/[^0-9kK]/g, "");
                if (raw.length > 1) {
                  const cuerpo = raw.slice(0, -1);
                  const dv = raw.slice(-1);
                  setValue("rut", `${cuerpo}${dv}`);
                } else {
                  setValue("rut", raw);
                }
              }}
            />
            {errors.rut && (
              <p className="text-sm text-red-500">{errors.rut.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <Input placeholder="Correo electrónico" {...register("correoElectronico")} />
            {errors.correoElectronico && (
              <p className="text-sm text-red-500">{errors.correoElectronico.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de contratación
            </label>
            <Input type="date" {...register("fechaContratacion")} />
            {errors.fechaContratacion && (
              <p className="text-sm text-red-500">{errors.fechaContratacion.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Años de experiencia
            </label>
            <Input
              type="number"
              placeholder="Años de experiencia"
              {...register("aniosExperiencia", { valueAsNumber: true })}
            />
            {errors.aniosExperiencia && (
              <p className="text-sm text-red-500">{errors.aniosExperiencia.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
      </form>

      </DialogContent>
    </Dialog>
  );
}



