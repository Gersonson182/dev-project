// features/projects/queries.ts
import { useQuery } from "@tanstack/react-query";
import {
  obtenerProyectos,
  obtenerDetalleProyecto,
} from "./api";
import { Proyecto } from "./schema";
import { Desarrollador } from "../dashboard/schema";
import { obtenerDesarrolladoresPorProyecto } from "./api";

// Lista todos los proyectos
export const useProyectos = () =>
  useQuery<Proyecto[]>({
    queryKey: ["proyectos"],
    queryFn: obtenerProyectos,
  });

// Obtiene un proyecto por ID (por ejemplo para el modal de editar o ver detalles)
export const useDetalleProyecto = (id: number, enabled = true) =>
  useQuery<Proyecto>({
    queryKey: ["proyecto", id],
    queryFn: () => obtenerDetalleProyecto(id),
    enabled,
  });

  // Hook que devuelve solo la cantidad de desarrolladores asignados a un proyecto pero en forma numerica .length
export const useCantidadDevsPorProyecto = (codigoProyecto: number) =>
  useQuery<number>({
    queryKey: ["cantidadDevsProyecto", codigoProyecto],
    queryFn: async () => {
      const data = await obtenerDesarrolladoresPorProyecto(codigoProyecto);
      console.log("Devuelto desde queryFn:", data); 
      return data.length;
    },
    enabled: !!codigoProyecto,
  });

   // Hook que devuelve la cantidad de desarrolladores asignado por un proyecto de forma completa
   export const useDesarrolladoresPorProyecto = (codigoProyecto: number) =>
    useQuery<Desarrollador[]>({
      queryKey: ["devsAsignados", codigoProyecto],
      queryFn: () => obtenerDesarrolladoresPorProyecto(codigoProyecto),
      enabled: !!codigoProyecto,
    });