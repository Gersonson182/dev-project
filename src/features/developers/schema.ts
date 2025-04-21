import { z } from 'zod';
import { formatearRut } from '@/utils/rutChileno';

//  Validación estricta para formularios (crear / editar)
//
export const desarrolladorSchema = z.object({
  nombre: z.string().nonempty('El nombre es obligatorio'),
  rut: z
    .string()
    .nonempty('El RUT es obligatorio')
    .max(12, 'Máximo 13 caracteres')
    .refine(formatearRut, { message: 'El RUT ingresado no es válido' }),
  correoElectronico: z
    .string()
    .nonempty('El correo es obligatorio')
    .email('Debe ser un correo válido'),
  fechaContratacion: z.string().nonempty('Debe indicar una fecha'),
  aniosExperiencia: z
    .number({ invalid_type_error: 'Debe ser un número' })
    .nonnegative('Debe ser un número positivo'),
});

export type FormData = z.infer<typeof desarrolladorSchema>;

//
// Validación para datos que vienen de la API (no revienta si hay RUT mal) Esto lo cree ya que hay otras personas creando rut en formatos no correctos
//
export const desarrolladorApiSchema = z.object({
  nombre: z.string(),
  rut: z.string().max(12), // sin refine, sin validación de formato
  correoElectronico: z.string(),
  fechaContratacion: z.string(),
  aniosExperiencia: z.number(),
  codigoDesarrollador: z.number(),
  registroActivo: z.boolean(),
});

export const proyectoAsignadoSchema = z.object({
    codigoProyecto: z.number(),
    nombre: z.string(),
    fechaInicio: z.string(),
    fechaTermino: z.string(),
    registroActivo: z.boolean(),
  });

export const desarrolladoresApiSchema = z.array(desarrolladorApiSchema);

// Tipo de desarrollador completo (usado para tablas, listados, etc.)
export type Desarrollador = z.infer<typeof desarrolladorApiSchema>;

export const proyectosAsignadosSchema = z.array(proyectoAsignadoSchema);

export type ProyectoAsignado = z.infer<typeof proyectoAsignadoSchema>;
