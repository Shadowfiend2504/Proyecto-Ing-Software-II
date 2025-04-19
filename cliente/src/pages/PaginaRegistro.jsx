import { useForm } from "react-hook-form";
import { usoAutenticacion } from "../context/ContextoAutenticacion";
import { ToastContainer } from "react-toastify";

function PaginaRegistro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registrarse, errores } = usoAutenticacion();

  const onSubmit = handleSubmit(async (values) => {
    values.numeroContacto = Number(values.numeroContacto);
    values.cedula = Number(values.cedula);
    values.esEstudiante = values.esEstudiante === "true";
    await registrarse(values);
  });

  return (
    <div className="flex h-full items-center justify-center my-16">
      <div className="bg-[rgba(231,231,231,0.9)] max-w-md w-90 pt-5 rounded-4xl border-2 mt-10 xl:mt-12.5">
        {errores.map((error, i) => (
          <div className="p-2 text-red-500 text-center rounded-md my-2" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold text-center ">
          Registrar nueva cuenta
        </h1>
        <form
          className="grid grid-cols-2 gap-4 p-6 max-w-lg mx-auto"
          onSubmit={onSubmit}
        >
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <input
              type="text"
              {...register("nombres", { required: true })}
              className="w-full text-black border-2 px-4 py-2 rounded-md my-2"
              placeholder="Nombres"
            />
            <input
              type="text"
              {...register("apellidos", { required: true })}
              className="w-full text-black border-2 px-4 py-2 rounded-md my-2"
              placeholder="Apellidos"
            />
            {errors.nombres && (
              <p className="text-red-500">Nombres requeridos</p>
            )}
            {errors.apellidos && (
              <p className="text-red-500 col-start-2">Apellidos requeridos</p>
            )}
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-4">
            <input
              type="number"
              {...register("cedula", { required: true })}
              className="[&::-webkit-inner-spin-button]:appearance-none w-full text-black border-2 px-4 py-2 rounded-md my-2"
              placeholder="Cedula"
            />
            <input
              type="number"
              {...register("numeroContacto", { required: true })}
              className="[&::-webkit-inner-spin-button]:appearance-none w-full text-black border-2 px-4 py-2 rounded-md my-2"
              placeholder="Telefono"
            />
            {errors.cedula && <p className="text-red-500">Cedula requerida</p>}
            {errors.numeroContacto && (
              <p className="text-red-500 col-start-2">Telefono requerido</p>
            )}
          </div>

          <input
            type="text"
            {...register("eps", { required: true })}
            className="w-full text-black border-2 px-4 py-2 rounded-md my-2"
            placeholder="EPS"
          />
          <select
            {...register("esEstudiante", { required: true })}
            className="w-full text-black border-2 px-4 py-2 rounded-md my-2"
          >
            <option value="true">Estudiante</option>
            <option value="false">Maestro</option>
          </select>
          {errors.eps && <p className="text-red-500">La eps es requerida</p>}
          {errors.esEstudiante && (
            <p className="text-red-500">Selecciona un rol</p>
          )}
          <input
            type="text"
            {...register("direccionResidencia", { required: true })}
            className="w-full text-black border-2 px-4 py-2 rounded-md my-2 col-span-2"
            placeholder="Dirección De Residencia"
          />
          {errors.direccionResidencia && (
            <p className="text-red-500 col-span-2">
              La direccion de residencia es requerida
            </p>
          )}

          <div className="col-span-2 flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#8b8a8a] rounded-md my-2 py-2 px-4 cursor-pointer"
            >
              Crear cuenta
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaginaRegistro;
