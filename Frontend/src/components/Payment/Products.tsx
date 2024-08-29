import { useCart } from "../../hooks/useCart.ts";

export function ProductsPreview() {
  const { cart } = useCart();

  return (
    <div className="flex flex-col items-start justify-center w-full space-y-2 mt-5">
      <h3 className="title text-[16px] font-semibold">3 Articulos y envío</h3>
      <div className="flex items-end justify-between w-full border-b-2 border-gray-200">
        <h3 className="text-[13px]">Tus articulos</h3>
        <p className="text-[13px]">Precio</p>
      </div>
      {cart &&
        cart.map((product) => {
          return (
            <div
              key={product.id}
              className="flex w-full h-full py-2 space-x-2 border-b-2 border-gray-200 sm:flex-col"
            >
              <img
                className="w-[100px] sm:w-[150px] h-full my-1.5"
                src={product.images[0].image}
                alt=""
              />
              <div className="flex items-start justify-between w-full col-span-7 space-x-8">
                <div className="w-full">
                  <div className="pb-2 border-b border-gray-500">
                    <h3 className="text-[18px] font-semibold">
                      {product?.title}
                    </h3>
                  </div>
                  <p className="text-[12px]">{product?.description}</p>
                  <div className="flex items-center justify-start w-full h-full my-1 space-x-8 text-[12px]">
                    <div
                      className={`flex items-end justify-center bg-transition-all text-white title bg-[#2B2A29]  rounded-md text-[18px] shadow-xl w-[100px] my-2`}
                    >
                      <div className="text-[12px] py-1 ">
                        {product.quantity} unidades
                      </div>
                    </div>
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
        })}
      <div className="flex w-full justify-end items-end space-x-2 text-[16px] title">
        <p className="font-semibold">Subtotal:</p>
        <p className={` inline-flex justify-center items-end text-[18px]`}>
          $
          {Object.values(cart)
            .reduce((acc, curr) => acc + curr.price * (curr.quantity ?? 0), 0)
            .toFixed(2)}
        </p>
      </div>
    </div>
  );
}
