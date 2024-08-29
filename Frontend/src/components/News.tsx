/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useFilters } from "../hooks/useFilters.ts";
import Filters from "./Filters.tsx";
import { useSearchParams } from "react-router-dom";
import { Card } from "./Card.tsx";
import { useProductData } from "../hooks/useProductData.ts";
import filterIcon from "../assets/filter.svg";

export function NewProducts() {
  const { products, FilteredProducts } = useProductData();
  const [searchParams] = useSearchParams();
  const { setFilters, filterProducts } = useFilters();
  const [showFilters, setShowFilters] = useState<boolean>(false);

  useEffect(() => {
    const selectedName = searchParams.get("search") || null;
    const selectedCategory = searchParams.get("category") || null;
    const selectedMinPrice =
      parseInt(searchParams.get("minPrice") || "") || null;
    const selectedMaxPrice =
      parseInt(searchParams.get("maxPrice") || "") || null;
    const selectedRating =
      parseInt(searchParams.get("rating") || "") || null;

    setFilters({
      search: selectedName,
      category: selectedCategory,
      minPrice: selectedMinPrice,
      maxPrice: selectedMaxPrice,
      rating: selectedRating,
    });
  }, []);
  return (
    <>
      <div className="w-full 2xl:mt-[3rem] xl:mt-[3rem] mt-[1.5rem] space-x-8 flex flex-col items-center">
        <div className="max-w-[1700px] w-full flex space-x-8 sm:space-x-0  md:space-x-0 lg:space-x-0  2xl:px-[9rem] px-[2rem]">
          <div className="sm:hidden md:hidden lg:hidden">
            <Filters />
          </div>
          <div className="relative w-full mb-5">
            <div className="flex justify-between my-2 2xl:hidden xl:hidden">
              <h3 className="title font-semibold text-[16px]">
                Filtrar productos
              </h3>
              <img
                onClick={() => setShowFilters(!showFilters)}
                className="w-[30px] hidden sm:block md:block lg:block cursor-pointer"
                src={filterIcon}
                alt=""
              />
            </div>
            <div
              className={`absolute right-0 z-50 top-11 bg-white ${
                showFilters === true ? "block" : "hidden"
              }`}
            >
              <Filters />
            </div>
            <div
              className="relative flex items-center justify-center w-full h-[280px] bg-center bg-cover col-span-1 mb-2 rounded-lg sm:hidden"
              style={{ backgroundImage: "url(/images/category2.jpg)" }}
            >
              <div className="absolute w-[50%] left-8 top-14 flex flex-col justify-center items-start space-y-2 ">
                <p className=" text-start font-semibold text-[32px] leading-[2.5rem] text-white title mb-1">
                  Descubre todas nuestras novedades
                </p>
                <p className="w-[80%] text-[14px] title text-white">
                  Consulte la página para descubrir la amplia variedad de
                  productos divididos por categoria, precio y rating. Todos
                  adaptados a tus comodidades, facilidad de busqueda y compra.
                </p>
              </div>
            </div>
            {
              FilteredProducts(filterProducts(products)).length > 0 ?
              <div className="grid grid-cols-4 overflow-hidden gap-x-2 gap-y-5 md:grid-cols-3 sm:grid-cols-2">
                <Card products={FilteredProducts(filterProducts(products))} />
              </div>
              :
              <p>Sin resultados</p>
            }
          </div>
        </div>
      </div>
    </>
  );
}
