import jwt from "jsonwebtoken";
import { TOKEN_SECRETO } from "../config.js";

export const autentacionRequerida = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json(["No hay token" ]);

  jwt.verify(token, TOKEN_SECRETO, (err, user) => {
    if (err) return res.status(401).json(["Token no valido"]);

    req.user = user;

    next();
  });
};
