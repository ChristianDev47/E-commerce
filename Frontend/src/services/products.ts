import { SearchProps } from "../types/types.d";
const API = "https://ecommerce-api-k49h.onrender.com";

// List
export const getProducts = async () => {
  const res = await fetch(`${API}/api/v1/products/`);
  const data = await res.json();
  return data.results;
};

export const getCategories = async () => {
  const res = await fetch(`${API}/api/v1/categories/`);
  const data = await res.json();
  return data.results;
};

// Search
export const searchProduct = async ({ search }: SearchProps) => {
  if (search === "") return null;
  try {
    const res = await fetch(`${API}/api/v1/products/${search}/`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("Error searching product");
  }
};

export const getLocation = async () => {
  const res = await fetch(
    "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es"
  );
  const data = await res.json();
  return data;
};
