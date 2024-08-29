import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordEditSchema } from "../../../schemas/validations/loginSchema";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { EditPasswordType } from "../../../types/user";
import { UpdateUserPassword } from "../../../services/user";
import { useState } from "react";

export default function EditPassword() {
  const { user, addUser } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigateTo = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPasswordType>({
    resolver: zodResolver(passwordEditSchema),
  });

  const onSubmit = async (data: EditPasswordType) => {
    try {
      if (data.new_password === data.validate_password) {
        const myUser = await UpdateUserPassword({
          passwordData: {
            user_id: user.id,
            current_password: data.current_password,
            new_password: data.new_password,
          },
        });
        if (myUser === undefined) {
          toast.error("The current password is not correct.", {
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
      } else {
        console.error(
          "you need to validate the new password writing the same password"
        );
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
        <div className="w-[380px] md:w-full sm:w-full border-2 border-gray-100 rounded-md shadow-xl text-[14px] p-4 space-y-4">
          <p className="text-black text-[28px] text-start mb-6">
            Cambia tu contraseña
          </p>
          <p>
            Para cambiar la contraseña de tu cuenta complete el siguiente
            forulario
          </p>
          <form
            className="flex flex-col items-start w-full my-2 space-y-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full">
              <label className="font-semibold" htmlFor="current_password">
                Contraseña actual
              </label>
              <input
                className="w-full p-1 border border-gray-300 rounded-sm outline-none"
                type={showPassword === true ? "text" : "password"}
                id="current_password"
                {...register("current_password")}
                placeholder="Introduce tu contraseña actual"
                aria-invalid={errors.current_password ? "true" : "false"}
              />
              {errors.current_password?.message && (
                <p className="text-[12px] text-[#ff2d2d]">
                  {errors.current_password.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="font-semibold" htmlFor="new_password">
                Nueva contraseña
              </label>
              <input
                className="w-full p-1 border border-gray-300 rounded-sm outline-none"
                type={showPassword === true ? "text" : "password"}
                id="new_password"
                {...register("new_password")}
                placeholder="Introduce tu nueva contraseña"
                aria-invalid={errors.new_password ? "true" : "false"}
              />
              {errors.new_password?.message && (
                <p className="text-[12px] text-[#ff2d2d]">
                  {errors.new_password.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="font-semibold" htmlFor="validate_password">
                Vuelve a escribir la contraseña
              </label>
              <input
                className="w-full p-1 border border-gray-300 rounded-sm outline-none"
                type={showPassword === true ? "text" : "password"}
                id="validate_password"
                {...register("validate_password")}
                placeholder="Introduce nuevamente tu nueva contraseña"
                aria-invalid={errors.validate_password ? "true" : "false"}
              />
              {errors.validate_password?.message && (
                <p className="text-[12px] text-[#ff2d2d]">
                  {errors.validate_password.message}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <input
                onChange={(e) => setShowPassword(e.target.checked)}
                type="checkbox"
                name=""
                id=""
              />
              <p>Mostrar contraseñas</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md py-1 px-3 mt-4">
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
