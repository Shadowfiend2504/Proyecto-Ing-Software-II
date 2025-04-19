import { Navigate, Outlet } from "react-router-dom";
import { usoAutenticacion } from "./context/ContextoAutenticacion";

function ProteccionRutaRegistro() {
  const { usuario } = usoAutenticacion();

  if (!usuario.esAdministrador)
    return <Navigate to="/perfil" replace />;
  return <Outlet />;
}

export default ProteccionRutaRegistro;
