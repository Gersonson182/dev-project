
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Proyecto } from "./schema";
import {
  crearProyecto,
  actualizarProyecto,
  eliminarProyecto,
  reactivarProyecto,
  asignarDesarrolladores,
  desasignarDesarrollador,
} from "./api";
import { EditarProyectoFormData } from "./schema";

// Para refrescar los proyectos en caché
const useInvalidateProyectos = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["proyectos"] });
};

// Crear proyecto
export const useCrearProyecto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: crearProyecto,
    onSuccess: (nuevoProyecto: Proyecto) => {
      queryClient.setQueryData<Proyecto[]>(["proyectos"], (old) => {
        if (!old) return [nuevoProyecto];
        return [nuevoProyecto, ...old];
      });
    },
  });
};

// Editar proyecto
export const useEditarProyecto = () => {
    const invalidate = useInvalidateProyectos();
    return useMutation({
      mutationFn: ({ codigoProyecto, ...datos }: EditarProyectoFormData) =>
        actualizarProyecto(codigoProyecto, datos),
      onSuccess: invalidate,
    });
  };
  

// Eliminar (soft delete)
export const useEliminarProyecto = () => {
  const invalidate = useInvalidateProyectos();
  return useMutation({
    mutationFn: eliminarProyecto,
    onSuccess: invalidate,
  });
};

// Reactivar proyecto
export const useReactivarProyecto = () => {
  const invalidate = useInvalidateProyectos();
  return useMutation({
    mutationFn: reactivarProyecto,
    onSuccess: invalidate,
  });
};

// Asignar desarrolladores a un proyecto
export const useAsignarDesarrolladores = () => {
  const queryClient = useQueryClient();
  const invalidate = useInvalidateProyectos();

  return useMutation({
    mutationFn: ({ idProyecto, devsIds }: { idProyecto: number; devsIds: number[] }) =>
      asignarDesarrolladores(idProyecto, devsIds),
    onSuccess: (_, variables) => {
      invalidate(); // refresca la tabla principal
      queryClient.invalidateQueries({ queryKey: ["cantidadDevsProyecto", variables.idProyecto] }); // refresca cantidad devs
      queryClient.invalidateQueries({ queryKey: ["proyecto", variables.idProyecto] }); // refresca detalle del proyecto
    },
  });
};

// Desasignar un desarrollador
export const useDesasignarDesarrollador = () => {
  const invalidate = useInvalidateProyectos();
  return useMutation({
    mutationFn: ({ idProyecto, idDev }: { idProyecto: number; idDev: number }) =>
      desasignarDesarrollador(idProyecto, idDev),
    onSuccess: invalidate,
  });
};

