import axios from "./axios";

export const peticionRegistro = (usuario) => axios.post(`/registro`, usuario);

export const peticionIniciarSesion = (usuario) => axios.post(`/iniciar-sesion`, usuario)

export const verificarPeticionToken = () => axios.get("/verificar")

//6. Esta funcion es para verificar si el token es valido y si el usuario existe PARA el restablecimiento de contraseña
export const peticionRestablecerContrasena = (usuario) => axios.post(`/restablecer-contrasena`, usuario)