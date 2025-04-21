import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { crearProyectoSchema, CrearProyectoFormData } from "../schema";
import { useCrearProyecto } from "../mutations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNotification } from "@/components/useNotifications";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectFormModalCreate({ isOpen, onClose }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CrearProyectoFormData>({
    resolver: zodResolver(crearProyectoSchema),
  });

  const { mutate: crearProyecto, isPending } = useCrearProyecto();
  const notificar = useNotification();

  const onSubmit = (data: CrearProyectoFormData) => {
    crearProyecto(data, {
      onSuccess: () => {
        notificar.notifySuccess("Proyecto creado exitosamente");
        reset();
        onClose();
      },
      onError: () => {
        notificar.notifyError("Error al crear proyecto");
      },
    });
  };

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nuevo proyecto</DialogTitle>
          <DialogDescription>
            Ingresa los datos del proyecto. Todos los campos son obligatorios.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Nombre del proyecto
    </label>
    <Input placeholder="Nombre del proyecto" {...register("nombre")} />
    {errors.nombre && (
      <p className="text-sm text-red-500">{errors.nombre.message}</p>
    )}
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Fecha de inicio
    </label>
    <Input type="date" {...register("fechaInicio")} />
    {errors.fechaInicio && (
      <p className="text-sm text-red-500">{errors.fechaInicio.message}</p>
    )}
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Fecha de término
    </label>
    <Input type="date" {...register("fechaTermino")} />
    {errors.fechaTermino && (
      <p className="text-sm text-red-500">{errors.fechaTermino.message}</p>
    )}
  </div>

  <div className="flex justify-end gap-2 pt-2">
    <Button type="button" variant="outline" onClick={onClose}>
      Cancelar
    </Button>
    <Button type="submit" disabled={isPending}>
      {isPending ? "Creando..." : "Crear"}
    </Button>
  </div>
</form>

      </DialogContent>
    </Dialog>
  );
}

  