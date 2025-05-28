import { Router } from "express";
import {
  registro,
  iniciarSesion,
  cerrarSesion,
  profile,
  verificarToken,
  //2. agregamos esto para la restablecer contraseña
  restablecerContrasena,
} from "../controllers/autenticar.controller.js";
import { autentacionRequerida } from "../middlewares/validadorToken.js";
import { esAdministrador } from "../middlewares/validadorAdministrador.js";
const router = Router();
import { validadorEsquema } from "../middlewares/validador.middleware.js";
import {
  esquemaInicioSesion,
  esquemaRegistro,
  //2. Agregando el esquema para la Restablecer de contraseña
  esquemaRestablecerContraseña,
} from "../schemas/autenticar.schema.js";

router.post(
  "/registro",
  autentacionRequerida,
  esAdministrador,
  validadorEsquema(esquemaRegistro),
  registro
);

router.post(
  "/iniciar-sesion",
  validadorEsquema(esquemaInicioSesion),
  iniciarSesion
);

//2. Esta ruta es para restablecer la contraseña
router.post(
  "/restablecer-contrasena",
  validadorEsquema(esquemaRestablecerContraseña),
  restablecerContrasena
);

router.post("/cerrar-sesion", cerrarSesion);

router.get("/verificar", verificarToken);

router.get("/perfil", autentacionRequerida, profile);

export default router;
