import { Navigate, Outlet } from "react-router-dom";
import { usoAutenticacion } from "./context/ContextoAutenticacion";

function ProteccionRutaIniciarSesion() {
  const { estaAutenticado } = usoAutenticacion();

  if (estaAutenticado) return <Navigate to="/perfil" replace />;
  return <Outlet />;
}

export default ProteccionRutaIniciarSesion;
