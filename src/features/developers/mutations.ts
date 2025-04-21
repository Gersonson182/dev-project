import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createDesarrollador,
  updateDesarrollador,
  deleteDesarrollador,
  reactivarDesarrollador,
  asignarProyecto
} from './api';
import { Desarrollador } from './schema';

export const useCreateDesarrollador = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDesarrollador,
    onSuccess: (nuevoDesarrollador: Desarrollador) => {
      queryClient.setQueryData<Desarrollador[]>(['desarrolladores'], (old) => {
        if (!old) return [nuevoDesarrollador];
        return [nuevoDesarrollador, ...old];
      });
    },
  });
};


export const useUpdateDesarrollador = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Desarrollador> }) =>
      updateDesarrollador(id, data),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['desarrolladores']});
    },
  });
};

export const useDeleteDesarrollador = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDesarrollador,
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['desarrolladores']});
    },
  });
};

export const useReactivarDesarrollador = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reactivarDesarrollador,
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['desarrolladores']});
    },
  });
};

export const useAsignarProyecto = () =>
    useMutation({
      mutationFn: ({ devId, proyectoId }: { devId: number, proyectoId: number }) =>
        asignarProyecto(devId, proyectoId),
 });