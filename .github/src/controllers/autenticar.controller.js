import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import { crearTokenAcceso } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRETO } from "../config.js";

//esto es para crear el usuario y guardarlo en la base de datos
// se hace la validacion de la cedula y el usuario, si no existe se crea el usuario
// se crea el usuario y se guarda en la base de datos

export const registro = async (req, res) => {
  const {
    nombres,
    apellidos,
    direccionResidencia,
    eps,
    cedula,
    numeroContacto,
    esEstudiante,
  } = req.body;

  try {
    const cedulaEncontrada = await Usuario.findOne({ cedula });
    if (cedulaEncontrada)
      return res.status(400).json(["La cedula ya está en uso"]);

    let usuarioDisponible = false;
    let iterador = 1;
    let usuario = "";
    let letrasObtenidas = 1;
    const maxIntentos = 100;
    const maxLetras = nombres.split(" ", 1)[0].length;

    do {
      if (iterador >= maxIntentos) {
        iterador = 1;
        letrasObtenidas += 1;
      }

      if (letrasObtenidas > maxLetras) break;

      usuario =
        nombres.slice(0, letrasObtenidas) +
        apellidos.split(" ", 1)[0] +
        iterador;

      usuario = usuario
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      const usuarioEncontrado = await Usuario.findOne({ usuario });

      if (!usuarioEncontrado) {
        usuarioDisponible = true;
      } else {
        iterador += 1;
      }
    } while (!usuarioDisponible);

    if (!usuarioDisponible)
      return res.status(400).json(["No se pudo crear el usuario"]);

    const correo = usuario + "@proyecto.uan.com";

    //si valida que todo esta bien que lo encrypte y lo guarde en la base de datos
    //se encripta la clave con bcryptjs, se le pasa la cedula como clave y se le da un salt de 10

    const claveHash = await bcrypt.hash(String(cedula), 10);

    const nuevoUsuario = new Usuario({
      nombres,
      apellidos,
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
    const mensajeUsuario = "Usuario: " + usuario;
    const mensajeCorreo = "Correo: " + correo;
    res
      .status(201)
      .json(["Usuario registrado con éxito", mensajeUsuario, mensajeCorreo]);
  } catch (error) {
    res.status(500).json(["Error interno del servidor: " + error.message]);
  }
};

export const iniciarSesion = async (req, res) => {
  const { usuario, clave } = req.body;

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
      nombres: usuarioEncontrado.nombres,
      apellidos: usuarioEncontrado.apellidos,
      usuario: usuarioEncontrado.usuario,
      correo: usuarioEncontrado.correo,
      esAdministrador: usuarioEncontrado.esAdministrador,
      createdAt: usuarioEncontrado.createdAt,
      updatedAt: usuarioEncontrado.updatedAt,
    });
  } catch (error) {
    console.log(error.message)
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
    nombres: usuarioEncontrado.nombres,
    apellidos: usuarioEncontrado.apellidos,
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
      nombres: usuarioEncontrado.nombres,
      apellidos: usuarioEncontrado.apellidos,
      usuario: usuarioEncontrado.usuario,
      correo: usuarioEncontrado.correo,
    });
  });
};



// Esta funcion es para verificar si el token es valido y si el usuario existe PARA el restablecimiento de contraseña
// Aca valida directamente los datos con lo que hay en back 
// en contraseas validar si los camposson iguals si si mandar a la DB el nuevo valor


//5. Agrego la validacion para cambiar la contraseña



export const restablecerContrasena = async (req, res) => {
  const {
    usuario,
    cedula,
    nuevaContrasena

  } = req.body;

  try {
    const usuarioEncontrado = await Usuario.findOne({ usuario, cedula });

    if (!usuarioEncontrado) return res.status(400).json(["Usuario no encontrado o cedula incorrecta"]);
    
 
    const claveHash = await bcrypt.hash(String(nuevaContrasena), 10);
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      usuarioEncontrado._id,
      { clave: claveHash },
      { new: true }
    );
    if (!usuarioActualizado) return res.status(400).json(["Error al actualizar la contraseña"]);

    res.status(200).json(["Contraseña actualizada con éxito"]);


  }catch (error) {
    res.status(500).json(["Error interno del servidor: " + error.message]);
  }
};  
