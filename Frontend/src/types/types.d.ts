interface Category {
  id: number;
  name: string;
  icon: string;
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  quantity?: number;
  rating: number;
  description: string;
  images: ProductImage[];
  creationAt: string;
  updatedAt: string;
  category: Category;
}

interface ProductImage {
  id: string;
  image: string;
  product: number;
}

export type ProductCart = {
  id: number;
  title: string;
  price: number;
  rating: number;
  description: string;
  images: ProductImage[];
  category: Category;
  quantity?: number;
  creationAt: string;
  updatedAt: string;
};

export interface SearchProps {
  search: string;
}

interface FiltersState {
  search: string | null;
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  rating: number | null;
}

interface FiltersOrder {
  status: string;
  date: string;
}
