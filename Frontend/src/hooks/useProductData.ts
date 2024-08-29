import { useContext } from "react";
import { ProductContext } from "../context/products";

export const useProductData = () => {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
