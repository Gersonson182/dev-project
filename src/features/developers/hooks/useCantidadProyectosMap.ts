import { useQuery } from '@tanstack/react-query';
import { fetchDesarrolladores, fetchProyectosPorDesarrollador } from '../api';

export const useCantidadProyectosMap = () =>
  useQuery({
    queryKey: ['cantidadProyectosMap'],
    queryFn: async () => {
      const desarrolladores = await fetchDesarrolladores();

      const cantidades = await Promise.all(
        desarrolladores.map(async (dev) => {
          const proyectos = await fetchProyectosPorDesarrollador(dev.codigoDesarrollador);
          return {
            codigoDesarrollador: dev.codigoDesarrollador,
            cantidadProyectos: proyectos.length,
          };
        })
      );

      const map = new Map<number, number>();
      cantidades.forEach((item) => {
        map.set(item.codigoDesarrollador, item.cantidadProyectos);
      });

      return map;
    },
  });
