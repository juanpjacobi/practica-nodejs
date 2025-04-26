import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
});

export const updateUserSchema = z
  .object({
    name: z.string().min(1).optional(),
    email: z.string().email("Email inválido").optional(),
  })
  .refine(data => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un campo para actualizar"
  });
