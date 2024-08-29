import { useEffect, useState } from "react";
import { countryCode } from "../../../types/contryCodes";
import { CountryCodes } from "../../../services/contryCodes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { userPhoneNumberEditSchema } from "../../../schemas/validations/loginSchema";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { UserPhoneNumberEdit } from "../../../types/user";
import { CreateAccountPhoneNumber } from "../../../services/user";

export default function EditPhoneNumber() {
  const [codes, setCodes] = useState<countryCode[]>();
  const { user, addUser } = useAuth();
  const navigateTo = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserPhoneNumberEdit>({
    resolver: zodResolver(userPhoneNumberEditSchema),
  });

  useEffect(() => {
    const getCodes = async () => {
      const data = await CountryCodes();
      setCodes(
        data.sort((a: countryCode, b: countryCode) =>
          a.name.common.localeCompare(b.name.common)
        )
      );
    };
    getCodes();
  }, []);

  const onSubmit = async (data: UserPhoneNumberEdit) => {
    try {
      const myUser = await CreateAccountPhoneNumber({
        user: { user: user.id, ...data },
      });
      if (myUser === undefined) {
        toast.error("Datos no actualizados.", {
          duration: 5000,
        });
      } else {
        const userData = {
          ...user,
          phone_numbers: [...user.phone_numbers, myUser],
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
        <div className="w-[650px] md:w-full sm:w-full border-2 border-gray-100 rounded-md shadow-xl text-[14px] p-4">
          <p className="text-black text-[30px] text-start mb-6">
            Agrega un Numero de Telefono principal
          </p>
          <form
            className="flex flex-col items-start my-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="font-semibold" htmlFor="code">
              Código de país
            </label>
            <div className="flex my-4 space-x-4">
              <select
                className="w-[180px] sm:w-[150px] border border-gray-300 rounded-md p-1 outline-none"
                id="code"
                {...register("code")}
                aria-invalid={errors.code ? "true" : "false"}
              >
                {codes?.map((code) => {
                  const codePre = `${code.idd.root}${code.idd.suffixes[0]}`;
                  return (
                    <option key={code.altSpellings[0]} value={codePre}>
                      {code.name.common} {codePre}
                    </option>
                  );
                })}
              </select>
              <input
                type="text"
                className="w-[200px] sm:w-[150px] border border-gray-300 rounded-md p-1 outline-none"
                {...register("phone_number")}
                placeholder="Introduce tu nuevo número"
                aria-invalid={errors.phone_number ? "true" : "false"}
              />
            </div>
            {errors.phone_number && (
              <p className="text-[12px] text-[#ff2d2d]">
                {errors.phone_number.message}
              </p>
            )}
            <p>
              Para verificar su número, le enviaremos un mensaje de texto con un
              código temporal. Se pueden aplicar tarifas por mensajes y datos.
            </p>
            <div className="flex space-x-2">
              <button
                className="text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md py-1 px-3 mt-4"
                type="submit"
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
