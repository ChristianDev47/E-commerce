import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressEditSchema } from "../../../schemas/validations/loginSchema";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { EditUserAddress } from "../../../types/user";
import { AddAddressUser, UpdateAddressUser } from "../../../services/user";
import { useEffect, useState } from "react";
import { countryCode } from "../../../types/contryCodes";
import { CountryCodes } from "../../../services/contryCodes";

export default function Address() {
  const { user, addUser } = useAuth();
  const [countries, setCountries] = useState<countryCode[]>();
  const navigateTo = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditUserAddress>({
    resolver: zodResolver(addressEditSchema),
  });

  useEffect(() => {
    if (id) {
      const address =
        user.addresses.filter((address) => address.id === parseInt(id))[0] ??
        user.addresses[0];
      reset({
        country: address.country,
        city: address.city,
        street_address: address.street_address,
        postal_code: address.postal_code,
        state: address.state,
      });
    }
  }, [user, reset, id]);

  useEffect(() => {
    const getCodes = async () => {
      const data = await CountryCodes();
      setCountries(
        data.sort((a: countryCode, b: countryCode) =>
          a.name.common.localeCompare(b.name.common)
        )
      );
    };
    getCodes();
  }, []);

  const onSubmit = async (data: EditUserAddress) => {
    try {
      const myUser = !id
        ? await AddAddressUser({ Address: { user: user.id, ...data } })
        : await UpdateAddressUser({ id: user.id, newData: data });
      if (myUser === undefined) {
        toast.error(`Datos no ${!id ? "agregados" : "actualizados"}`, {
          duration: 5000,
        });
      } else {
        const userData = {
          ...user,
          addresses: [...user.addresses, myUser],
        };
        addUser(userData);
        toast.success(
          `Datos ${!id ? "agregados" : "actualizados"} correctamente ${
            myUser.email
          }.`,
          {
            duration: 4000,
            style: {
              background: "#7DA640",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#000",
            },
          }
        );
        navigateTo("/profile/addresses");
      }
    } catch (error) {
      console.error(
        `Error al ${!id ? "agregar" : "actualizar"} los datos:`,
        error
      );
      toast.error(
        `Error al ${
          !id ? "agregar" : "actualizar"
        } los datos. Por favor, inténtalo de nuevo más tarde.`,
        {
          duration: 5000,
        }
      );
    }
  };

  return (
    <div className="flex items-center justify-center w-full my-20 px-[6rem] md:px-[2rem] sm:px-[2rem]">
      <div className="flex flex-col items-start justify-start title">
        <div className="w-[600px] md:w-full sm:w-full border-2 border-gray-100 rounded-md shadow-xl text-[14px] p-4">
          <p className="text-black text-[28px] text-start mb-2">
            {!id
              ? "Agrega una direccion de envio"
              : "Modifica tu direccion de envio"}
          </p>
          <form
            className="flex flex-col items-start w-full my-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="my-2 space-y-4 w-ful">
              <div>
                <label className="m-1 font-semibold" htmlFor="country">
                  País/Región
                </label>
                <select
                  className="w-full p-1 bg-gray-100 border-2 border-gray-200 rounded-md shadow-sm outline-none cursor-pointer hover:bg-gray-200"
                  id="country"
                  {...register("country")}
                  aria-invalid={errors.country ? "true" : "false"}
                >
                  {countries?.map((country, index) => {
                    return (
                      <option key={index} value={country.name.common}>
                        {country.name.common}
                      </option>
                    );
                  })}
                </select>
                {errors.country?.message && (
                  <p className="text-[12px] text-[#ff2d2d]">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div>
                <label className="m-1 font-semibold" htmlFor="countries">
                  Dirección
                </label>
                <input
                  className="w-full p-1 border-2 border-gray-200 rounded-md outline-none"
                  placeholder="Calle, nro de casa, etc"
                  id="street_address"
                  {...register("street_address")}
                  aria-invalid={errors.street_address ? "true" : "false"}
                />
                {errors.street_address?.message && (
                  <p className="text-[12px] text-[#ff2d2d]">
                    {errors.street_address.message}
                  </p>
                )}
                <div className="grid w-full grid-cols-3 gap-1 my-1">
                  <div className="col-span-1 sm:col-span-3">
                    <label className="m-1 font-semibold" htmlFor="countries">
                      Ciudad
                    </label>
                    <input
                      className="w-full p-1 border-2 border-gray-200 rounded-md outline-none"
                      type="text"
                      id="city"
                      {...register("city")}
                      aria-invalid={errors.city ? "true" : "false"}
                    />
                    {errors.city?.message && (
                      <p className="text-[12px] text-[#ff2d2d]">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-1 sm:col-span-3">
                    <label className="m-1 font-semibold" htmlFor="countries">
                      Estado/Provincia
                    </label>
                    <input
                      className="w-full p-1 border-2 border-gray-200 rounded-md outline-none"
                      type="text"
                      id="state"
                      {...register("state")}
                      aria-invalid={errors.state ? "true" : "false"}
                    />
                    {errors.state?.message && (
                      <p className="text-[12px] text-[#ff2d2d]">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-1 sm:col-span-3">
                    <label className="m-1 font-semibold" htmlFor="countries">
                      Codigo Postal
                    </label>
                    <input
                      className="w-full p-1 border-2 border-gray-200 rounded-md outline-none"
                      type="text"
                      id="postal_code"
                      {...register("postal_code")}
                      aria-invalid={errors.postal_code ? "true" : "false"}
                    />
                    {errors.postal_code?.message && (
                      <p className="text-[12px] text-[#ff2d2d]">
                        {errors.postal_code.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button className="text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md py-1 w-full mt-4">
              Guardar {id && "Cambios"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
