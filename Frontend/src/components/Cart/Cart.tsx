import close from "../../assets/close.svg";
import ShowCart from "./ShowCart";

interface Props {
  showCart: boolean;
  setShowCart: (value: boolean) => void;
}

export default function Cart({ showCart, setShowCart }: Props) {
  return (
    <div>
      {
        <div>
          <div
            className={`${
              showCart === true
                ? "translate-x-[0%] fixed w-full h-full flex justify-end items-center top-0 r-0 box-shadow-md z-[150] bg-[#000000b4]"
                : ""
            }`}
          ></div>
          <div
            className={`fixed w-full h-screen flex justify-end items-center top-0 r-0 ${
              showCart === false && "translate-x-[150%]"
            } transition-transform duration-300 ease-in-out box-shadow-md z-[200] title text-[16px]`}
          >
            <div className="relative h-screen 2xl:w-[440px] w-[380px] sm:w-full bg-white">
              <div className=" flex justify-between items-center border-b-2 border-[#d8d8d8]">
                <p
                  className={`antialiased mx-6 my-4  text-[#1f1f1f] font-bold`}
                >
                  Tu carrito
                </p>
                <div className="mx-2 bg-white rounded-full aspect-square">
                  <img
                    onClick={() => setShowCart(false)}
                    className="w-[18px] cursor-pointer"
                    src={close}
                    alt=""
                  />
                </div>
              </div>
              <ShowCart setShowCart={setShowCart} />
            </div>
          </div>
        </div>
      }
    </div>
  );
}
