import { Link } from "react-router-dom";
import plus from "../../../assets/plus.svg";
import { useAuth } from "../../../hooks/useAuth";
import { DeleteAddressUser } from "../../../services/user";
import toast from "react-hot-toast";

export default function EditAddress() {
  const { user, addUser } = useAuth();
  const handleDelete = async (id: number) => {
    const newData = await DeleteAddressUser({ id });
    if (newData === undefined) {
      toast.error("Datos no eliminados.", {
        duration: 5000,
      });
    } else {
      const newDataAddres = user.addresses.filter(
        (address) => address.id !== id
      );
      const userData = {
        ...user,
        addresses: [...newDataAddres],
      };
      addUser(userData);
      toast.success(`Datos eliminadoss correctamente.`, {
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
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-start justify-center max-w-[1700px] w-full my-8 2xl:px-[9rem] px-[2rem]  mb-[8rem]">
        <p className="text-black text-[30px] text-start mb-6">Tu dirección</p>
        <div className="w-[700px] md:w-full sm:w-full grid grid-cols-3 gap-4">
          <Link
            className="md:col-span-3 sm:col-span-3"
            to="/profile/addresses/add"
          >
            <div className="outline-dashed outline-gray-300 hover:outline-[#F26522] transition-all duration-150 rounded-md text-[14px] p-8 flex flex-col justify-center items-center opacity-70">
              <img className="w-[80px]" src={plus} alt="" />
              <p className="text-[20px] title text-center">
                Agregar una dirección
              </p>
            </div>
          </Link>
          {user.addresses.length > 0 &&
            user.addresses.map((address) => {
              return (
                <div
                  key={address.id}
                  className="h-full col-span-1 overflow-hidden border border-gray-100 rounded-md shadow-xl text-[14px] md:col-span-3 sm:col-span-3"
                >
                  <p className="px-4 font-semibold border-b-2 text-white h-[20%] border-gray-200 flex items-center bg-[#2B2A29]">
                    {user.name} {user.surname}
                  </p>
                  <div className="h-[60%] p-4 uppercase">
                    <p>{address.country}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>{address.street_address}</p>
                  </div>
                  <div className="flex items-center justify-start px-4 space-x-2 text-white border-t-2 border-gray-200 h-[20%] text-[12px]">
                    <Link
                      className="transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md p-1 w-16 text-center"
                      to={`/profile/addresses/edit/${address.id}`}
                    >
                      <p>Editar</p>
                    </Link>
                    <button
                      className="transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md p-1 w-16 text-center"
                      onClick={() => handleDelete(address.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
