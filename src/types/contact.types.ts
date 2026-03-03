/**
 * Tipos relacionados con el formulario de contacto
 */

import * as z from "zod";

export interface IContactDto {
  name: string;
  email: string;
  phone: string;
  reason: string;
}

export interface IContactResponse {
  message: string;
}

export const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un correo electronico valido"),
  phone: z.string().min(8, "Ingresa un numero de telefono valido"),
  reason: z.string().min(10, "El motivo debe tener al menos 10 caracteres"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
