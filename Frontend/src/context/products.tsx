/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  getCategories,
  getProducts,
} from "../services/products";
import { Category, Product } from "../types/types.d";

interface ProductContextProps {
  products: Product[];
  product: Product | null;
  categories: Category[];
  selectedImages: number[];
  setSelectedImages: React.Dispatch<React.SetStateAction<number[]>>;
  getProduct: (id: string) => Promise<void>;
  FilteredProducts: (products: Product[]) => Product[];
  RecomendProducts: (category: string) => Product[];
}

export const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

export const useProductData = (): ProductContextProps => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductData must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  useEffect(() => {
    async function listProducts() {
      const products = await getProducts();
      const newProducts = products.map((product: Product) => {
        return {
          ...product,
          images: [...product.images]
        };
      });
      setProducts(newProducts);
    }
    listProducts();
  }, []);

  useEffect(() => {
    async function listProducts() {
      const categories = await getCategories();
      setCategories(categories);
    }

    listProducts();
  }, []);

  const getProduct = async (id: string) => {
    const product = products.find(product => product.id === Number(id));
    if(product){
      setProduct(product);
    }
  };

  const FilteredProducts = (products: Product[]) => {
    const sortedProducts = products.sort(
      (a, b) =>
        new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime()
    );
    return sortedProducts;
  };

  const RecomendProducts = (category?: string) => {
    if (category) {
      const getData = products.filter(
        (product) => product.category.name === category
      );
      return getData;
    } else {
      return products;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        product,
        selectedImages,
        setSelectedImages,
        getProduct,
        FilteredProducts,
        RecomendProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
