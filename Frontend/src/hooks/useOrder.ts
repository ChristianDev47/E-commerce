import { useContext } from "react";
import { OrderContext } from "../context/orders";

export const useOrder = () => {
  const context = useContext(OrderContext);

  if (context === undefined) {
    throw new Error("useOrder must be used within a modalProvider");
  }

  return context;
};
