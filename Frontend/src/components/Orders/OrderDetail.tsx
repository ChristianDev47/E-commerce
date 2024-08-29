import close from "../../assets/profile/close.svg";

interface Props {
  selectedOrder?: OrdersType;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrderDetails({ selectedOrder, setShowDetails }: Props) {
  return (
    <div className="flex items-center justify-center bg-[#000000b6] title w-[100vw] h-[100vh] fixed top-0 left-0 m-auto  sm:px-4  z-50" >
      <div className="flex flex-col items-start justify-start w-[45%] bg-white rounded-lg shadow-lg overflow-y-auto text-[14px] title max-h-[700px] ">
        <div className="flex items-center justify-between w-full p-4 bg-[#2B2A29] text-white ">
          <p>ORDEN CON NRO {selectedOrder?.id}</p>
          <img
            className="cursor-pointer"
            onClick={() => setShowDetails(false)}
            src={close}
            alt=""
            width={20}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full col-span-5 px-4 my-2 ">
          <div className="flex items-end justify-between w-full border-b-2 border-gray-200">
            <h3 className="font-semibold ">Productos</h3>
            <p className="text-[13px]">Subtotal</p>
          </div>
          {selectedOrder &&
            selectedOrder.order_items.map((product) => {
              return (
                <div
                  key={product.id}
                  className="grid w-full grid-cols-9 gap-2 my-4"
                >
                  <div className="flex col-span-8 space-x-2">
                    <img
                      className="col-span-2 w-[80px] h-[80px] rounded-md"
                      src={product.product.images[0].image}
                      alt=""
                    />
                    <div className="flex items-start justify-between w-full space-x-8">
                      <div className="w-full">
                        <h3 className="font-semibold ">
                          {product?.product.title}
                        </h3>
                        <div className="text-[13px]">
                          <p>
                            <span className="font-semibold">Precio:</span>{" "}
                            {product.cost}
                          </p>
                          <p>
                            <span className="font-semibold">Cantidad:</span>{" "}
                            {product.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative z-30 flex flex-col items-end justify-start col-span-1 ">
                    <div className="flex flex-col mb-2 space-x-2">
                      <p className="text-[14px] m-0 p-0 text-black title">
                        ${(product?.cost * product.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          <div className="flex items-center justify-end w-full my-2 border-t-2 border-gray-200">
            <p className="text-[14px]">
              Total:{" "}
              <span className="text-[16px] font-semibold mx-2">
                $
                {selectedOrder?.order_items
                  .reduce(
                    (acc, curr) => acc + curr.price * (curr.quantity ?? 0),
                    0
                  )
                  .toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
