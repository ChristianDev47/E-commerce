import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Logout } from "../../services/user";

interface Props {
  closeModal: () => void;
}
export default function UserModal({
  closeModal
}: Props) {
  const { user, logout } = useAuth();
  const navigateTo = useNavigate();
  const handleLogout = () => {
    const myUserLogout = async () => {
      await Logout({
        refresh_token: { access: `${user.access_tokens[0].refresh_token}` },
      });
    };
    const logoutWithToast = () => {
      toast.promise(
        myUserLogout().then(() => {
          logout();
          navigateTo("/");
        }),
        {
          loading: "Cerrando sesión...",
          success: "¡Sesión cerrada exitosamente!",
          error: "Error al cerrar sesión",
        },
        {
          duration: 6000,
        }
      );
    };

    logoutWithToast();
    closeModal
  };

  return (
    <div
      className="w-[200px] text-[12px] title  absolute right-0 transition-opacity duration-300 ease-in-out opacity-100 top-[5.9rem] left-[70rem] mx-auto h-auto bg-white p-4 border border-gray-300 z-50 shadow-md"
    >
      <h3 className="text-[14px] font-semibold">Tu Cuenta</h3>
      <ul className="my-2 space-y-1">
        {user.email !== "" ? (
          <>
            <li
              onClick={closeModal}
              className="hover:text-[#F26522] transition-all duration-100"
            >
              <Link to="/profile">Configuración</Link>
            </li>
            <li
              onClick={closeModal}
              className="hover:text-[#F26522] transition-all duration-100"
            >
              <Link to="/profile/orders">Tus ordenes</Link>
            </li>
            <li
              onClick={closeModal}
              className="hover:text-[#F26522] transition-all duration-100"
            >
              <Link to="/profile/login-segurity">Cuenta y seguridad</Link>
            </li>
            <li
              onClick={closeModal}
              className="hover:text-[#F26522] transition-all duration-100"
            >
              <Link to="/profile/addresses">Tú dirección</Link>
            </li>
            <li
              onClick={closeModal}
              className="hover:text-[#F26522] transition-all duration-100"
            >
              <Link to="/profile/payment">Metodos de pago</Link>
            </li>
            <li
              onClick={() => handleLogout()}
              className="hover:text-[#F26522] transition-all duration-100 cursor-pointer"
            >
              Cerrar Sesión
            </li>
          </>
        ) : (
          <li onClick={closeModal}>
            <Link to="/login">Iniciar sesión</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
