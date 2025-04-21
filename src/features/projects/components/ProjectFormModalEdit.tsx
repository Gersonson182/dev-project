import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";
  
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import {
    editarProyectoSchema,
    EditarProyectoFormData,
  } from "../schema";
  import { useEditarProyecto } from "../mutations";
  import { useDetalleProyecto } from "../queries";
  import { useProjectsUIStore } from "@/stores/projectUIStore";
  import { useEffect } from "react";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { useNotification } from "@/components/useNotifications";
  
 // ... mismo import que ya tenías ...

export default function ProjectFormModalEdit() {
    const {
      proyectoIdEditar,
      isEditModalOpen,
      cerrarEditModal,
    } = useProjectsUIStore();
  
    const {
      register,
      reset,
      getValues,
      handleSubmit,
      formState: { errors },
    } = useForm<EditarProyectoFormData>({
      resolver: zodResolver(editarProyectoSchema),
    });
  
    const { data: proyecto, isSuccess } = useDetalleProyecto(
      proyectoIdEditar ?? 0,
      isEditModalOpen
    );
  
    const { mutate: editarProyecto, isPending } = useEditarProyecto();
    const notificar = useNotification();
  
    useEffect(() => {
      if (isSuccess && proyecto) {
        reset({
          codigoProyecto: proyecto.codigoProyecto,
          nombre: proyecto.nombre,
          fechaInicio: new Date(proyecto.fechaInicio).toISOString().split("T")[0],
          fechaTermino: new Date(proyecto.fechaTermino).toISOString().split("T")[0],
          registroActivo: proyecto.registroActivo,
        });
      }
    }, [isSuccess, proyecto, reset]);
  
    const handleClose = () => {
      cerrarEditModal();
      reset();
    };
  
    const onSubmit = () => {
      const formData = getValues();
      notificar.notifyConfirm(
        "¿Estás seguro de guardar los cambios del proyecto?",
        () => {
          editarProyecto(formData, {
            onSuccess: () => {
              notificar.notifySuccess("Proyecto actualizado correctamente");
              handleClose();
            },
            onError: () => {
              notificar.notifyError("Error al actualizar el proyecto");
            },
          });
        },
        () => {
          notificar.notifyError("Acción cancelada");
        }
      );
    };
  
    return (
      <Dialog open={isEditModalOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar proyecto</DialogTitle>
            <DialogDescription>
              Modifica los campos necesarios. No puedes editar el ID.
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
    <Button type="button" variant="outline" onClick={handleClose}>
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
  