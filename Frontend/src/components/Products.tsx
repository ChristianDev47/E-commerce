/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useFilters } from '../hooks/useFilters.ts';
import { useProductData } from '../hooks/useProductData.ts';
import Filters from './Filters.tsx';
import ReactPaginate from 'react-paginate';
import { Product } from '../types/types';
import { ProductCard } from './Product.tsx';
import { useSearchParams } from 'react-router-dom';
import filterIcon from '../assets/filter.svg';

export function Products() {
  const [searchParams] = useSearchParams();
  const { products } = useProductData();
  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(products);
  const { setFilters, filters } = useFilters();

  const [currentItems, setCurrentItems] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const selectedName =
      searchParams.get('search') || null;
    const selectedCategory =
      searchParams.get('category') || null;
    const selectedMinPrice =
      parseInt(searchParams.get('minPrice') || '') || null;
    const selectedMaxPrice =
      parseInt(searchParams.get('maxPrice') || '') || null;
    const selectedRating =
      parseInt(searchParams.get('rating') || '') || null;

    setFilters({
      search: selectedName,
      category: selectedCategory,
      minPrice: selectedMinPrice,
      maxPrice: selectedMaxPrice,
      rating: selectedRating,
    });
  }, [searchParams]);

  useEffect(() => {
    if (filteredProducts) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, products, searchParams, filters]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(Math.min(newOffset, filteredProducts.length - itemsPerPage));
  };

  return (
    <>
      <div className=" 2xl:mt-[3rem] xl:mt-[3rem] mt-[1.5rem] w-full flex flex-col items-center ">
        <div className="max-w-[1700px] flex space-x-8 sm:space-x-0  md:space-x-0 lg:space-x-0 w-full 2xl:px-[9rem] px-[2rem]">
          <div className="sm:hidden md:hidden lg:hidden">
            <Filters />
          </div>
          <div className="overflow-hidden">
            <div className="flex justify-between mb-4 sm:space-x-4 md:space-x-4 lg:space-x-4 sm:relative md:relative lg:relative">
              <div>
                <h3 className="title font-semibold text-[20px]">
                  Nuestros Productos
                </h3>
                <p className="text-[14px]">
                  Consulte la página de cada producto para conocer otras
                  opciones de compra.
                </p>
              </div>
              <img
                onClick={() => setShowFilters(!showFilters)}
                className="w-[30px] hidden sm:block md:block lg:block cursor-pointer"
                src={filterIcon}
                alt=""
              />
              <div
                className={`absolute right-0 z-50 top-20 ${
                  showFilters === true ? 'block' : 'hidden'
                }`}
              >
                <Filters />
              </div>
            </div>
            {currentItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-4 overflow-x-hidden">
                  <ProductCard products={currentItems} />
                </div>
                <ReactPaginate
                  className="flex items-center justify-center my-8"
                  previousLabel={'Anterior'}
                  nextLabel={'Siguiente'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={'pagination'}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                  previousClassName={'page-item'}
                  previousLinkClassName={'page-link'}
                  nextClassName={'page-item'}
                  nextLinkClassName={'page-link'}
                  breakLinkClassName={'page-link'}
                  activeClassName={'active'}
                />
              </>
            ):
            <p>Sin resultados</p>
            }
          </div>
        </div>
      </div>
    </>
  );
}
