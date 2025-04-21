import apiClient from '@/services/apiClient';
import { desarrolladorApiSchema, desarrolladoresApiSchema, desarrolladorSchema } from './schema';
import { Desarrollador, proyectosAsignadosSchema  } from './schema';



// Obtener todos
export async function fetchDesarrolladores(): Promise<Desarrollador[]> {
  const res = await apiClient.get('/desarrolladores');
  return desarrolladoresApiSchema.parse(res.data); 
}

// Obtener uno por ID
export async function fetchDesarrolladorById(id: number): Promise<Desarrollador> {
  const res = await apiClient.get(`/desarrolladores/${id}`);
  return desarrolladorApiSchema.parse(res.data);
}

// Crear nuevo
export async function createDesarrollador(
  data: Omit<Desarrollador, 'codigoDesarrollador' | 'registroActivo'>
): Promise<Desarrollador> {
  const res = await apiClient.post('/desarrolladores', data);
  return desarrolladorApiSchema.parse(res.data); 
}


// Actualizar
export async function updateDesarrollador(id: number, data: Partial<Desarrollador>) {
  const res = await apiClient.put(`/desarrolladores/${id}`, data);
  return desarrolladorSchema.parse(res.data);
}

// Eliminar (soft delete)
export async function deleteDesarrollador(id: number) {
  const res = await apiClient.delete(`/desarrolladores/${id}`);
  return desarrolladorSchema.parse(res.data);
}

// Reactivar
export async function reactivarDesarrollador(id: number) {
  const res = await apiClient.put(`/desarrolladores/${id}/reactivar`);
  return desarrolladorSchema.parse(res.data);
}

export async function fetchProyectosPorDesarrollador(id: number) {
    const res = await apiClient.get(`/desarrolladores/${id}/proyectos`);
    return proyectosAsignadosSchema.parse(res.data);
  }

// Poder ver desarrolladores por proyecto
export async function fetchCantidadProyectosPorDesarrollador(id: number): Promise<number> {
    const res = await apiClient.get(`/desarrolladores/${id}/proyectos`);
    return Array.isArray(res.data) ? res.data.length : 0;
  }

export async function fetchProyectosActivos() {
    const res = await apiClient.get('/proyectos'); // filtras en frontend
    const proyectos = proyectosAsignadosSchema.parse(res.data)
    return proyectos.filter((p) => p.registroActivo);
  }
  
export async function asignarProyecto(devId: number, proyectoId: number) {
    return await apiClient.post(`/proyectos/${proyectoId}/desarrolladores/${devId}`);
  }
  