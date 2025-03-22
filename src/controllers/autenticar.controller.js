import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import { crearTokenAcceso } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRETO } from "../config.js";
import { esAdministrador } from "../middlewares/validadorAdministrador.js";

export const registro = async (req, res) => {
  const {
    nombre,
    direccionResidencia,
    eps,
    cedula,
    numeroContacto,
    esEstudiante,
    usuario,
    clave,
    correo,
  } = req.body;

  try {
    const usuarioEncontrado = await Usuario.findOne({ usuario });
    if (usuarioEncontrado)
      return res.status(400).json(["El usuario ya está en uso"]);

    const correoEncontrado = await Usuario.findOne({ correo });
    if (correoEncontrado)
      return res.status(400).json(["El correo ya está en uso"]);

    const cedulaEncontrada = await Usuario.findOne({ cedula });
    if (cedulaEncontrada)
      return res.status(400).json(["La cedula ya está en uso"]);

    const numeroContactoEncontrado = await Usuario.findOne({ numeroContacto });
    if (numeroContactoEncontrado)
      return res.status(400).json(["El numero de contacto ya está en uso"]);

    const claveHash = await bcrypt.hash(clave, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      direccionResidencia,
      eps,
      cedula,
      numeroContacto,
      esEstudiante,
      usuario,
      correo,
      esAdministrador: false,
      clave: claveHash,
    });

    await nuevoUsuario.save();

  } catch (error) {
    res.status(500).json(["Error interno del servidor: " + error.message]);
  }
};

export const iniciarSesion = async (req, res) => {
  const { clave, usuario } = req.body;

  try {
    const usuarioEncontrado = await Usuario.findOne({ usuario });

    if (!usuarioEncontrado)
      return res.status(400).json(["Usuario o Clave incorrecta"]);

    const claveCoincide = await bcrypt.compare(clave, usuarioEncontrado.clave);

    if (!claveCoincide)
      return res.status(400).json(["Usuario o Clave incorrecta"]);

    const token = await crearTokenAcceso({ id: usuarioEncontrado._id });

    res.cookie("token", token);
    res.json({
      id: usuarioEncontrado._id,
      nombre: usuarioEncontrado.nombre,
      usuario: usuarioEncontrado.usuario,
      correo: usuarioEncontrado.correo,
      esAdministrador: usuarioEncontrado.esAdministrador,
      createdAt: usuarioEncontrado.createdAt,
      updatedAt: usuarioEncontrado.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cerrarSesion = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const usuarioEncontrado = await Usuario.findById(req.user.id);

  if (!usuarioEncontrado)
    return res.status(400).json({ message: "Usuario no encontrado" });

  return res.json({
    id: usuarioEncontrado._id,
    nombre: usuarioEncontrado.nombre,
    correo: usuarioEncontrado.correo,
    esAdministrador: usuarioEncontrado.esAdministrador,
    createdAt: usuarioEncontrado.createdAt,
    updatedAt: usuarioEncontrado.updatedAt,
  });
};

export const verificarToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json(["No autorizado"]);

  jwt.verify(token, TOKEN_SECRETO, async (err, usuario) => {
    if (err) return res.status(401).json(["No autorizado"]);

    const usuarioEncontrado = await Usuario.findById(usuario.id);
    if (!usuarioEncontrado) return res.status(401).json(["No autorizado"]);

    return res.json({
      id: usuarioEncontrado._id,
      esAdministrador: usuarioEncontrado.esAdministrador,
      nombre: usuarioEncontrado.nombre,
      usuario: usuarioEncontrado.usuario,
      correo: usuarioEncontrado.correo,
    });
  });
};
