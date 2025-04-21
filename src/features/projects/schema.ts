import { z } from "zod";

//  Esquema para los desarrolladores asignados
export const desarrolladorAsignadoSchema = z.object({
  codigoDesarrollador: z.number(),
  nombre: z.string(),
});

// Esquema base de proyecto completo
export const proyectoSchema = z.object({
  codigoProyecto: z.number(),
  nombre: z.string().min(3, "El nombre es requerido"),
  fechaInicio: z.string().min(1, "La fecha de inicio es requerida"),
  fechaTermino: z.string().min(1, "La fecha de término es requerida"),
  registroActivo: z.boolean(),
  desarrolladoresAsignados: z.array(desarrolladorAsignadoSchema).optional(),
});

// Tipo inferido del proyecto completo
export type Proyecto = z.infer<typeof proyectoSchema>;

// Esquema para crear proyecto (sin ID ni estado ni desarrolladores)
export const crearProyectoSchema = z.object({
  nombre: z.string().min(3, "El nombre es requerido"),
  fechaInicio: z.string().min(1, "La fecha de inicio es requerida"),
  fechaTermino: z.string().min(1, "La fecha de término es requerida"),
});
export type CrearProyectoFormData = z.infer<typeof crearProyectoSchema>;

// Esquema para editar proyecto (incluye ID y estado booleano)
export const editarProyectoSchema = z.object({
  codigoProyecto: z.number(),
  nombre: z.string().min(3, "El nombre es requerido"),
  fechaInicio: z.string().min(1, "La fecha de inicio es requerida"),
  fechaTermino: z.string().min(1, "La fecha de término es requerida"),
  registroActivo: z.boolean(),
});
export type EditarProyectoFormData = z.infer<typeof editarProyectoSchema>;

