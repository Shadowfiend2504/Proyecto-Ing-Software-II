import { Navigate, Outlet } from "react-router-dom";
import { usoAutenticacion } from "./context/ContextoAutenticacion";

function RutasProtegidas() {
  const { cargando, estaAutenticado } = usoAutenticacion();

    if(cargando) return <h1>
        Cargando...
    </h1>

  if (!cargando && !estaAutenticado) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default RutasProtegidas;
