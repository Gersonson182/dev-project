import { useQuery } from '@tanstack/react-query';
import { fetchDesarrolladores, fetchProyectos } from './api';
import { Desarrollador, Proyecto } from './schema';

// Hook para obtener desarrolladores
export const useDesarrolladores = () =>
  useQuery<Desarrollador[]>({
    queryKey: ['desarrolladores'],
    queryFn: fetchDesarrolladores,
  });

// Hook para obtener proyectos
export const useProyectos = () =>
  useQuery<Proyecto[]>({
    queryKey: ['proyectos'],
    queryFn: fetchProyectos,
  });
