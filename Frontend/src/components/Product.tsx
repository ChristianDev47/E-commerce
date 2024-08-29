import { useEffect, useState } from "react";
import { Product } from "../types/types";
import { Link } from "react-router-dom";
import star from "../assets/star.svg";
import half_star from "../assets/half-star.svg";
import no_star from "../assets/no-star.svg";
import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";

interface Props {
  products: Product[];
}

export function ProductCard({ products }: Props) {
  const { addToCart, cart } = useCart();
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  useEffect(() => {
    setSelectedImages(products.map(() => 0));
  }, [products]);

  const handleAddCart = (product: Product) => {
    if (cart.filter((c) => c.id === product.id).length <= 0) {
      toast.success(`Has agregado ${product.title} a tu carrito`, {
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
    addToCart(product);
  };

  return (
    <>
      {products.map((product, productIndex) => (
        <div
          key={productIndex}
          className={`w-full group grid grid-cols-8 gap-4 border border-gray-200 overflow-hidden rounded-md `}
        >
          <div className="relative flex flex-col justify-center col-span-2 ">
            {product.images[selectedImages[productIndex]] && (
              <img
                className="w-full h-full"
                src={product.images[selectedImages[productIndex]].image}
                alt={`Product ${product.title}`}
              />
            )}
          </div>
          <div className="flex flex-col justify-between col-span-6 pr-2">
            <div className="flex flex-col ">
              <div className="py-1 border-b border-gray-400">
                <h3 className="text-[18px] font-semibold sm:text-[14px] md:text-[14px] lg:text-[14px]">
                  {product?.title}
                </h3>
              </div>
              <p className="text-[14px] sm:hidden md:hidden ">
                {product?.description}
              </p>
              <div className="flex items-end justify-star ">
                <p className="mr-2 text-[14px]">{product?.rating}</p>
                {product?.rating &&
                  [...Array(5)].map((_, index) => {
                    let starImage;
                    if (index < Math.floor(product?.rating)) {
                      starImage = star;
                    } else if (index < product?.rating) {
                      starImage = half_star;
                    } else {
                      starImage = no_star;
                    }
                    return (
                      <img
                        className="w-[20px]"
                        key={index}
                        src={starImage}
                        alt=""
                      />
                    );
                  })}
              </div>
              <div className="relative z-30 flex flex-col items-start ">
                <div className="flex mb-2 space-x-2 sm:mb-0 md:mb-0 lg:mb-0">
                  <p>Precio: </p>
                  <p className="text-[20px] sm:text-[16px] md:text-[16px] lg:text-[16px] m-0 p-0 text-red-700">
                    ${product?.price}
                  </p>
                </div>
              </div>
            </div>
            {product?.quantity && product.quantity > 0 ? (
              <div className="text-[20px] text-green-700 font-semibold">
                <div className="flex space-x-3 text-black duration-500  text-[14px] my-2 sm:my-0 md:my-0 lg:my-0">
                  <div
                    title="Vista rápida"
                    className="w-[120px] h-[35px] py-2 cursor-pointer px-4 transition-all hover:bg-[#F26522] bg-[#2B2A29] text-white font-bold  rounded-md text-[12px] my-2 text-center"
                  >
                    <Link to={`/product/${product.id}`} onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                    })}}>
                      <p>Vista rapida</p>
                    </Link>
                  </div>
                  <div
                    title="Vista rápida"
                    className="w-[135px] h-auto py-2 cursor-pointer px-4 transition-all hover:bg-[#F26522] bg-[#2B2A29] text-white font-bold  rounded-md text-[12px] my-2 text-center"
                  >
                    <div onClick={() => handleAddCart(product)}>
                      <p>Agregar</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-[16px] text-red-700 font-semibold">
                No disponible
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
