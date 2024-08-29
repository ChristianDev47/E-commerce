import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function EditLogin() {
  const { user } = useAuth();
  return (
    <>
      {user && (
        <div className="flex items-center justify-center w-full my-20 px-[6rem] md:px-[2rem] sm:px-[2rem]">
          <div className="flex flex-col items-start justify-start">
            <p className="text-black text-[28px] text-start title mb-3 title">
              Login y seguridad
            </p>
            <ul className="w-[600px] md:w-full sm:w-full border-2 border-gray-100 text-[14px] shadow-xl rounded-md title">
              <li className="flex items-start justify-between p-4 space-x-2 ">
                <div className="w-[70%]">
                  <p className="font-semibold">Nombre y apellido</p>
                  <p>
                    {user.name} {user.surname}
                  </p>
                </div>
                <Link to="/profile/login-segurity/name">
                  <button className="w-[120px] h-[25px] text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md relative">
                    <p>Edit</p>
                  </button>
                </Link>
              </li>
              <li className="flex items-start justify-between p-4 space-x-2 border-t-2 border-gray-200">
                <div className="w-[70%]">
                  <p className="font-semibold">Email</p>
                  <p>{user.email}</p>
                </div>
                <Link to="/profile/login-segurity/email">
                  <button className="w-[120px] h-[25px] text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md relative">
                    <p>Edit</p>
                  </button>
                </Link>
              </li>
              <li className="flex items-start justify-between p-4 space-x-2 border-t-2 border-gray-200">
                <div className="w-[70%]">
                  <p className="font-semibold">Número de telefono principal</p>
                  {user.phone_numbers.length > 0 ? (
                    <p>
                      {
                        user.phone_numbers[user.phone_numbers.length - 1]
                          .phone_number
                      }
                    </p>
                  ) : (
                    <p>
                      Defina un numero de telefono para informarle en caso de
                      cualquier inconveniente con su pedido
                    </p>
                  )}
                </div>
                <Link to="/profile/login-segurity/phone-number">
                  <button className="w-[120px] h-[25px] text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md relative">
                    <p>Agregar</p>
                  </button>
                </Link>
              </li>
              <li className="flex items-start justify-between p-4 space-x-2 border-t-2 border-gray-200">
                <div className="w-[70%]">
                  <p className="font-semibold">Contraseña</p>
                  <p>**********</p>
                </div>
                <Link to="/profile/login-segurity/password">
                  <button className="w-[120px] h-[25px] text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md relative">
                    <p>Edit</p>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
