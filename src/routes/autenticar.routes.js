import { Router } from "express";
import {
  registro,
  iniciarSesion,
  cerrarSesion,
  profile,
  verificarToken,
} from "../controllers/autenticar.controller.js";
import { autentacionRequerida } from "../middlewares/validadorToken.js";
import { esAdministrador } from "../middlewares/validadorAdministrador.js";
const router = Router();
import { validadorEsquema } from "../middlewares/validador.middleware.js";
import {
  esquemaInicioSesion,
  esquemaRegistro,
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

router.post("/cerrar-sesion", cerrarSesion);

router.get("/verificar", verificarToken);

router.get("/perfil", autentacionRequerida, profile);

export default router;
