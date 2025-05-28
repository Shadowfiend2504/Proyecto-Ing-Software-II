import { TOKEN_SECRETO } from "../config.js";
import jwt from 'jsonwebtoken'

export function crearTokenAcceso(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRETO, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
