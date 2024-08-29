import { z } from "zod";

export const loginSchema = z.object({
  // Validate email
  email: z.string({ required_error: "El email es requerido." }).email({
    message: "Ingrese un email valido, ejm: user@gmail.com",
  }),

  // Validate password
  password: z.string({ required_error: "La contraseĆ±a es requerida." }),
});

// Define the schema for UserPhoneNumberEdit
export const userPhoneNumberEditSchema = z.object({
  code: z.string().min(1, { message: "El campo es requerido" }),
  phone_number: z.string().min(1, { message: "El campo es requerido" }),
});

// Define the schema for password
export const passwordEditSchema = z.object({
  current_password: z.string().min(1, { message: "El campo es requerido" }),
  new_password: z.string().min(1, { message: "El campo es requerido" }),
  validate_password: z.string().min(1, { message: "El campo es requerido" }),
});

// Define the schema for address
export const addressEditSchema = z.object({
  country: z.string().min(1, { message: "El campo es requerido" }),
  state: z.string().min(1, { message: "El campo es requerido" }),
  city: z.string().min(1, { message: "El campo es requerido" }),
  street_address: z.string().min(1, { message: "El campo es requerido" }),
  postal_code: z.string().min(1, { message: "El campo es requerido" }),
});

export const editProfileSchema = z.object({
  // Validate name
  name: z.string({ required_error: "El nombre es requerido." }).optional(),
  // Validate surname
  surname: z.string({ required_error: "El pellido es requerido." }).optional(),
  // Validate email
  email: z
    .string({ required_error: "El email es requerido." })
    .email({
      message: "Ingrese un email valido, ejm: user@gmail.com",
    })
    .optional(),

  // Validate phone number
  password: z.string().optional(),
  phone_numbers: z.array(userPhoneNumberEditSchema).optional(),
  addresses: z.array(z.any()).optional(),
});
