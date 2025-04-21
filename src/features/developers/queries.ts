import { useQuery } from '@tanstack/react-query';
import { fetchDesarrolladores, fetchDesarrolladorById, fetchCantidadProyectosPorDesarrollador, fetchProyectosPorDesarrollador, fetchProyectosActivos  } from './api';
import { Desarrollador, ProyectoAsignado  } from './schema';

export const useDesarrolladores = () =>
  useQuery<Desarrollador[]>({
    queryKey: ['desarrolladores'],
    queryFn: fetchDesarrolladores,
  });

export const useDesarrollador = (id: number) =>
  useQuery<Desarrollador>({
    queryKey: ['desarrollador', id],
    queryFn: () => fetchDesarrolladorById(id),
    enabled: !!id,
  });

export const useProyectosPorDesarrollador = (id: number) =>
    useQuery<ProyectoAsignado[]>({
      queryKey: ['proyectosPorDev', id],
      queryFn: () => fetchProyectosPorDesarrollador(id),
      enabled: !!id,
    });

export const useCantidadProyectosPorDesarrollador = (id: number) =>
    useQuery<number>({
      queryKey: ['cantidadProyectos', id],
      queryFn: () => fetchCantidadProyectosPorDesarrollador(id),
      enabled: !!id,
    });

export const useProyectosActivos = () =>
        useQuery({
          queryKey: ['proyectos-activos'],
          queryFn: fetchProyectosActivos,
});


      