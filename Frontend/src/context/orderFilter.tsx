/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, ReactNode } from "react";
import { FiltersOrder } from "../types/types";

export function filterInitialState(): FiltersOrder {
  return {
    status: "all",
    date: "30",
  };
}

interface FiltersOrderContextProps {
  filters: FiltersOrder;
  setFilters: React.Dispatch<React.SetStateAction<FiltersOrder>>;
}

export const FiltersOrderContext = createContext<
  FiltersOrderContextProps | undefined
>(undefined);

interface FiltersProviderProps {
  children: ReactNode;
}

export function FiltersOrderProvider({ children }: FiltersProviderProps) {
  const [filters, setFilters] = useState<FiltersOrder>(filterInitialState());

  return (
    <FiltersOrderContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersOrderContext.Provider>
  );
}
