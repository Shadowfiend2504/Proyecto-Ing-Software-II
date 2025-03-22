import { z } from "zod";

export const esquemaRegistro = z.object({
  nombre: z.string({
    required_error: "El nombre es requerido",
  }),
  correo: z
    .string({
      required_error: "El correo es requerido",
    })
    .email({
      message: "No es un correo valido",
    }),
  cedula: z
    .number({
      required_error: "La cedula es requerida",
    })
    .gte(1, {
      message: "Numero de cedula no valida",
    })
    .lte(9999999999, {
      message: "Numero de cedula no valida",
    }),
  numeroContacto: z
    .number({
      required_error: "El numero de contacto es requerido",
    })
    .gte(1000000000, {
      message: "Numero de contacto no valido",
    })
    .lte(9999999999, {
      message: "Numero de contacto no valido",
    }),
  usuario: z.string({
    required_error: "El usuario es requerido",
  }),
  clave: z
    .string({
      required_error: "La clave es requerido",
    })
    .min(6, {
      message: "La clave debe ser mayor a 6 caracteres",
    }),
  eps: z.string({
    required_error: "La eps es requerido",
  }),
  direccionResidencia: z.string({
    required_error: "La direccion es requerido",
  }),
  esEstudiante: z.boolean({
    required_error: "El rol es requerido",
  }),
});

export const esquemaInicioSesion = z.object({
  usuario: z.string({
    required_error: "El usuario es requerido",
  }),
  clave: z.string({
    required_error: "La clave es requerida",
  }),
});
