import { useContext } from "react";
import {
  FiltersOrderContext,
  filterInitialState,
} from "../context/orderFilter.tsx";

export function useOrderFilters() {
  const context = useContext(FiltersOrderContext);

  if (!context) {
    throw new Error("useOrderFilters must be used within a FiltersProvider");
  }

  const { filters, setFilters } = context;

  const filterOrders = (orders: OrdersType[]): OrdersType[] => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return orders.filter((order: OrdersType) => {
      let inDate = false;
      const orderDate = new Date(order.created_at);
      switch (filters.date) {
        case "30":
          inDate =
            orderDate >=
            new Date(currentDate.setDate(currentDate.getDate() - 30));
          break;
        case "90":
          inDate =
            orderDate >=
            new Date(currentDate.setDate(currentDate.getDate() - 90));
          break;
        case "year":
          inDate = orderDate.getFullYear() === currentYear;
          break;
        case "all":
        default:
          inDate = true;
      }

      const inStatus =
        filters.status === "all" || filters.status === order.status;

      return inStatus && inDate;
    });
  };

  return { filters, filterOrders, setFilters, filterInitialState };
}
