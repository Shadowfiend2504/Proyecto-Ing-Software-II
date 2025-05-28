import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // importar useNavigate para redireccionar 
import { usoAutenticacion } from "../context/ContextoAutenticacion";

function PaginaInicioSesion() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { iniciarSesion, errores } = usoAutenticacion();
  const navigate = useNavigate(); // usar useNavigate para redireccionar a otra página

  const onSubmit = handleSubmit(async (data) => {
    data.usuario = data.usuario.toLowerCase();
    await iniciarSesion(data);
  });

  return (
    <div className="flex h-full items-center justify-center">
      <div className="bg-[rgba(231,231,231,0.9)] max-w-sm w-85 p-7 rounded-3xl border-2">
        {Array.isArray(errores) &&
          errores.map((error, i) => (
            <div
              className="text-red-500 text-center rounded-md my-2 font-bold"
              key={i}
            >
              {error}
            </div>
          ))}
        <h1 className="text-2xl text-center text-black mb-4 font-bold">
          Inicio de sesión
        </h1>

        <form onSubmit={onSubmit}>
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                {...register("usuario", { required: true })}
                className="border-2 text-black py-2 rounded-md my-2 text-center w-60 ml-5"
                placeholder="Usuario"
              />
              <img
                src="/imgUsuarioInicioSesion.svg"
                alt="Imagen usuario"
                className="absolute left-6 top-1/2 transform -translate-y-1/2 h-12 w-12 "
              />
            </div>
            {errors.usuario && (
              <p className="text-red-500 text-sm">El usuario es requerido</p>
            )}
            <div className="relative w-full max-w-xs">
              <input
                type="password"
                {...register("clave", { required: true })}
                className="border-2 text-black py-2 rounded-md my-2 text-center w-60 ml-5"
                placeholder="Clave"
              />
              <img
                src="/imgClaveInicioSesion.svg"
                alt="Imagen clave"
                className="absolute left-8.5 top-1/2 transform -translate-y-1/2 h-6 w-6"
              />
            </div>
            {errors.clave && (
              <p className="text-red-500 text-sm">La clave es requerida</p>
            )}

            <button
              type="submit"
              className="bg-[#8b8a8a] text-black rounded-md my-4 py-2 px-4 w-35 cursor-pointer"
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              className="bg-[#8b8a8a] text-black rounded-md my-4 py-2 px-4 w-35 cursor-pointer"
              onClick={() => navigate("/restablecer-contrasena")}
            >
              Restablecer Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaginaInicioSesion;
