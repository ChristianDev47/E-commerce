import { useReducer, createContext, ReactNode } from "react";
import { cartReducer, cartInitialState } from "../reducers/cart";
import { Product, ProductCart } from "../types/types";

// Contexto
interface CartContextProps {
  cart: ProductCart[];
  addToCart: (product: Product) => void;
  restToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product: Product) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });

  const restToCart = (product: Product) =>
    dispatch({
      type: "REST_TO_CART",
      payload: product,
    });

  const removeFromCart = (product: Product) =>
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });

  const clearCart = () =>
    dispatch({
      type: "CLEAR_CART",
    });

  return { state, addToCart, restToCart, removeFromCart, clearCart };
}

interface CartProviderProps {
  children: ReactNode;
}

// Provider
export function CartProvider({ children }: CartProviderProps) {
  const { state, addToCart, restToCart, removeFromCart, clearCart } =
    useCartReducer();

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        restToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
