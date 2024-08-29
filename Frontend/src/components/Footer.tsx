import send from "../assets/send.svg";
import location from "../assets/location.svg";
import phone from "../assets/phone.svg";
import mail from "../assets/mail.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
Link;

export default function Footer() {
  return (
    <div className="flex flex-col items-center w-full h-auto ">
      <div className="bg-[#010101dd] 2xl:px-[9rem] px-[2rem] py-3 flex justify-between md:justify-end sm:justify-end text-white title text-[14px] max-w-[1700px] w-full ">
        <div className="flex items-center md:hidden sm:hidden">
          <img src={send} alt="" />
          <div className="px-2 leading-4">
            <p className="font-bold">
              COMPRA LOS MEJORES PRODUCTOS Y AL MEJOR PRECIO
            </p>
            <p className="text-[12px]">
              ¡Y disfruta de $5 de descuento en tu primera compra!
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-3 font-bold">
          <p>SIGUENOS</p>
          <FontAwesomeIcon
            className="bg-white rounded-full"
            icon={faFacebook}
            size="2x"
            color="#4267B2"
          />
          <FontAwesomeIcon icon={faTwitter} size="2x" color="#1DA1F2" />
          <FontAwesomeIcon icon={faInstagram} size="2x" color="#C13584" />
          <FontAwesomeIcon icon={faYoutube} size="2x" color="#e22121" />
        </div>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-6 sm:grid-cols-6 gap-4 2xl:px-[9rem] px-[2rem] py-8 text-[14px] max-w-[1700px] w-full">
        <div className="col-span-2 space-y-2 md:col-span-6 md:mb-4 sm:col-span-6 sm:mb-4">
          <div className="flex items-center justify-start px-4">
            <p className="text-[32px] font-bold title">EcomTrend</p>
          </div>
          <ul className="px-4 space-y-4">
            <li className="flex items-center justify-start space-x-2">
              <img className="w-[25px]" src={location} alt="" />
              <p>
                San Luis Potosí, Centro Histórico, 78000 San Luis Potosí, SPL,
                México
              </p>
            </li>
            <li className="flex items-center justify-start space-x-2">
              <img className="w-[25px]" src={phone} alt="" />
              <p>(+0214)0 315 215 - (+0214)0 315 215</p>
            </li>
            <li className="flex items-center justify-start space-x-2">
              <img className="w-[25px]" src={mail} alt="" />
              <p>Contacto@Opencartworks.Com</p>
            </li>
          </ul>
        </div>
        <div className="col-span-1 space-y-2 md:col-span-2 md:pl-5 sm:col-span-2 sm:pl-5">
          <div>
            <h3 className="font-bold">INFORMACIÓN</h3>
            <div className="w-[35%] h-[3px] bg-black my-2"></div>
          </div>
          <ul className="pt-4 space-y-4">
            <li className="hover:text-[#F26522]">
              <Link to="/">Sobre Nosotros</Link>
            </li>
            <li className="hover:text-[#F26522]">
              <Link to="/">Preguntas más frecuentes</Link>
            </li>
            <li className="hover:text-[#F26522]">
              <Link to="/">Garantia y servicios</Link>
            </li>
            <li className="hover:text-[#F26522]">
              <Link to="/">Pagina de soporte</Link>
            </li>
            <li className="hover:text-[#F26522]">
              <Link to="/">Registro de cliente</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 space-y-2 md:col-span-2 sm:col-span-2">
          <div className="font-bold">
            <h3>SERVICIOS</h3>
            <div className="w-[35%] h-[3px] bg-black my-2"></div>
          </div>
          <ul className="pt-4 space-y-4">
            <li className="hover:text-[#F26522]">
              <Link to="/">Contactanos</Link>
            </li>
            <li className="hover:text-[#F26522]">
              <Link to="/">Devoluciones</Link>
            </li>
            <li className="hover:text-[#F26522]">
              <Link to="/">Centro de ayuda</Link>
            </li>
            <li className="hover:text-[#F26522]">
              <Link to="/">Servicio al cliente</Link>
            </li>
            <li className="hover:text-[#F26522]">
              <Link to="/">Atención al cliente</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 space-y-2 md:col-span-2 md:pr-5 sm:col-span-2 sm:pr-5">
          <div>
            <h3 className="font-bold">TODOS LOS PRODUCTOS</h3>
            <div className="w-[35%] h-[3px] bg-black my-2"></div>
          </div>
          <ul className="pt-4 space-y-4">
            <li className="hover:text-[#F26522]">
              <Link to="/">Todos los productos</Link>
            </li>
            <li className="hover:text-[#F26522]">
              <Link to="/">Mejoras para el hogar</Link>
            </li>
            <li className="hover:text-[#F26522]">
              <Link to="/">Novedades</Link>
            </li>
            <li className="hover:text-[#F26522]">
              <Link to="/">Accessorios de cocina</Link>
            </li>
            <li className="hover:text-[#F26522]">
              <Link to="/">Categorias</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
