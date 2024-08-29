/* eslint-disable react-hooks/exhaustive-deps */
import star from "../../assets/star.svg";
import half_star from "../../assets/half-star.svg";
import no_star from "../../assets/no-star.svg";
import { useCart } from "../../hooks/useCart.ts";
import { Link } from "react-router-dom";
export function CartDetails() {
  const { cart, addToCart, restToCart, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-center w-full">
      <div className="max-w-[1700px] grid grid-cols-7 gap-12 2xl:px-[9rem] px-[2rem] pt-10 pb-[5rem] overflow-x-hidden  ">
        <div className="flex flex-col items-start justify-start col-span-5 p-2 px-4 space-y-6 rounded-md shadow-2xl h-fit lg:col-span-7 md:col-span-7 sm:col-span-7">
          <div className="flex items-end justify-between w-full border-b-2 border-gray-200 ">
            <h3 className="title text-[24px]">Carrito de compras</h3>
            <p className="text-[13px] md:hidden sm:hidden">Precio</p>
          </div>
          {cart.length > 0 ? (
            cart.map((product) => {
              return (
                <div key={product.id} className="grid grid-cols-9 gap-4 ">
                  <img
                    className="col-span-2 sm:col-span-9 sm:w-[50%]"
                    src={product.images[0]?.image}
                    alt=""
                  />
                  <div className="flex items-start justify-between col-span-7 space-x-8 md:flex-col md:space-x-0 md:space-y-2 sm:flex-col sm:space-x-0 sm:space-y-2 sm:col-span-9">
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <div className="pb-2 border-b border-gray-500">
                          <h3 className="text-[20px] md:text-[16px] sm:text-[16px] font-semibold">
                            {product?.title}
                          </h3>
                        </div>
                        <p className="text-[12px]">{product?.description}</p>
                        <div className="flex items-end justify-star ">
                          <p className="mr-2 text-[12px]">{product?.rating}</p>
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
                                  className="w-[18px]"
                                  key={index}
                                  src={starImage}
                                  alt=""
                                />
                              );
                            })}
                        </div>
                      </div>
                      <div className="flex items-center justify-start w-full  my-1 space-x-8 text-[12px]">
                        <div
                          className={`flex items-end bg-gray-200 rounded-md text-[18px] shadow-xl bg-[#2b2a29dd]`}
                        >
                          <button
                            className={`px-2 text-black font-semibold`}
                            onClick={() => restToCart(product)}
                          >
                            -
                          </button>
                          <div className="text-[12px] py-[5px] px-3.5 text-black font-semibold">
                            {product.quantity}
                          </div>
                          <button
                            className={`px-2  text-black font-semibold`}
                            onClick={() => addToCart(product)}
                          >
                            +
                          </button>
                        </div>
                        <div
                          onClick={() => removeFromCart(product)}
                          className="text-[#286fd3] cursor-pointer hover:border-b border-[#286fd3] title"
                        >
                          Eliminar
                        </div>
                        <Link
                          to={`/products/filters?category=${product.category.name}`}
                          className="text-[#286fd3] cursor-pointer hover:border-b border-[#286fd3] title"
                        >
                          Ver productos similares
                        </Link>
                      </div>
                    </div>
                    <div className="relative z-30 flex flex-col items-start ">
                      <div className="flex flex-col mb-2 space-x-2">
                        <p className="text-[18px] m-0 p-0 text-black title">
                          ${product?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="min-w-[990px] h-full">
              No tienes ningun producto en el carrito.{" "}
              <Link to="/products">Vuelve y busca un producto</Link>
            </p>
          )}
        </div>
        <div className="h-[110px] p-3 border-2 border-gray-100 rounded-md shadow-xl text-[14px] space-y-4 col-span-2 lg:col-span-3 md:col-span-4 sm:col-span-7">
          <p className="text-[18px] font-semibold">
            Subtotal ({cart.length} items): $
            {Object.values(cart)
              .reduce((acc, curr) => acc + curr.price * (curr.quantity ?? 1), 0)
              .toFixed(2)}
          </p>
          <Link to="/complet_order">
            {" "}
            <button
              className={`w-full py-2 title text-white my-4 font-semibold transition-all bg-[#2B2A29] rounded-lg ${
                cart.length > 0 ? "hover:bg-[#F26522]" : "cursor-not-allowed"
              }`}
              disabled={cart.length === 0}
            >
              Proceder a la compra
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
