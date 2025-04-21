import {
  Proyecto,
  CrearProyectoFormData,
  EditarProyectoFormData,
} from "./schema";
import { Desarrollador } from "../dashboard/schema";
import apiClient from "@/services/apiClient";

// Obtener todos los proyectos
export const obtenerProyectos = async (): Promise<Proyecto[]> => {
  const { data } = await apiClient.get("/proyectos");
  return data;
};

// Crear nuevo proyecto
export const crearProyecto = async (
  nuevo: CrearProyectoFormData
): Promise<Proyecto> => {
  const { data } = await apiClient.post("/proyectos", nuevo);
  return data;
};

//  Actualizar proyecto (usa codigoProyecto y excluye ese campo del body)
export const actualizarProyecto = async (
  codigoProyecto: number,
  datos: Omit<EditarProyectoFormData, "codigoProyecto">
): Promise<Proyecto> => {
  const { data } = await apiClient.put(`/proyectos/${codigoProyecto}`, datos);
  return data;
};

// Eliminar proyecto (soft delete)
export const eliminarProyecto = async (
  codigoProyecto: number
): Promise<void> => {
  await apiClient.delete(`/proyectos/${codigoProyecto}`);
};

// Reactivar proyecto previamente desactivado
export const reactivarProyecto = async (
  codigoProyecto: number
): Promise<Proyecto> => {
  const { data } = await apiClient.put(`/proyectos/${codigoProyecto}/reactivar`);
  return data;
};

//  Obtener detalle de un proyecto por su código
export const obtenerDetalleProyecto = async (
  codigoProyecto: number
): Promise<Proyecto> => {
  const { data } = await apiClient.get(`/proyectos/${codigoProyecto}`);
  return data;
};

// Asignar desarrolladores uno por uno según endpoint real
export const asignarDesarrolladores = async (
  codigoProyecto: number,
  devsIds: number[]
): Promise<void> => {
  await new Promise((res) => setTimeout(res, 3000)); // Delay de 3 segundos
  await Promise.all(
    devsIds.map((devId) =>
      apiClient.post(`/proyectos/${codigoProyecto}/desarrolladores/${devId}`)
    )
  );
};



// Desasignar un desarrollador de un proyecto
export const desasignarDesarrollador = async (
  codigoProyecto: number,
  idDev: number
): Promise<void> => {
  await apiClient.delete(`/proyectos/${codigoProyecto}/desarrolladores/${idDev}`);
};

// Obtener los desarrolladores asignados a un proyecto
export const obtenerDesarrolladoresPorProyecto = async (
  codigoProyecto: number
): Promise<Desarrollador[]> => {
  const { data } = await apiClient.get(`/proyectos/${codigoProyecto}/desarrolladores`);
  return data;
};


