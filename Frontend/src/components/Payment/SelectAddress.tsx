/* eslint-disable react-hooks/exhaustive-deps */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressEditSchema } from "../../schemas/validations/loginSchema";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { EditUserAddress } from "../../types/user";
import { AddAddressUser } from "../../services/user";
import { useEffect, useState } from "react";
import { countryCode } from "../../types/contryCodes";
import { CountryCodes } from "../../services/contryCodes";
import close from "../../assets/close.svg";
import plus from "../../assets/plus.svg";

interface PropsAddress {
  selectedAddress: number | undefined;
  setSelectedAddress: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function SelectAddress({
  selectedAddress,
  setSelectedAddress,
}: PropsAddress) {
  const { user } = useAuth();
  const [showSelectAddress, setShowSelectAddress] = useState<boolean>(false);
  useEffect(() => {
    if (showSelectAddress) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSelectAddress]);

  return (
    <>
      <div className={`${showSelectAddress === true ? "block" : "hidden"}`}>
        <SelectOwnAddress setShowSelectAddress={setShowSelectAddress} />
      </div>
      <div className="flex flex-col items-start justify-center w-full ">
        <div className="flex flex-col justify-between w-full">
          <h3 className="title text-[16px] font-semibold">
            1 Dirección de envio
          </h3>
          <h3 className="title text-[13px] border-b-2 border-gray-200 py-1">
            Selecciona o agrega una direccion de envio
          </h3>
        </div>

        <div className="w-full pt-2 pb-6">
          <div>
            <div
              onClick={() => setShowSelectAddress(true)}
              className="flex items-center my-2 space-x-2 cursor-pointer"
            >
              <img src={plus} alt="" width={20} />
              <p className="text-[13px] font-semibold">
                Agregar una nueva direccion de envio
              </p>
            </div>
          </div>
          {user.addresses.length > 0 &&
            user.addresses.map((address) => {
              return (
                <div
                  key={address.id}
                  onClick={() => setSelectedAddress(address.id)}
                  className="flex items-end justify-start h-full col-span-1 pb-2 space-x-1 rounded-md cursor-pointer "
                >
                  <div className="flex items-end justify-end p-1 m-1 rounded-full">
                    <div
                      className={`${
                        selectedAddress === address.id
                          ? "bg-blue-500"
                          : "bg-transparent"
                      } rounded-full w-[8px] h-[8px] border outline outline-blue-500`}
                    ></div>
                  </div>
                  <div className="uppercase text-[13px]">
                    <span>
                      <span className="font-semibold">Pais:</span>{" "}
                      {address.country},{" "}
                    </span>
                    <span>
                      <span className="font-semibold">Estado/Provincia:</span>{" "}
                      {address.state},{" "}
                    </span>
                    <span>
                      <span className="font-semibold">Ciudad:</span>{" "}
                      {address.city},{" "}
                    </span>
                    <span>
                      <span className="font-semibold">Dirección:</span>{" "}
                      {address.street_address}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

interface Props {
  setShowSelectAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectOwnAddress = ({ setShowSelectAddress }: Props) => {
  const { user, addUser } = useAuth();
  const [countries, setCountries] = useState<countryCode[]>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditUserAddress>({
    resolver: zodResolver(addressEditSchema),
  });

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
      const myUser = await AddAddressUser({
        Address: { user: user.id, ...data },
      });
      if (myUser === undefined) {
        console.error();
      } else {
        const userData = {
          ...user,
          addresses: [...user.addresses, myUser],
        };
        addUser(userData);
        setShowSelectAddress(false);
        reset({
          country: "",
          city: "",
          street_address: "",
          postal_code: "",
          state: "",
        });
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
    <div className="fixed top-0 left-0 m-auto  flex items-start pt-[12rem] justify-center bg-[#000000c1] overflow-hidden sm:px-4 z-50 w-[100vw] h-[100vh]">
      <div className="flex flex-col items-start justify-start w-[650px] sm:w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between w-full p-4 bg-gray-100 ">
          <p className="font-semibold">Agrega una nueva direccion de envio </p>
          <img
            onClick={() => setShowSelectAddress(false)}
            className="cursor-pointer"
            src={close}
            alt=""
            width={20}
          />
        </div>
        <div className="w-full p-4">
          <form
            className="flex flex-col items-start w-full my-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full my-2 space-y-4">
              <div>
                <label className="m-1 font-semibold" htmlFor="country">
                  País/Región
                </label>
                <select
                  className="w-full p-1 bg-gray-100 border-2 border-gray-300 rounded-md shadow-sm outline-none cursor-pointer hover:bg-gray-200"
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
                  className="w-full p-1 border-2 border-gray-300 rounded-md outline-none"
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
                  <div className="col-span-1">
                    <label className="m-1 font-semibold" htmlFor="countries">
                      Ciudad
                    </label>
                    <input
                      className="w-full p-1 border-2 border-gray-300 rounded-md outline-none"
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
                  <div className="col-span-1">
                    <label className="m-1 font-semibold" htmlFor="countries">
                      Estado/Provincia
                    </label>
                    <input
                      className="w-full p-1 border-2 border-gray-300 rounded-md outline-none"
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
                  <div className="col-span-1">
                    <label className="m-1 font-semibold" htmlFor="countries">
                      Codigo Postal
                    </label>
                    <input
                      className="w-full p-1 border-2 border-gray-300 rounded-md outline-none"
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
            <div className="inline-flex justify-end w-full mt-2 lowercase">
              <button className="bg-[#F7CA00] rounded-md py-1 px-3">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
