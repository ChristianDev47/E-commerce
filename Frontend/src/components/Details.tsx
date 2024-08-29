/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getLocation } from "../services/products.ts";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import star from "../assets/star.svg";
import half_star from "../assets/half-star.svg";
import no_star from "../assets/no-star.svg";
import select from "../assets/arrowSelect.svg";
import location from "../assets/location.svg";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import DetailFax from "./Details/Taxs.tsx";
import { useProductData } from "../hooks/useProductData.ts";
import { useCart } from "../hooks/useCart.ts";
import { Recomenations } from "./Recomendations.tsx";
import InnerImageZoom from "react-inner-image-zoom";
import toast from "react-hot-toast";

export function ProductDetails() {
  const params = useParams<{ id: string }>();
  const { product, getProduct } = useProductData();
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [country, setCountry] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const priceInteger = product?.price.toString().split(".")[0];
  const priceDecimal = product?.price.toString().split(".")[1];
  const navigateTo = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {

    const getMyLocation = async () => {
      if (params.id) {
        getProduct(params.id);
      }
      const response = await getLocation();
      setCountry(response.countryName);
    };
    getMyLocation();
  }, [params.id]);

  const getDeliveryDate = () => {
    const actualDate = new Date();
    const myDate = addDays(actualDate, 5);
    const deliveryDate = format(myDate, "EEEE dd 'de' MMMM", { locale: es });
    return deliveryDate;
  };

  const handleAddCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        toast.success(`Has agregado ${product.title} a tu carrito`, {
          duration: 4000,
          style: {
            background: "#7DA640",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#000",
          },
        });
        addToCart(product);
      }
    }
  };


  return (
    <div className="flex flex-col items-center w-full my-10 overflow-x-hidden">
      <div className="max-w-[1700px] w-full 2xl:px-[9rem] px-[2rem]">
        <div className="grid w-full h-full grid-cols-5 gap-4 lg:grid-cols-7 md:grid-cols-7 sm:grid-cols-7">
          <div className="relative flex justify-center w-full col-span-2 space-x-2 sm:flex-col lg:col-span-5 lg:row-start-2 lg:row-span-1 md:col-span-7 md:row-start-2 md:row-span-1 sm:col-span-7 sm:row-start-2 sm:row-span-1 items-star">
            <ul className="space-y-2 sm:flex sm:space-y-0 sm:space-x-2 sm:mb-4">
              {product?.images &&
                product.images.map((image, index) => {
                  return (
                    <li
                      key={index}
                      onMouseEnter={() => setSelectedImage(index)}
                    >
                      <img
                        className={`w-[120px] sm:w-[80px] rounded-md border-2 cursor-pointer ${
                          selectedImage === index
                            ? "border-[#F26522]"
                            : "border-gray-500"
                        }`}
                        src={image.image}
                        alt=""
                      />
                    </li>
                  );
                })}
            </ul>
            <div className="h-full">
              {product && (
                <InnerImageZoom
                  className="rounded-lg"
                  src={product.images[selectedImage].image}
                  zoomSrc={product.images[selectedImage].image}
                />
              )}
            </div>
          </div>
          <div className="col-span-2 space-y-4 titulo lg:col-span-7 md:col-span-7 sm:col-span-7">
            <div className="pb-2 border-b border-gray-500">
              <h3 className="text-[27px] font-semibold leading-7">
                {product?.title}
              </h3>
              <Link to={`/products/filters?category=${product?.category.name}`} className="text-[14px] hover:text-[#128cca] cursor-pointer mt-2">
                Visita tambien la sección de {product?.category.name}
              </Link>
            </div>
            <p>{product?.description}</p>
            <div className="flex items-end justify-star ">
              <p className="mr-2 text-[18px]">{product?.rating}</p>
              {product?.rating &&
                [...Array(5)].map((_, index) => {
                  let starImage;
                  if (index < Math.floor(product?.rating)) {
                    starImage = star;
                  } else if (index < product?.rating) {
                    starImage = half_star;
                  } else {
                    starImage = no_star;
                  }
                  return (
                    <img
                      className="w-[25px]"
                      key={index}
                      src={starImage}
                      alt=""
                    />
                  );
                })}
            </div>
            <div className="relative z-30 flex flex-col items-start ">
              <div className="flex mb-2 space-x-2">
                <p>Precio: </p>
                <p className="text-[22px] m-0 p-0 text-red-700">
                  ${product?.price}
                </p>
              </div>
              <p className="inline-flex text-[13px]">
                $85.05 Gastos de Envío e Importación Depósito a {country}
              </p>
              <p
                onClick={() => setShowDetail(true)}
                className="text-[#128cca] text-[13px] font-semibold cursor-pointer"
              >
                Ver los detalles
              </p>
            </div>
            {product?.quantity && product.quantity > 0 ? (
              <p className="text-[20px] text-green-700 font-semibold">
                Disponible
              </p>
            ) : (
              <p className="text-[20px] text-red-700 font-semibold">
                No disponible
              </p>
            )}
          </div>
          <div className="h-full p-3 border-2 border-gray-200 rounded-md shadow-xl text-[14px] space-y-4 lg:col-span-2 lg:row-start-2 lg:row-span-1 md:col-span-7 md:row-start-3 md:row-span-1  sm:col-span-7 sm:row-start-3 sm:row-span-1">
            <div className="flex items-start justify-start space-x-1 font-semibold">
              <p className="text-[14px]">$</p>
              <p className="text-[24px]">{priceInteger}</p>
              <p className="text-[14px]">{priceDecimal}</p>
            </div>
            <div className="relative">
              <p>$85.05 Gastos de Envío e Importación Depósito a {country}</p>
              <div
                onClick={() => setShowDetail(true)}
                className="flex space-x-1 cursor-pointer"
              >
                <p className="text-[#128cca] font-semibold">Detalles</p>{" "}
                <img className="w-[15px]" src={select} alt="" />
              </div>
              <div className="absolute right-0 z-40">
                {showDetail && (
                  <DetailFax
                    price={product ? product.price : 0}
                    setShowDetail={setShowDetail}
                  />
                )}
              </div>
              <p>Entrega {getDeliveryDate()}</p>
            </div>
            <div className="flex space-x-1 cursor-pointer">
              <img className="w-[14px]" src={location} alt="" />
              <p className="text-[#128cca] text-[12px] font-semibold">
                Entregar a {country}
              </p>
            </div>
            <div className="text-[12px] space-y-1">
              <p>Cantidad:</p>
              <div className="flex">
                <button
                  onClick={() => setQuantity((prevState) => prevState - 1)}
                  className="p-1 bg-gray-400"
                  disabled={quantity == 1 ? true : false}
                >
                  <img className="w-[15px]" src={minus} alt="" />
                </button>
                <div className="w-[40px] h-auto relative">
                  <p className="absolute inset-0 flex items-center justify-center cursor-default">
                    {quantity}
                  </p>
                </div>
                <button
                  onClick={() => setQuantity((prevState) => prevState + 1)}
                  className="p-1 bg-gray-400"
                >
                  <img className="w-[15px]" src={plus} alt="" />
                </button>
              </div>
            </div>
            <p className="text-[12px]">
              Una vez comprado el producto debe verificar sus datos personales
              de envio, teniendo en cuenta que el pedido llegara 5 dias despues
              de la compra, teniendo 30 dias un periodo de reembolso del
              producto.
            </p>
            <button
              onClick={() => handleAddCart()}
              className="w-full p-1 text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-2xl"
            >
              Añadir a la cesta
            </button>
            <button
              onClick={() => {
                handleAddCart();
                navigateTo("/card_details");
              }}
              className="w-full p-1 text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-2xl"
            >
              Comprar ahora
            </button>
          </div>
        </div>
        <Recomenations category={product?.category.name} />
      </div>
    </div>
  );
}
