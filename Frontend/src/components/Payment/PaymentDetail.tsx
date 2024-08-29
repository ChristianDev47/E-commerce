import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { ProductsPreview } from "./Products";
import SelectAddress from "./SelectAddress";
import SelectPayment from "./SelectPaymentCard";
import { useAuth } from "../../hooks/useAuth";
import { CreateOrder } from "../../services/order";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CardPaymentType } from "../../types/paymentCard";
import { useOrder } from "../../hooks/useOrder";

export default function Payment() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [selectedAddress, setSelectedAddress] = useState<number>();
  const [selectedCard, setSelectedCard] = useState<CardPaymentType>();
  const [errors, setErrors] = useState<{
    address: null | string;
    payment: null | string;
  }>();
  const navigateTo = useNavigate();
  const productsCost = Object.values(cart).reduce(
    (acc, curr) => acc + curr.price * (curr.quantity ?? 0),
    0
  );
  const shippingCost = 85.05;
  const importsCost = (productsCost + shippingCost) * 0.13;
  const TotalCost = productsCost + shippingCost + importsCost;
  const { getMyOrders } = useOrder();


  const handleSaveOrder = async () => {
    const myOrder = {
      buyer: user.id,
      status: "Pendiente",
      shipping_address: selectedAddress,
      order_items: [
        ...cart.map((item) => {
          const product = {
            product_id: item.id,
            quantity: item.quantity,
          };
          return product;
        }),
      ],
    };
    try {
      if (!selectedAddress || !selectedCard) {
        setErrors({
          address: !selectedAddress
            ? "Seleccione o agregue una direccion de envio"
            : null,
          payment: !selectedCard
            ? "Seleccione o agregue un metodo de pago"
            : null,
        });
        throw new Error();
      } else {
        setErrors({ address: null, payment: null });
      }
      const myUser = await CreateOrder({ order: myOrder });
      if (myUser === undefined) {
        toast.error("Orden no guardada.", {
          duration: 5000,
        });
      } else {
        toast.success(`Orden realizada correctamente`, {
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
        getMyOrders()
        clearCart();
        window.scroll({
          top: 0,
          left: 0,
        })
        navigateTo("/");
      }
    } catch (error) {
      toast.error(
        "Error al realizar el pedido. Por favor, rellene todos los campos para completar la compra.",
        {
          duration: 5000,
        }
      );
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="grid grid-cols-3 gap-4 w-full my-11 2xl:px-[9rem] px-[2rem] max-w-[1700px] ">
        <p className="text-black text-[24px] text-start title ml-2 col-span-3">
          Completa tu orden
        </p>
        <div className="flex flex-col items-start justify-start col-span-2 md:col-span-3 sm:col-span-3">
          <div className="w-full border-2 border-gray-200 text-[14px] p-4">
            <SelectAddress
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            {errors?.address && (
              <p className="text-[14px] text-red-600 font-semibold title pb-4">
                {errors.address}
              </p>
            )}
            <SelectPayment
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
            />
            {errors?.payment && (
              <p className="text-[14px] text-red-600 font-semibold title pb-4">
                {errors.payment}
              </p>
            )}
            <ProductsPreview />
            <button
              onClick={handleSaveOrder}
              className="transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-lg title text-white font-semibold py-2 w-full mt-4"
            >
              Realizar Pedido
            </button>
          </div>
        </div>
        <div className="h-[200px] p-4 border-2 border-gray-200 rounded-md md:col-span-3 sm:col-span-3">
          <p className="title text-[16px] font-semibold">Resumen del pedido</p>
          <div className="grid grid-cols-5 gap-2 text-[13px] border-b-2 border-gray-200 my-2 pb-2">
            <div className="col-span-4 ">
              <p>Articulos ({cart.length}):</p>
              <p>Envio y manipulación:</p>
              <p>Total antes de los impuestos:</p>
              <p>Impuestos estimados a recaudar:</p>
            </div>
            <div className="text-end">
              <p>${productsCost.toFixed(2)}</p>
              <p>${shippingCost.toFixed(2)}</p>
              <p>${(productsCost + shippingCost).toFixed(2)}</p>
              <p>${importsCost.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Total del pedido: </p>
            <p>${TotalCost.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
