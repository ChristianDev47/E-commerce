import { useContext } from "react";
import { FiltersContext, filterInitialState } from "../context/filters.jsx";
import { Product } from "../types/types.js";

export function useFilters() {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  const { filters, setFilters } = context;

  const filterProducts = (products: Product[]) => {
    return products.filter((product: Product) => {
      const searchMatch =
        !filters.search ||
        product.title.toLowerCase().includes(filters.search.toLowerCase());
      if (!searchMatch) {
        return false;
      }
      const inPriceRange =
        (!filters.maxPrice && !filters.minPrice) ||
        (product.price >= (filters.minPrice ?? 0) &&
          product.price <= (filters.maxPrice ?? 0));
      const ratingMatch =
        !filters.rating ||
        product.rating.toString() === filters.rating.toFixed(1);
      const inCategory =
        !filters.category || filters.category === product.category.name;

      return searchMatch && inCategory && inPriceRange && ratingMatch;
    });
  };

  return { filters, filterProducts, setFilters, filterInitialState };
}
