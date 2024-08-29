import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cart from "./Cart/Cart.tsx";
import CartIcon from "./Cart/CartIcon.tsx";
import UserIcon from "./User/UserIcon.tsx";
import SearchIcon from "./Navbar/SerachIcon.tsx";
import ModalSearch from "./Navbar/SearchModal.tsx";
import productIcon from "../assets/product.svg";
import mail from "../assets/mail.svg";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../hooks/useCart.ts";
import UserModal from "./Navbar/UserModal.tsx";
import MenuIcon from "./Navbar/MenuIcon.tsx";
import ResponsiveNav from "./Navbar/ResponsiveNav.tsx";
import ModalToggle from "../utils/ModalToggle.tsx";

function Navbar() {
  const { cart } = useCart();
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const location = useLocation();
  const { pathname } = location;
  const [showResponsiveNav, setShowResponsiveNav] = useState(false);

  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCart]);

  useEffect(() => {
    if (showSearch && searchRef.current) {
      searchRef.current.focus(); 
    }
  }, [showSearch]);
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        className="z-50 flex flex-col items-center w-full overflow-x-hidden "
      >
        <div className="flex justify-between py-2 border-b-2 border-[#eeeeeeb3] max-w-[1700px] w-full 2xl:px-[9rem] px-[2rem]">
          <div className="flex items-center opacity-75 text-[14px] space-x-4 md:space-x-0 sm:space-x-0">
            <div className="flex items-center space-x-2 md:hidden sm:hidden">
              <img className="w-[20px]" src={productIcon} alt="" />
              <p>Compra los mejores productos</p>
            </div>
            <div className="flex items-center space-x-2">
              <img className="w-[20px]" src={mail} alt="" />
              <p className="cursor-pointer hover:text-[#ff4135] transition-all duration-200">
                support@ecomtrend.com
              </p>
            </div>
          </div>
          <div className="flex items-center text-[14px] space-x-3">
            <FontAwesomeIcon
              className="bg-white cursor-pointer opacity-70 hover:text-[#ff4135] hover:opacity-100 rounded-full"
              icon={faFacebook}
              size="lg"
            />
            <FontAwesomeIcon
              className="cursor-pointer opacity-70 hover:text-[#ff4135] hover:opacity-100"
              icon={faTwitter}
              size="lg"
            />
            <FontAwesomeIcon
              className="cursor-pointer opacity-70 hover:text-[#ff4135] hover:opacity-100"
              icon={faInstagram}
              size="lg"
            />
            <FontAwesomeIcon
              className="cursor-pointer opacity-70 hover:text-[#ff4135] hover:opacity-100"
              icon={faYoutube}
              size="lg"
            />
          </div>
        </div>
        <div className="flex justify-between items-center px-[2rem] 2xl:px-[9rem] py-2 bg-[#ffffff] w-full max-w-[1700px]">
          <div className="flex items-center">
            <p className="text-[28px] font-extrabold title">EcomTrend</p>
          </div>
          <div className="flex items-center lg:hidden md:hidden sm:hidden">
            <ul className="flex justify-center items-center space-x-12 px-[7rem] navbar text-[13px] uppercase font-semibold">
              <li
                className={`hover:text-[#ff4135] transition-all duration-200 ${
                  pathname === "/" && "text-[#ff4135]"
                }`}
              >
                <Link to="/">
                  <p>Inicio</p>
                </Link>
              </li>
              <li
                className={`hover:text-[#ff4135] transition-all duration-200 ${
                  pathname === "/products" && "text-[#ff4135]"
                }`}
              >
                <Link to="/products">
                  <p>Productos</p>
                </Link>
              </li>
              <li
                className={`hover:text-[#ff4135] transition-all duration-200 ${
                  pathname === "/new_products" && "text-[#ff4135]"
                }`}
              >
                <Link to="/new_products">
                  <p>Novedades</p>
                </Link>
              </li>
              <li
                className={`hover:text-[#ff4135] transition-all duration-200 ${
                  pathname === "/about" && "text-[#ff4135]"
                }`}
              >
                <Link to="/about">
                  <p>Sobre nosotros</p>
                </Link>
              </li>
              <li
                className={`hover:text-[#ff4135] transition-all duration-200 ${
                  pathname === "/contact" && "text-[#ff4135]"
                }`}
              >
                <Link to="/contact">
                  <p>Contactanos</p>
                </Link>
              </li>
            </ul>
          </div>
          <ul className="flex items-center space-x-2">
             <li >
              <ModalToggle
                modalId="search-modal"
                toggleButtonId="search-toggle-btn"
                ModalComponent={ModalSearch}
                className="flex items-end cursor-pointer"
                title={
                  <div onClick={() => setShowSearch(!showSearch)}>
                    <SearchIcon />
                  </div>
                }
                searchRef={searchRef}
              />
            </li>

            <li
            >
              <ModalToggle
                modalId="user-modal"
                toggleButtonId="user-toggle-btn"
                ModalComponent={UserModal}
                className="flex items-end cursor-pointer"
                title={
                  <UserIcon />
                }
              />
            </li>
            <li
              onClick={() => setShowCart(true)}
              className="relative cursor-pointer group"
            >
              <div className="absolute top-[-10px] right-[-5px] w-4 h-4 bg-black group-hover:bg-[#ff4135] transition-all duration-200 rounded-full ">
                <div className="relative z-40 w-full h-full">
                  <div className="absolute top-0 left-0 bottom-0 right-0 m-auto  text-white text-[10px] title w-full h-full flex justify-center items-center">
                    <p>
                      {cart.reduce(
                        (accumulator, item) =>
                          accumulator + (item.quantity ?? 0),
                        0
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <CartIcon />
            </li>
            <li
              onClick={() => setShowResponsiveNav(!showResponsiveNav)}
              className="flex items-end cursor-pointer 2xl:hidden xl:hidden "
            >
              <MenuIcon />
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="relative w-full h-full max-w-[1400px] px-[6rem]">
          <div
            className={`absolute right-0 w-full transition-opacity duration-300 ease-in-out  ${
              showResponsiveNav === true
                ? "block opacity-100"
                : "hidden opacity-0"
            }`}
          >
            <ResponsiveNav
              showResponsiveNav={showResponsiveNav}
              setShowResponsiveNav={setShowResponsiveNav}
            />
          </div>
        </div>
      </div>
      <Cart showCart={showCart} setShowCart={setShowCart} />
    </>
  );
}

export default Navbar;
