import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from "../../../schemas/validations/loginSchema";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { EditUserType } from "../../../types/user";
import { updateUser } from "../../../services/user";
import { useEffect } from "react";

export default function EditName() {
  const { user, addUser } = useAuth();
  const navigateTo = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditUserType>({
    resolver: zodResolver(editProfileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({ email: user.email });
    }
  }, [user, reset]);

  const onSubmit = async (data: EditUserType) => {
    try {
      const myUser = await updateUser({ id: user.id, newData: data });
      if (myUser === undefined) {
        toast.error("Datos no actualizado.", {
          duration: 5000,
        });
      } else {
        const userData = {
          ...user,
          ...myUser,
        };
        addUser(userData);
        toast.success(`Datos actualizados correctamente ${myUser.email}.`, {
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
        navigateTo("/profile/login-segurity");
      }
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      toast.error(
        "Error al actualizar los datos. Por favor, inténtalo de nuevo más tarde.",
        {
          duration: 5000,
        }
      );
    }
  };

  return (
    <div className="flex items-center justify-center w-full my-20 px-[6rem] md:px-[2rem] sm:px-[2rem] title">
      <div className="flex flex-col items-start justify-start">
        <div className="w-[600px] md:w-full sm:w-full border-2 border-gray-100 rounded-md shadow-xl text-[14px] p-4">
          <p className="text-black text-[28px] text-start mb-6">
            Cambia tu dirección de correo electronico
          </p>
          <p>
            Dirección de correo electrónico actual: chrisdspain371@gmail.com
          </p>
          <p>
            Ingrese la nueva dirección de correo electrónico que desea asociar
            con su cuenta a continuación.{" "}
          </p>
          <form
            className="flex flex-col items-start my-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="font-semibold" htmlFor="email">
              Nueva dirección de correo electrónico
            </label>
            <input
              className="w-full p-2 text-gray-700 border-2 rounded-sm outline-none boder-gray-700 placeholder:text-gray-700"
              type="email"
              id="email"
              {...register("email")}
              placeholder="Introduce tu nuevo nombre"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email?.message && (
              <p className="text-[12px] text-[#ff2d2d]">
                {errors.email.message}
              </p>
            )}
            <div className="space-x-2 felx">
              <button
                type="submit"
                className="text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md py-1 px-3 mt-4"
              >
                Guardar cambios
              </button>
              <button
                className="text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md py-1 px-3 mt-4"
                type="button"
                onClick={() => navigateTo("/profile/login-segurity")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
