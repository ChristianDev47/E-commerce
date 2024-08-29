import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/validations/loginSchema";
import { LoginUser } from "../../services/user";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { LoginType } from "../../types/user";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });
  const { addUser } = useAuth();
  const navigateTo = useNavigate();

  const onSubmit = async (data: LoginType) => {
    try {
      const user = await LoginUser({ login: data });
      if (user === undefined) {
        toast.error("Email o contraseña incorrectos.", {
          duration: 5000,
        });
      } else {
        addUser(user[0]);
        toast.success(`Sesión iniciada. Bienvenido/a.`, {
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
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error(
        "Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.",
        {
          duration: 5000,
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-[6rem] px-[2rem]">
      <div className="flex flex-col items-center justify-start p-8 text-white bg-white rounded-md shadow-2xl sm:w-full">
        <div className="flex items-center justify-start mb-2">
          <div className="flex flex-col items-start justify-center mx-2">
            <p className="text-black text-[28px]  title">EcomTrend</p>
          </div>
        </div>
        <form
          className="w-full flex justify-center my-4 form text-[14px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-[320px] sm:w-full flex flex-col items-center justify-start space-y-6">
            <div className="relative w-full">
              <input
                className="w-full p-2 text-gray-700 border-2 rounded-md outline-none boder-gray-700 placeholder:text-gray-700"
                type="email"
                {...register("email")}
                placeholder="Introduce tu correo electrónico"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email?.message && (
                <p className="text-[12px] absolute text-[#ff2d2d]">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative w-full">
              <input
                className="w-full p-2 text-gray-700 border-2 rounded-md outline-none boder-gray-700 placeholder:text-gray-700"
                type="password"
                {...register("password")}
                placeholder="Introduce tu contraseña"
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password?.message && (
                <p className="text-[12px] absolute text-[#ff2d2d]">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button className="py-2 px-3 font-bold text-center text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md w-full">
              Continuar
            </button>
            <Link
              to="/register"
              className="text-[#4572b4] hover:border-b border-[#4572b4]"
            >
              Crear una cuenta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
