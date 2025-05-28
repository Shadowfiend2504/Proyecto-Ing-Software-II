import bcrypt from "bcryptjs";
import Usuario from "./models/usuario.model.js";

export const hayAdministrador = async () => {
  const adminEncontrado = await Usuario.findOne({ esAdministrador: true });
  if (adminEncontrado) return;

  const claveHash = await bcrypt.hash("admin", 10);

  const nuevoAdmin = new Usuario({
    nombres: "-",
    apellidos: "-",
    direccionResidencia: "-",
    eps: "-",
    cedula: 0,
    numeroContacto: 0,
    esEstudiante: false,
    usuario: "admin",
    correo: "-",
    esAdministrador: true,
    clave: claveHash,
  });

  await nuevoAdmin.save();
  console.log("Administrador por defecto creado");
};
