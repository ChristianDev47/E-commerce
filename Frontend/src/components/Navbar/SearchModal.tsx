import { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "../Card";
import { useProductData } from "../../hooks/useProductData";
import { useFilters } from "../../hooks/useFilters";
import { debounce } from "lodash";
import { Product } from "../../types/types";


interface Props {
  searchRef: React.RefObject<HTMLInputElement>;
  closeModal: () => void;
}
export default function ModalSearch({
  searchRef,
  closeModal
}: Props) {
  const { products} = useProductData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsFind, setProductsFind] = useState<Product[]>(products);
  const [filterProducts, setFilterProducts] = useState<string>("");
  const { setFilters } = useFilters();

  const newSearchParams = new URLSearchParams(searchParams);
  const navigate = useNavigate();


  const handleSearchValue = useCallback(
    debounce((searchTerm) => {
      if (products.length > 0) {
        const productsFind = products
          .map((product) => {
            if (product.title.toLowerCase().includes(searchTerm)) {
              return product;
            }
            return undefined;
          })
          .filter((product): product is Product => product !== undefined);
  
        if (productsFind.length > 0) {
          setProductsFind(productsFind);
        } else {
          setProductsFind([]);
        }
      }
      if (searchTerm === '') {
        setProductsFind(products);
      }
    }, 300),
    []
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilterProducts(event.target.value)
      const searchTerm = event.target.value;
      handleSearchValue(searchTerm);
  };

  const handleSearch = () => {
    if (filterProducts && filterProducts !== "") {
      newSearchParams.set("search", filterProducts);
      setFilters((prevState) => ({
        ...prevState,
        search: filterProducts,
      }));
      setSearchParams(newSearchParams);
      navigate(`/products?search=${filterProducts}`);
    } else {
      newSearchParams.delete("search");
      setSearchParams(newSearchParams);
      navigate(`/products`);
    }
  };


  return (
    <div
      className="absolute top-24 right-20 left-[40rem] mx-auto z-[100] h-auto p-4 bg-white border border-gray-300 shadow-md w-[700px]"
    >
      <div className="flex items-center justify-between p-2 font-bold ">
        <h2>BUSCAR</h2>
      </div>
      <div className="relative">
        <input
          ref={searchRef}
          type="text"
          placeholder="Busca algun producto"
          name="search"
          onChange={(e) => {
            handleChange(e)
          }}
          className="w-full px-2 py-2 text-[16px] border-2 outline-none rounded-sm placeholder:text-gray-500 overflow-hidden  border-gray-100 bg-gray-100"                  
        />
      </div>
      <h2 className="p-2 mt-2 font-bold border-b-2">PRODUCTOS POPULARES</h2>
      <div className="z-50 grid w-full grid-cols-3 gap-3 mt-4 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
        <Card products={productsFind.slice(-3)} closeModal={closeModal}/>
      </div>
      <div className="mt-8">
        {filterProducts && productsFind.length > 0 && (
          <div
            onClick={() => {
              handleSearch();
              closeModal()
            }}
            className="w-full p-2 text-sm font-bold text-center uppercase bg-gray-200 border-b-2 cursor-pointer"
          >
            Ver todos los resultados ({productsFind.length})
          </div>
        )}
      </div>
      {filterProducts && productsFind.length === 0 && (
        <div className="w-full p-2 text-sm font-bold text-center uppercase bg-gray-200 border-b-2 cursor-pointer">
          Sin resultados{" "}
        </div>
      )}
    </div>
  );
}
