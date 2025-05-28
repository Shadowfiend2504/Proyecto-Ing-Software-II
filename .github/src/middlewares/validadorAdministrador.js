import Usuario from "../models/usuario.model.js";

export const esAdministrador = async (req, res, next) => {
    
  const usuarioEncontrado = await Usuario.findById(req.user.id);

  if (!usuarioEncontrado) {
    return res.status(401).json(["Usuario no autenticado" ]);
  }

  if (!usuarioEncontrado.esAdministrador) {
    return res
      .status(403)
      .json(["Acceso denegado. Se requiere rol de administrador."]);
  }

  next();
};
