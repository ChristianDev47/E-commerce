/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ListOrders from "./ListOrders";
import OrderDetails from "./OrderDetail";
import { useOrderFilters } from "../../hooks/useOrderFilter";
import { useOrder } from "../../hooks/useOrder";

export default function Orders() {
  const { orders: myOrder } = useOrder();
  const [orders, setOrders] = useState<OrdersType[]>(myOrder);
  const [selectedOrder, setSelectedOrder] = useState<OrdersType>();
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const { setFilters, filters, filterOrders } = useOrderFilters();

  useEffect(() => {
    setOrders(filterOrders(myOrder));
  }, [filters]);

  useEffect(() => {
    if (showDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showDetails]);

  return (
    <div className="relative flex items-center justify-center">
      <div className={` h-full ${showDetails === true ? "block" : "hidden"}`}>
        <OrderDetails
          selectedOrder={selectedOrder}
          setShowDetails={setShowDetails}
        />
      </div>
      <div className="flex items-center justify-center w-full max-w-[1700px]">
        <div className="flex flex-col items-start justify-center w-full 2xl:px-[9rem] px-[2rem] my-8">
          <h3 className="text-[23px] title">Tus ordenes</h3>
          <div className="flex md:flex-col md:items-start sm:flex-col sm:items-start py-2 items-center justify-between  w-full text-[14px] border-b-2 border-[#2b2a297d]">
            <ul className="flex space-x-16 font-semibold text-black lg:space-x-8 md:space-x-8 sm:space-x-8 title">
              <li
                onClick={() => setFilters({ status: "all", date: "all" })}
                className="cursor-pointer hover:text-[#F26522] transition-all duration-200"
              >
                Ordenes
              </li>
              <li
                onClick={() =>
                  setFilters((prevState) => ({
                    ...prevState,
                    status: "Completada",
                  }))
                }
                className="cursor-pointer hover:text-[#F26522] transition-all duration-200"
              >
                Ordenes Completadas
              </li>
              <li
                onClick={() =>
                  setFilters((prevState) => ({
                    ...prevState,
                    status: "Cancelada",
                  }))
                }
                className="cursor-pointer hover:text-[#F26522] transition-all duration-200"
              >
                Ordenes canceladas
              </li>
            </ul>
            <div className="flex items-center space-x-2">
              <p>{orders?.length} pedidos realizados en </p>
              <select
                onChange={(e) =>
                  setFilters((prevState) => ({
                    ...prevState,
                    date: e.target.value,
                  }))
                }
                className="p-2 border border-gray-200 rounded-lg outline-none cursor-pointer bg-gray-50"
                name=""
                id=""
              >
                <option value="30">últimos 30 días</option>
                <option value="90">últimos 3 meses</option>
                <option value="year">este año</option>
                <option value="all">todos</option>
              </select>
            </div>
          </div>
          <ListOrders
            orders={orders}
            setSelectedOrder={setSelectedOrder}
            setShowDetails={setShowDetails}
          />
        </div>
      </div>
    </div>
  );
}
