import apiClient from '@/services/apiClient';
import {
  desarrolladoresSchema,
  proyectosSchema,
  Desarrollador,
  Proyecto,
} from './schema';

export async function fetchDesarrolladores(): Promise<Desarrollador[]> {
  try {
    const response = await apiClient.get('/desarrolladores');
    console.log('respuesta de desarrolladores', response.data)
    return desarrolladoresSchema.parse(response.data); // Validación Zod

  } catch (error) {
    console.error('Error al obtener desarrolladores:', error);
    throw new Error('Error al obtener desarrolladores');
  }
}

export async function fetchProyectos(): Promise<Proyecto[]> {
  try {
    const response = await apiClient.get('/proyectos');
    console.log('respuesta de Proyectos', response.data)
    return proyectosSchema.parse(response.data); // Validación Zod
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    throw new Error('Error al obtener proyectos');
  }
}
