import { Link } from "react-router-dom";
import cart from "../../assets/profile/cart.svg";
import location from "../../assets/profile/location.svg";
import payment from "../../assets/profile/payment.svg";
import security from "../../assets/profile/security.svg";

export default function Profile() {
  const options = [
    {
      title: "Tus ordenes",
      description:
        "Siguemiento de tus pedidos, realiza devoluciones o cancela un pedido",
      icon: cart,
      path: "/profile/orders",
    },
    {
      title: "Login y seguridad",
      description:
        "Modifica tu nombre de inicio, email, password y número de telefono",
      icon: security,
      path: "/profile/login-segurity",
    },
    {
      title: "Tu dirección",
      description:
        "Edita, elimina o establece una dirección por defecto para tus pedidos",
      icon: location,
      path: "/profile/addresses",
    },
    {
      title: "Tus metodos de pago",
      description:
        "Mira todas rus transacciones y maneja todos tus metodos de pago",
      icon: payment,
      path: "/profile/payment",
    },
  ];

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-start justify-center max-w-[1700px] w-full my-8 2xl:px-[9rem] px-[2rem]  mb-[8rem]">
        <div className="flex items-center justify-start mb-6">
          <p className="text-black text-[28px] title">Tu cuenta</p>
        </div>
        <div className="grid w-full grid-cols-4 gap-2">
          <div className="w-full h-full col-span-2 overflow-hidden rounded-md lg:hidden md:hidden sm:hidden">
            <img src="/images/account/profile.jpg" alt="" />
          </div>
          <div className="grid w-full h-full grid-cols-4 col-span-2 gap-4 lg:col-span-4 md:col-span-4 sm:col-span-4">
            {options.map(({ title, description, icon, path }, index) => (
              <Link
                className="w-full col-span-2 md:col-span-4 sm:col-span-4 max-w-[410px] min-h-[150px]"
                to={path}
                key={index}
              >
                <div className="px-6 pb-8 pt-4 text-start rounded-lg  relative overflow-hidden  h-full hover:scale-[102%] transition-all duration-200 shadow-lg ">
                  <img
                    className="h-[35%] absolute bottom-2 right-4"
                    src={icon}
                    alt={title}
                  />
                  <p className="text-[18px] title text-[#2B2A29] font-semibold">
                    {title}
                  </p>
                  <p className="text-[14px] title">{description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
