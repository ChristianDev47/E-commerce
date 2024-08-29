import { useCart } from "../../hooks/useCart";
import CartProduct from "./List-products";
import { Link } from "react-router-dom";

interface Props {
  setShowCart: (value: boolean) => void;
}

export default function ShowCart({ setShowCart }: Props) {
  const { cart, addToCart, restToCart, clearCart, removeFromCart } = useCart();

  return (
    <div className="flex flex-col justify-between h-screen pb-[3rem]">
      <div className="pt-4 h-[74,5%] overflow-x-auto">
        <div className="flex items-start justify-between mx-6 ">
          <span className="inline-flex items-center justify-center text-sm font-bold">
            Cantidad{" "}
            <div className="border-[1px] rounded-3xl border-[#797979] mx-2 px-5">
              {cart.reduce(
                (accumulator, item) => accumulator + (item.quantity ?? 0),
                0
              )}
            </div>{" "}
          </span>
          <button
            onClick={() => clearCart()}
            className="inline-flex items-center text-sm"
          >
            Borrar Todo
          </button>
        </div>
        <div className={`ml-6 ${cart.length === 3 ? " mr-3" : "mr-6"} my-3`}>
          {cart.map((product) => {
            return (
              <CartProduct
                key={product.id}
                addToCart={() => addToCart(product)}
                restToCart={() => restToCart(product)}
                removeFromCart={() => removeFromCart(product)}
                product={product}
              />
            );
          })}
        </div>
      </div>

      <div className="flex flex-col justify-end w-full px-8 bg-second">
        <p className="text-[13px] py-2 border-b-[1px] border-[#b4b4b4]">
          Información de la compra
        </p>
        <div className="flex flex-col items-center justify-between w-full py-4 pb-4">
          <div className="flex justify-between w-full">
            <p className="inline-flex items-start justify-center text-sm font-bold">
              Subtotal
            </p>
            <p
              className={` antialiased  text-xl font-bold inline-flex justify-center items-end`}
            >
              $
              {Object.values(cart)
                .reduce(
                  (acc, curr) =>
                    acc + curr.price * (curr.quantity ? curr.quantity : 0),
                  0
                )
                .toFixed(2)}
            </p>
          </div>
          <Link className="w-full" to="/card_details">
            <button
              className="w-full py-3 my-3 font-bold text-center text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-lg text-second"
              onClick={() => setShowCart(false)}
            >
              Visita tu carrito
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
