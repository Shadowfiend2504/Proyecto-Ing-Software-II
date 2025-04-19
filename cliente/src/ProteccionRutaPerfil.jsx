import { Navigate, Outlet } from "react-router-dom";
import { usoAutenticacion } from "./context/ContextoAutenticacion";

function ProteccionRutaPerfil() {
  const {usuario } = usoAutenticacion();


  if (usuario.esAdministrador) return <Navigate to="/registro" replace />;
  return <Outlet />;
}

export default ProteccionRutaPerfil;