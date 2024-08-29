import { Link } from "react-router-dom";

interface Props {
  showResponsiveNav: boolean;
  setShowResponsiveNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResponsiveNav({
  showResponsiveNav,
  setShowResponsiveNav,
}: Props) {
  return (
    <div
      className={`w-full absolute  ${
        showResponsiveNav === true ? "translate-y-0" : "translate-y-96"
      } transition-all ease-out duration-200 left-0 border-b border-gray-300 z-50 shadow-md bg-white 2xl:hidden xl:hidden`}
    >
      <ul className="flex flex-col items-end space-y-1 px-9 pb-4 text-[12px]">
        <li
          onClick={() => setShowResponsiveNav(false)}
          className="hover:text-[#F26522] transition-all duration-100"
        >
          <Link to="/">Inicio</Link>
        </li>
        <li
          onClick={() => setShowResponsiveNav(false)}
          className="hover:text-[#F26522] transition-all duration-100"
        >
          <Link to="/products">Productos</Link>
        </li>
        <li
          onClick={() => setShowResponsiveNav(false)}
          className="hover:text-[#F26522] transition-all duration-100"
        >
          <Link to="/new_products">Novedades</Link>
        </li>
        <li
          onClick={() => setShowResponsiveNav(false)}
          className="hover:text-[#F26522] transition-all duration-100"
        >
          <Link to="/about">Sobre nosotros</Link>
        </li>
        <li
          onClick={() => setShowResponsiveNav(false)}
          className="hover:text-[#F26522] transition-all duration-100"
        >
          <Link to="/contact">Contactanos</Link>
        </li>
      </ul>
    </div>
  );
}
