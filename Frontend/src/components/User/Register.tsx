import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../schemas/validations/userSchema";
import { CreateAcount, LoginUser } from "../../services/user";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { RegisterType } from "../../types/user";
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(userSchema),
  });
  const { addUser } = useAuth();
  const navigateTo = useNavigate();

  const onSubmit = async (data: RegisterType) => {
    const user = await CreateAcount({ user: data });
    if (user === undefined) {
      toast.error(`El email ya está asociado a otra cuenta.`, {
        duration: 4000,
      });
    } else {
      const myUser = await LoginUser({
        login: { email: user.email, password: data.password },
      });
      addUser(myUser[0]);
      toast.success(`Usuario creado exitosamente. Bienvenido/a`, {
        duration: 4000,
        style: {
          background: "#7DA640",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#000",
        },
      });
      navigateTo("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full my-[3rem]">
      <div className="flex flex-col items-center justify-start p-8 text-white bg-white rounded-md shadow-2xl">
        <div className="flex items-center justify-start mb-2">
          <div className="flex flex-col items-start justify-center mx-2">
            <p className="text-black text-[28px]  title">EcomTrend</p>
          </div>
        </div>
        <form
          className="w-full flex justify-center my-4 form text-[14px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-[320px] flex flex-col items-center justify-start space-y-6">
            <div className="relative w-full">
              <input
                className="w-full p-2 text-gray-700 border-2 border-gray-200 rounded-md outline-none placeholder:text-gray-700"
                type="text"
                {...register("name")}
                placeholder="Introduce tu nombre"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-[12px] absolute text-[#ff2d2d]">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="relative w-full">
              <input
                className="w-full p-2 text-gray-700 border-2 border-gray-200 rounded-md outline-none placeholder:text-gray-700"
                type="text"
                {...register("surname")}
                placeholder="Introduce tu apellido"
                aria-invalid={!!errors.surname}
              />
              {errors.surname && (
                <p className="text-[12px] absolute text-[#ff2d2d]">
                  {errors.surname.message}
                </p>
              )}
            </div>
            <div className="relative w-full">
              <input
                className="w-full p-2 text-gray-700 border-2 border-gray-200 rounded-md outline-none placeholder:text-gray-700"
                type="email"
                {...register("email")}
                placeholder="Introduce tu correo electrónico"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-[12px] absolute text-[#ff2d2d]">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative w-full">
              <input
                className="w-full p-2 text-gray-700 border-2 border-gray-200 rounded-md outline-none placeholder:text-gray-700"
                type="password"
                {...register("password")}
                placeholder="Introduce tu contraseña"
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className="text-[12px] absolute text-[#ff2d2d]">
                  {errors.password.message}
                </p>
              )}
            </div>
            <p className="text-[12px] text-[#2d2d2d] pt-4">
              Al registrarme, acepto las Condiciones del servicio de Atlassian
              Cloud y su Política de privacidad.
            </p>
            <button className="py-2 px-3 font-bold text-center text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md w-full">
              Registrarse
            </button>
            <Link
              to="/login"
              className="text-[#4572b4] hover:border-b border-[#4572b4]"
            >
              ¿Ya tienes una cuenta de EcomTren? Iniciar sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
