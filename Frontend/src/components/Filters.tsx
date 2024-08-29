/* eslint-disable react-hooks/exhaustive-deps */
import star from "../assets/star.svg";
import half_star from "../assets/half-star.svg";
import no_star from "../assets/no-star.svg";
import clear from "../assets/clear.svg";
import check from "../assets/check.svg";
import menu from "../assets/menu.svg";
import { useState } from "react";
import { useFilters } from "../hooks/useFilters";
import { useSearchParams } from "react-router-dom";
import { useProductData } from "../context/products";

export default function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const { categories } = useProductData();
  const [showModalRating, setShowModalRating] = useState<boolean>(false);
  const { filters, setFilters } = useFilters();

  const handleChangeMinPrice = (event: string | null) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: event !== null && event !== "" ? parseInt(event) : null,
    }));
    if (event) {
      newSearchParams.set("minPrice", event);
      setSearchParams(newSearchParams);
    } else {
      newSearchParams.delete("minPrice");
      setSearchParams(newSearchParams);
    }
  };

  const handleChangeMaxPrice = (event: string | null) => {
    222;
    setFilters((prevState) => ({
      ...prevState,
      maxPrice: event !== null && event !== "" ? parseInt(event) : null,
    }));
    if (event) {
      newSearchParams.set("maxPrice", event);
      setSearchParams(newSearchParams);
    } else {
      newSearchParams.delete("maxPrice");
      setSearchParams(newSearchParams);
    }
  };

  const handleChangeCategory = (event: string | null) => {
    setFilters((prevState) => ({
      ...prevState,
      category: event,
    }));
    if (event) {
      newSearchParams.set("category", event);
      setSearchParams(newSearchParams);
    } else {
      newSearchParams.delete("category");
      setSearchParams(newSearchParams);
    }
  };

  const handleChangeRating = (event: number | null) => {
    setFilters((prevState) => ({
      ...prevState,
      rating: event,
    }));
    if (event) {
      newSearchParams.set("rating", event.toString());
      setSearchParams(newSearchParams);
    } else {
      newSearchParams.delete("rating");
      setSearchParams(newSearchParams);
    }
  };
  return (
    <div className="w-[280px] h-full space-y-8 mb-16 text-[14px] sm:bg-gray-50">
      <div className="overflow-hidden rounded-sm">
        <div className="flex items-center justify-between w-full p-2 bg-[#000000eb] ">
          <div className="flex items-center px-2 space-x-2">
            <img className="h-[18px]" src={menu} alt="" />
            <h3 className="font-semibold text-white title">Categorias</h3>
          </div>
          <img
            onClick={() => handleChangeCategory(null)}
            className="w-[18px] cursor-pointer"
            src={clear}
            alt=""
          />
        </div>
        <ul className="text-[13px] border border-gray-200 bg-white">
          {categories &&
            categories.map((categorie) => {
              return (
                <li
                  key={categorie.id}
                  onClick={() => handleChangeCategory(categorie.name)}
                  className="flex items-center justify-between p-1 px-2 border-b border-gray-100 cursor-pointer group hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-1">
                    <div className="flex bg-gray-100 rounded-full w-[30px] h-[30px] justify-center items-center">
                      <img
                        className="h-[20px] w-[20px]"
                        src={categorie.icon}
                        alt=""
                      />
                    </div>
                    <p className="group-hover:text-[#F26522] title">
                      {categorie.name}
                    </p>
                  </div>
                  {filters.category === categorie.name && (
                    <img className="w-[18px]" src={check} alt="" />
                  )}
                </li>
              );
            })}
        </ul>
      </div>
      <div className="overflow-hidden rounded-sm">
        <div className="flex items-center justify-between w-full p-2 bg-[#000000eb] ">
          <div className="flex items-center space-x-2">
            <img className="h-[18px]" src={menu} alt="" />
            <h3 className="font-semibold text-white title">Precio</h3>
          </div>
          <img
            onClick={() => {
              handleChangeMinPrice(null);
              handleChangeMaxPrice(null);
            }}
            className="w-[18px] cursor-pointer"
            src={clear}
            alt=""
          />
        </div>
        <div className="flex justify-between px-2 py-2 bg-white border border-gray-200">
          <div className="flex items-center">
            <span className="text-gray-700">Min</span>
            <input
              onChange={(e) => handleChangeMinPrice(e.target.value)}
              type="number"
              className="p-2 ml-3 text-center border rounded w-[80px]"
              value={filters.minPrice ?? ""}
            />
          </div>
          <div className="flex items-center mx-2 text-gray-700">-</div>
          <div className="flex items-center">
            <span className="text-gray-700">Max</span>
            <input
              onChange={(e) => handleChangeMaxPrice(e.target.value)}
              type="number"
              className="p-2 ml-3 text-center border rounded w-[80px]"
              value={filters.maxPrice ?? ""}
            />
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-sm">
        <div className="flex items-center justify-between w-full p-2 bg-[#000000eb] ">
          <div className="flex items-center space-x-2">
            <img className="h-[18px]" src={menu} alt="" />
            <h3 className="font-semibold text-white title">Rating</h3>
          </div>
          <img
            onClick={() => {
              handleChangeRating(null);
              setShowModalRating(false);
            }}
            className="w-[18px] cursor-pointer"
            src={clear}
            alt=""
          />
        </div>
        <div className="relative flex justify-between px-2 py-2 bg-white border border-gray-200">
          <div
            onClick={() => setShowModalRating(!showModalRating)}
            className="w-full p-2 bg-white cursor-pointer"
          >
            {filters.rating ? (
              <div className="flex">
                {filters.rating !== null &&
                  [...Array(5)].map((_, index) => {
                    let starImage;
                    if (index < Math.floor(filters.rating!)) {
                      starImage = star;
                    } else if (index < filters.rating!) {
                      starImage = half_star;
                    } else {
                      starImage = no_star;
                    }
                    return (
                      <img
                        className="w-[20px]"
                        key={index}
                        src={starImage}
                        alt=""
                      />
                    );
                  })}
              </div>
            ) : (
              <p> Seleccione un rating</p>
            )}
          </div>
        </div>
        {showModalRating && (
          <div className="absolute w-[280px] border border-gray-200">
            <ul>
              {Array.from({ length: 11 }, (_, index) => {
                const starts = index * 0.5;
                return (
                  <li
                    onClick={() => {
                      handleChangeRating(starts);
                      setShowModalRating(false);
                    }}
                    key={index}
                    className="px-4 py-1 bg-white cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, index) => {
                        let starImage;
                        if (index < Math.floor(starts)) {
                          starImage = star;
                        } else if (index < starts) {
                          starImage = half_star;
                        } else {
                          starImage = no_star;
                        }
                        return (
                          <img
                            className="w-[20px]"
                            key={index}
                            src={starImage}
                            alt=""
                          />
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
