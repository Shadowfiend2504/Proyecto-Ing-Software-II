import axios from "./axios";

export const peticionRegistro = (usuario) => axios.post(`/registro`, usuario);

export const peticionIniciarSesion = (usuario) => axios.post(`/iniciar-sesion`, usuario)

export const verificarPeticionToken = () => axios.get("/verificar")