import { Link } from "react-router-dom";
import { formatFinalDate, formatNormalDate } from "../../services/dates";
import { useOrder } from "../../hooks/useOrder";

interface Props {
  orders: OrdersType[] | undefined;
  setSelectedOrder: React.Dispatch<
    React.SetStateAction<OrdersType | undefined>
  >;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ListOrders({
  orders,
  setSelectedOrder,
  setShowDetails,
}: Props) {
  const { cancelOrder } = useOrder();
  return (
    <>
      {orders && orders.length > 0 ? (
        orders.map((order) => {
          const direction =
            order.shipping_address &&
            `${order.shipping_address.country}, ${order.shipping_address.state}, ${order.shipping_address.city}, ${order.shipping_address.street_address}`;
          return (
            <div
              key={order.id}
              className="flex flex-col items-center justify-center w-full my-4 overflow-hidden rounded-lg shadow-lg title"
            >
              <div className="grid w-full grid-cols-4 md:grid-cols-6 sm:grid-cols-6 gap-16 md:gap-2 sm:gap-2 text-[14px] p-4 text-white bg-[#2B2A29]">
                <div className="col-span-1 uppercase md:col-span-2 sm:col-span-3">
                  <p className="text-[12px]">Pedido Realizado</p>
                  <p>{formatNormalDate(order.created_at)}</p>
                </div>
                <div className="col-span-1 uppercase md:col-span-2 sm:col-span-3">
                  <p className="text-[12px]">Pedido por</p>
                  <p>{order.buyer}</p>
                </div>
                <div className="flex flex-col items-end col-span-2 uppercase md:col-span-6 sm:col-span-6">
                  <p className="text-[12px]">ORDEN</p>
                  <p
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowDetails(true);
                    }}
                    className="lowercase cursor-pointer"
                  >
                    Ver detalles de la orden
                  </p>
                </div>
              </div>
              <div className="grid w-full grid-cols-8 gap-4 p-4">
                <div className="flex flex-col items-start col-span-6 md:col-span-8 sm:col-span-8">
                  <p className="text-[20px] title">
                    Entrega el {formatFinalDate(order.created_at)}
                  </p>
                  <p className="text-[13px]">
                    Todos los productos seran entregados en el mismo envio
                  </p>
                  <div className="my-2 text-[14px]">
                    <p>
                      <span className="font-semibold">
                        Cantidad de productos:{" "}
                      </span>
                      {order.order_items.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </p>
                    <p>
                      <span className="font-semibold">Dirección: </span>
                      {order.shipping_address && direction}
                    </p>
                    <p>
                      <span className="font-semibold">Estado: </span>
                      {order.status}
                    </p>
                    <p>
                      <span className="font-semibold">Total: </span>$
                      {order.total_cost.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 text-[13px] space-y-2 flex flex-col justify-end items-end md:col-span-8 sm:col-span-8 md:items-start sm:items-start">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowDetails(true);
                    }}
                    className="w-[180px] sm: py-1 font-semibold text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md "
                  >
                    Ver detalle e items
                  </button>
                  {order.status !== "Completada" && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="w-[180px] py-1 font-semibold text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md"
                    >
                      Cancelar orden
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center w-full p-5 bg-gray-50 rounded-b-md">
          <p>Aun no has realizado ningun pedido</p>
          <p>Busca algunos productos en nuestra tienda y comienza a comprar</p>
          <Link
            to={"/products"}
            className="py-2 px-3 mt-2 font-bold text-center text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md "
          >
            Comenzar a comprar
          </Link>
        </div>
      )}
    </>
  );
}
