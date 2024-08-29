import { Link } from 'react-router-dom';
import { useProductData } from '../hooks/useProductData.ts';
import { Card } from './Card.tsx';
import Slider from './Navbar/Slider.tsx';
import visit from '../assets/visit.svg';
import { Product } from '../types/types';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';

const options = {
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  nav: false,
  responsive: {
    0: {
      items: 2,
    },
    550: {
      items: 3,
    },
    841: {
      items: 5,
    },
  },
};

const shuffleArray = (array: Product[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export function Principal() {
  const { products, categories } = useProductData();
  const shuffledProducts = shuffleArray(products);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full h-full max-w-[1700px]">
        <div className="z-40 w-full bg-gradient-to-r from-gray-100 to-gray-200">
          <Slider />
        </div>
        <div className="space-y-16 mt-[2rem] 2xl:px-[9rem] px-[2rem] my-[4rem] w-full">
          <div>
            <div className="grid grid-cols-3 gap-2 my-4 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
              {categories.length > 0 &&
                categories.slice(0, 6).map((categorie) => {
                  return (
                    <Link
                      to={`/products/filters?category=${categorie.name}`}
                      key={categorie.id}
                      className="p-8 text-start group rounded-lg bg-gradient-to-br from-gray-100 to-gray-300 relative w-full h-[200px] overflow-hidden   lg:w-[100%] md:w-[100%] sm:w-[100%] col-span-1 group"
                    >
                      <div className="absolute rounded-full aspect-square bg-[#2B2A29] z-10 w-[800px] top-[-400px] left-[-800px] h-[600px] group-hover:top-[-250px] group-hover:left-[-50px] transition-all ease-in-out duration-700"></div>
                      <img
                        className=" h-[90%] sm:h-[70%] absolute bottom-[-20px] right-[-20px] group-hover:scale-110 transition-all duration-500 z-30 "
                        src={categorie.icon}
                        alt=""
                      />
                      <div className="relative z-30 overflow-hidden transition-all duration-700 ease-in-out group-hover:text-white">
                        <p className=" title text-[18px] ">Categoria</p>
                        <p className="text-[25px] title  text-[#ff6e2a] font-semibold">
                          {categorie.name}
                        </p>
                        <div className="flex items-center title text-[15px]">
                          <p>Ver más de la categia</p>{' '}
                          <img className="w-[20px]" src={visit} alt="" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="title text-[20px] font-semibold my-4">
                Nuestros Productos
              </h3>
              <Link to="/products" className="text-[13px] hover:text-[#F26522]">
                Ver todas
              </Link>
            </div>
            <div className="grid grid-cols-5 overflow-hidden gap-x-2 gap-y-5 md:grid-cols-3 sm:grid-cols-2">
              <div className="relative flex flex-col items-center justify-start col-span-2 row-span-2 p-8 mt-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 md:hidden sm:hidden">
                <img
                  className="absolute top-0 bottom-0 left-0 right-0 m-auto"
                  src="/images/principal/p1.png"
                  alt=""
                />
                <p className="text-center uppercase title text-[24px] mt-[7rem] title font-bold">
                  Nuevos productos <br /> y ofertas impresionantes
                </p>
                <p className="text-center uppercase title text-[16px] mt-[25rem]">
                  Todos los nuevos productos tecnologicos y al orden del dia
                  disponibles solo en EcomTrend
                </p>
                <Link
                  to="/new_products"
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                    });
                  }}
                  className="py-2 px-4 transition-all hover:bg-[#F26522] bg-[#2B2A29] text-white font-bold  rounded-md text-[15px] my-2 mt-[2rem]"
                >
                  EXPLORAR AHORA
                </Link>
              </div>
              <Card products={shuffledProducts.slice(0, 21)} />
            </div>
          </div>
          <div>
            <div className="w-full h-[600px] flex items-center justify-end mb-[5rem] lg:hidden md:hidden sm:hidden">
              <div
                className="relative w-full h-[600px] left-0 "
                style={{
                  background: `url('/images/principal/banner2.jpg') center/cover no-repeat`,
                }}
              >
                <div className="w-[55%] space-y-2 text-[35px] z-40 absolute top-[7rem] right-16">
                  <h2 className="font-semibold leading-[3rem] uppercase title">
                    Descubre una Nueva Forma de Comprar{' '}
                  </h2>
                  <p className="text-[16px]">
                    Olvídate de las compras aburridas y tradicionales, sumérgete
                    en un mundo digital donde puedes explorar productos únicos,
                    comparar productos tiempo real y aprovechar ofertas
                    especiales con nuevos productos. Nuestra plataforma está
                    diseñada para brindarte una experiencia fluida, rápida y
                    segura, desde la selección de productos hasta la entrega en
                    la puerta de tu casa. ¡Compra de manera más inteligente, con
                    la calidad y servicio que mereces!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="title text-[20px] font-semibold my-4">
                Nuestras Novedades
              </h3>
              <Link
                to="/new_products"
                className="text-[13px] hover:text-[#F26522]"
              >
                Ver todas
              </Link>
            </div>
            <OwlCarousel {...options} className="owl-theme ">
              <Card products={products.slice(0, 15)} />
            </OwlCarousel>
            <div className="w-full sm:hidden">
              <div
                className="relative flex items-center justify-center w-full h-[400px] bg-center bg-cover col-span-1 rounded-lg"
                style={{ backgroundImage: 'url(/images/principal/p2.jpeg)' }}
              >
                <div className="absolute w-[50%] left-8 top-24 flex flex-col justify-center items-start  ">
                  <p className=" text-start text-[#2B2A29] text-[35px] leading-[2.5rem] title mb-1 font-semibold">
                    Descubre todos nuestros productos
                  </p>
                  <p className="text-[16px] title">
                    Todos al mejor precio y con la mejor calidad
                  </p>
                  <Link  to="/new_products"
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                    });
                  }}className="py-2 px-4 transition-all hover:bg-[#F26522] bg-[#2B2A29] text-white font-bold  rounded-md text-[12px] my-2">
                    EXPLORAR AHORA
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
