import { Product, ProductCart } from "../types/types";
import Cookies from "js-cookie";
import { compress, decompress } from "../services/encryptCookie";

export const cartInitialState = Cookies.get("cart")
  ? decompress(Cookies.get("cart")!)
  : [];

export const CART_ACTION_TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REST_TO_CART: "REST_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
} as const;

interface AddToCartAction {
  type: typeof CART_ACTION_TYPES.ADD_TO_CART;
  payload: Product;
}

interface RestToCartAction {
  type: typeof CART_ACTION_TYPES.REST_TO_CART;
  payload: Product;
}

interface RemoveFromCartAction {
  type: typeof CART_ACTION_TYPES.REMOVE_FROM_CART;
  payload: Product;
}

interface ClearCartAction {
  type: typeof CART_ACTION_TYPES.CLEAR_CART;
}

type CartAction =
  | AddToCartAction
  | RestToCartAction
  | RemoveFromCartAction
  | ClearCartAction;

export const updateCartStorage = (state: ProductCart[]): void => {
  const compressedState = compress(state);
  Cookies.set("cart", compressedState);
};

const UPDATE_STATE_BY_ACTION = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (
    state: Product[],
    action: AddToCartAction
  ) => {
    const { id } = action.payload;
    const productInCartIndex = state.findIndex((item) => item.id === id);

    if (
      productInCartIndex >= 0 &&
      (state[productInCartIndex]?.quantity ?? 0) > 0
    ) {
      const newState = [
        ...state.slice(0, productInCartIndex),
        {
          ...state[productInCartIndex]!,
          quantity: (state[productInCartIndex]?.quantity ?? 0) + 1,
        },
        ...state.slice(productInCartIndex + 1),
      ];

      updateCartStorage(newState);
      return newState;
    }

    const newState = [
      ...state,
      {
        ...action.payload,
        quantity: 1,
      },
    ];

    updateCartStorage(newState);
    return newState;
  },
  [CART_ACTION_TYPES.REST_TO_CART]: (
    state: Product[],
    action: RestToCartAction
  ) => {
    const { id } = action.payload;
    const productInCartIndex = state.findIndex((item) => item.id === id);

    if (
      productInCartIndex >= 0 &&
      (state[productInCartIndex]?.quantity ?? 0) > 0
    ) {
      const quantity = (state[productInCartIndex]?.quantity ?? 0) - 1;
      const newState = [
        ...state.slice(0, productInCartIndex),
        { ...state[productInCartIndex]!, quantity: Math.max(quantity, 0) },
        ...state.slice(productInCartIndex + 1),
      ];
      updateCartStorage(newState);
      return newState;
    }

    const newState = [
      ...state,
      {
        ...action.payload,
        quantity: 1,
      },
    ];

    updateCartStorage(newState);
    return newState;
  },
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (
    state: Product[],
    action: RemoveFromCartAction
  ) => {
    const { id } = action.payload;
    const newState = state.filter((item) => item.id !== id);
    updateCartStorage(newState);
    return newState;
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    updateCartStorage([]);
    return [];
  },
};

// Reducer function
export const cartReducer = (
  state: ProductCart[] = cartInitialState,
  action: CartAction
): ProductCart[] => {
  const { type: actionType } = action;
  const updateState = UPDATE_STATE_BY_ACTION[actionType];
  return action
    ? (
        updateState as (
          state: ProductCart[],
          action: CartAction
        ) => ProductCart[]
      )(state, action)
    : state;
};
