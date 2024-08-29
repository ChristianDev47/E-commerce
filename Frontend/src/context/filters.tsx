/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, ReactNode } from "react";
import { FiltersState } from "../types/types";

export function filterInitialState(): FiltersState {
  return {
    search: null,
    category: null,
    minPrice: null,
    maxPrice: null,
    rating: null,
  };
}

interface FiltersContextProps {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
}

export const FiltersContext = createContext<FiltersContextProps | undefined>(
  undefined
);

interface FiltersProviderProps {
  children: ReactNode;
}

export function FiltersProvider({ children }: FiltersProviderProps) {
  const [filters, setFilters] = useState<FiltersState>(filterInitialState);

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}
