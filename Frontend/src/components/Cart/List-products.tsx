import toast from "react-hot-toast";
import { ProductCart } from "../../types/types";
import clear from "../../assets/trash.svg";
import { useEffect } from "react";

interface Props {
  product: ProductCart;
  removeFromCart: () => void;
  restToCart: () => void;
  addToCart: () => void;
}

export default function CartProduct({
  product,
  removeFromCart,
  restToCart,
  addToCart,
}: Props) {
  useEffect(() => {
    if (product.quantity === 0) {
      removeFromCart();
      toast.error(`Eliminaste ${product.title} del carrito.`, {
        duration: 4000,
      });
    }
  }, [product.quantity]);
  return (
    <div>
      {product ? (
        <div
          className={`flex justify-start w-full bg-[#ffffff] rounded-xl my-2 border border-gray-300`}
        >
          <img
            className="rounded-l-xl w-[110px]"
            src={[...product.images][0].image}
            alt={product.title}
          />
          <div className="flex flex-col items-start justify-start w-full m-3 text-sm">
            <div className="flex justify-between w-full ">
              <p className="w-[90%] text-[13px]">{product.title}</p>
              <button
                className="flex items-start justify-center ml-4 text-center"
                onClick={() => {
                  removeFromCart();
                  toast.error(`Eliminaste ${product.title} del carrito.`, {
                    duration: 4000,
                  });
                }}
              >
                <img className="w-[16px]" src={clear} alt="Trash icon" />
              </button>
            </div>
            <div className="flex items-end justify-between w-full h-full">
              <p className="text-[18px] ">${product.price}</p>
              <div className={`flex items-end  text-[18px] `}>
                <button
                  className={`bg-[#2b2a29dd] text-white p-2 rounded-l-md`}
                  onClick={() => restToCart()}
                >
                  -
                </button>
                <div className="bg-[#2b2a29dd] text-white text-[12px] py-2 px-3.5">
                  {product.quantity}
                </div>
                <button
                  className={`bg-[#2b2a29dd] text-white p-2 rounded-r-md`}
                  onClick={() => addToCart()}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Producto no encontrado</p>
      )}
    </div>
  );
}
