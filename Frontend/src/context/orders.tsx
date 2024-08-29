import { createContext, useState, ReactNode, FC, useEffect } from 'react';
import { getOrders, updateOrder } from '../services/order';

interface OrderContextType {
  orders: OrdersType[];
  cancelOrder: (id: number) => void;
  getMyOrders: () => void;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const OrderProvider: FC<ModalProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<OrdersType[]>([]);

  useEffect(() => {
    getMyOrders()
  },[])
  
  const getMyOrders = async () => {
    const orders = await getOrders();
    setOrders(orders);
  }

  const cancelOrder = async (id: number) => {
    const data = await updateOrder({ id, newData: { status: "Cancelada" } });
    console.log(data);
  }

  return (
    <OrderContext.Provider value={{ orders, getMyOrders, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
