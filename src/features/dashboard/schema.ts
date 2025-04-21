import { z } from 'zod';

export const desarrolladorSchema = z.object({
  codigoDesarrollador: z.number(),
  nombre: z.string().max(200),
  rut: z.string().max(10),
  correoElectronico: z.string().email().max(100),
  fechaContratacion: z.string(),
  aniosExperiencia: z.number().nonnegative(),
  registroActivo: z.boolean(),
});

export const proyectoSchema = z.object({
  codigoProyecto: z.number(),
  nombre: z.string().max(50),
  fechaInicio: z.string(),
  fechaTermino: z.string(),
  registroActivo: z.boolean(),
});

// Esquemas de array
export const desarrolladoresSchema = z.array(desarrolladorSchema);
export const proyectosSchema = z.array(proyectoSchema);

// Tipos TS inferidos
export type Desarrollador = z.infer<typeof desarrolladorSchema>;
export type Proyecto = z.infer<typeof proyectoSchema>;
