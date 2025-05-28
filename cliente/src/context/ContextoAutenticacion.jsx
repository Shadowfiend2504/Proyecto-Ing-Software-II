import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

import {
  peticionRegistro,
  peticionIniciarSesion,
  verificarPeticionToken,
  //7. Agregamos esta importacion para la funcion de restablecer contraseña
  // Esta funcion es para verificar si el token es valido y si el usuario existe PARA el restablecimiento de contraseña
  peticionRestablecerContrasena,
} from "../api/autenticar";
import Cookies from "js-cookie";

export const ContextoAutenticacion = createContext();

export const usoAutenticacion = () => {
  const contexto = useContext(ContextoAutenticacion);
  if (!contexto) {
    throw new Error("usoAutenticacion debe estar en un ProveedorAutenticacion");
  }
  return contexto;
};

export const ProveedorAutenticacion = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(true);

  const registrarse = async (usuario) => {
    try {
      const res = await peticionRegistro(usuario);
      toast.dismiss();
      res.data.forEach((mensaje) =>
        toast.success(mensaje, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
    } catch (error) {
      console.log(error);
      setErrores(error.response.data);
    }
  };

  const iniciarSesion = async (usuario) => {
    try {
      const res = await peticionIniciarSesion(usuario);
      setEstaAutenticado(true);
      setUsuario(res.data);
    } catch (error) {
      setErrores(error.response.data);
    }
  };

  const cerrarSesion = () => {
    Cookies.remove("token");
    setEstaAutenticado(false);
    setUsuario(null);
  };


  //crear funcion para hacer peticion para restablecer contraseña al back

  // Esto conecta con el front, recibe datos y los manda al back a controler.js
  const restablecerContrasena = async (usuario) => {
    try {
      const res = await peticionRestablecerContrasena(usuario);
      toast.dismiss();
      res.data.forEach((mensaje) => 
        toast.success(mensaje, {
          position: "top-right",
          autoClose: 5000,  // Se cierra automáticamente después de 5s
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        })
      );
    } catch (error) {
      setErrores(error.response.data);
    }
  };


  useEffect(() => {
    if (errores.length > 0) {
      const timer = setTimeout(() => {
        setErrores([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errores]);

  useEffect(() => {
    async function verificarLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setEstaAutenticado(false);
        setCargando(false);
        return setUsuario(null);
      }

      try {
        const res = await verificarPeticionToken(cookies.token);
        if (!res.data) {
          setEstaAutenticado(false);
          setCargando(false);
          return;
        }

        setEstaAutenticado(true);
        setUsuario(res.data);

        setCargando(false);
      } catch (error) {
        setEstaAutenticado(false);
        setUsuario(null);
        setCargando(false);
      }
    }
    verificarLogin();
  }, []);

  return (
    <ContextoAutenticacion.Provider
      value={{
        registrarse,
        iniciarSesion,
        cerrarSesion,
        //expotar funcion para restablecer contraseña
        restablecerContrasena,
        cargando,
        usuario,
        estaAutenticado,
        errores,
      }}
    >
      {cargando ? <p>Cargando...</p> : children}
    </ContextoAutenticacion.Provider>
  );
};
