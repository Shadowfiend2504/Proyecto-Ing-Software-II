import { Link, useNavigate } from "react-router-dom";
import { usoAutenticacion } from "../context/ContextoAutenticacion";

function Navegacion() {
    const navigate = useNavigate();
    const { estaAutenticado, cerrarSesion } = usoAutenticacion();
    return (
      <div className="fixed top-0 w-full z-50 bg-[#e7e7e7] text-center text-black p-2 border-b-2 grid grid-cols-4 gap-4 text-2xl sm:text-4xl sm:grid-cols-6 xl:grid-cols-8">
        <span className="flex justify-center items-center">
          <img
            src="/logo.svg"
            alt="LogoProyecto"
            className="h-10 cursor-pointer xl:h-12.5"
            onClick={() => navigate("/")}
          />
        </span>
        <h1
          className="font-bold col-span-2 flex justify-center items-center
        sm:col-span-4 xl:col-span-6"
        >
          Proyecto UAN
        </h1>
        <ul className="flex justify-center items-center">
          {estaAutenticado ? (
            <div
              className="bg-[#8b8a8a] rounded-md px-4 py-1 text-sm sm:text-xl sm:px-5 sm:py-1 border-1 cursor-pointer"
              onClick={cerrarSesion}
            >
              <Link to="/">Salir</Link>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <img
                src="/logo.svg"
                alt="LogoProyecto"
                className="h-10 cursor-pointer xl:h-12.5"
                onClick={() => navigate("/")}
              />
            </div>
          )}
        </ul>
      </div>
    );
}

export default Navegacion
