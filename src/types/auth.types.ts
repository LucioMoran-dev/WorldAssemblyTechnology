import { z } from "zod";

import type { IUser } from "@/types/user.types";

export const schemaForgot = z.object({
  email: z.string().email("Ingresa un email valido"),
});

export type FormValues = z.infer<typeof schemaForgot>;

export const schemaReset = z
  .object({
    newPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
        {
          message:
            "Debe tener 8-15 caracteres, mayúscula, minúscula, número y símbolo (!@#$%^&*)",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

export type FormValuesReset = z.infer<typeof schemaReset>;

export interface ExchangeCodeResponse {
  userId: string;
  success: boolean;
  accessToken?: string;
  user?: IUser;
}

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "El nombre completo debe tener al menos 3 caracteres"),
    email: z.string().email("Por favor ingresa una dirección de email válido"),
    phone: z
      .string()
      .min(10, "Por favor ingresa un número de teléfono válido")
      .regex(/^\+?\d+$/, "El teléfono solo debe contener números"),
    birthdate: z.string().min(1, "La fecha de nacimiento es requerida"),
    address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
    username: z
      .string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales"
      ),
    confirmPassword: z
      .string()
      .min(8, "La confirmación de contraseña debe tener al menos 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Por favor ingresa una dirección de email válida"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
