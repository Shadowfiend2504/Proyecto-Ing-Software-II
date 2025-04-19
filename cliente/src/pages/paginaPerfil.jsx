import { usoAutenticacion } from "../context/ContextoAutenticacion";

function paginaPerfil() {
  const { usuario } = usoAutenticacion();
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-18">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
        Bienvenido { usuario.nombres + " " + usuario.apellidos}
      </h1>
      
    
    </div>
  );
}

export default paginaPerfil;
