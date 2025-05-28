import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProveedorAutenticacion } from "./context/ContextoAutenticacion";
import PaginaInicioSesion from "./pages/PaginaInicioSesion";
import PaginaRegistro from "./pages/PaginaRegistro";
import PaginaPerfil from "./pages/paginaPerfil";
//4.Agregre esta linea para que haya pagina vivisble de recuperacion
import PaginaRestablecerContrasena from "./pages/PaginaRestablecerContrasena";

import RutasProtegidas from "./RutasProtegidas";
import ProteccionRutaRegistro from "./ProteccionRutaRegistro";
import ProteccionRutaIniciarSesion from "./ProteccionRutaIniciar-Sesion";
import ProteccionRutaPerfil from "./ProteccionRutaPerfil";
import Navegacion from "./layouts/Navegacion";
import fondo from '/imagenFondoInicioSesion.png'

//Agregamos esta proteccion para la ruta de restablecer contraseña
//import ProteccionRutaRestablecerContrasena from "./ProteccionRutaRestablecerContrasena";
function App() {
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" 
    style={{ backgroundImage: `url(${fondo})` }}>
      <ProveedorAutenticacion>
        <BrowserRouter>
          <Navegacion />
          <Routes>
            {/* se agrega aca, para que solo se puede acceder si no se ha inicado sesion*/}
            <Route element={<ProteccionRutaIniciarSesion />}>
              <Route path="/" element={<PaginaInicioSesion />} />
              {/*Agrego mi ruta de cambio de contrasena*/}
              <Route path="/restablecer-contrasena" element={<PaginaRestablecerContrasena />} />
            </Route>

            {/* Esta es la cosa para agregar paginas protegiendo y forzando estar logeado para ver */}
            <Route element={<RutasProtegidas />}>
              <Route element={<ProteccionRutaRegistro />}>
                <Route path="/registro" element={<PaginaRegistro />} />
              </Route>
              <Route element={<ProteccionRutaPerfil />}>
                <Route path="/perfil" element={<PaginaPerfil />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ProveedorAutenticacion>
    </div>
  );
}

export default App;
