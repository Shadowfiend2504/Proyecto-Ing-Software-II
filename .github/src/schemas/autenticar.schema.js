import { z } from "zod";

export const esquemaRegistro = z.object({
  nombres: z.string({
    required_error: "Los nombres son requeridos",
  }),
  apellidos: z.string({
    required_error: "Los apellidos son requeridos",
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

//3. Agregando el esquema para la Restablecer de contraseña
// Esta se relaciona con Routes
export const esquemaRestablecerContraseña = z.object({
  usuario: z.string({
    required_error: "El usuario es requerido",
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
});
