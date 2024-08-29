import { useEffect, useState } from 'react';
import { Product } from '../types/types';
import { Link } from 'react-router-dom';
import star from '../assets/star.svg';
import half_star from '../assets/half-star.svg';
import no_star from '../assets/no-star.svg';
import cartWhiteIcon from '../assets/cart.svg';
import viewIcon from '../assets/view.svg';
import { useCart } from '../hooks/useCart';
import toast from 'react-hot-toast';

interface Props {
  products: Product[];
  closeModal?: () => void;
}

export function Card({ products, closeModal }: Props) {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    setSelectedImages(products.map(() => 0));
  }, [products]);

  const handleAddCart = (product: Product) => {
    if (cart.filter((c) => c.id === product.id).length <= 0) {
      toast.success(`Has agregado ${product.title} a tu carrito`, {
        duration: 4000,
        style: {
          background: '#7DA640',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#000',
        },
      });
    }
    addToCart(product);
  };

  return (
    <>
      {products.map((product, productIndex) => (
        <div
          key={product.id}
          className={`w-full h-full border border-gray-200 bg-[#fff] group  hover:scale-[102%] transition-all  duration-300 hover:customShadow  hover:border-none rounded-lg overflow group flex flex-col justify-between my-2`}
        >
          <div className="relative flex justify-center w-full">
            {product.images[selectedImages[productIndex]] && (
              <img
                className="w-full"
                src={product.images[selectedImages[productIndex]].image}
                alt={`Product ${product.title}`}
              />
            )}
            <div className="absolute invisible space-y-1 transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 group-hover:visible top-4 right-4">
              <div
                title="Vista rápida"
                className="hover:bg-[#F26522] transition-all duration-200 bg-[#2b2a29b7] rounded-full cursor-pointer w-[32px]"
              >
                <Link to={`/product/${product.id}`} onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                    }); closeModal && closeModal()
                  }} >
                  <img className="w-full p-2" src={viewIcon} alt="" />
                </Link>
              </div>
            </div>

            <div className="absolute invisible space-y-1 transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 group-hover:visible top-4 left-4 ">
              <div
                onClick={() => handleAddCart(product)}
                title="Añadir al carrito"
                className="hover:bg-[#F26522] transition-all duration-200 bg-[#2b2a29b7]  rounded-full cursor-pointer w-[32px]"
              >
                <img className="w-full p-2" src={cartWhiteIcon} alt="" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full h-full px-4 my-2 space-y-4">
            <p className="text-sm group-hover:text-[#F26522]">
              {product.title}
            </p>
            <div>
              <div className="flex items-center justify-between lg:flex-col lg:items-start md:flex-col md:items-start sm:flex-col sm:items-start">
                <div className="flex items-center justify-start w-[20px]">
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
                      return <img key={index} src={starImage} alt="" />;
                    })}
                </div>
                <p className="font-semibold text-[18px]">${product.price}</p>
              </div>
              <div className="flex items-center justify-between lg:flex-col lg:items-start lg:space-y-2 md:flex-col md:items-start md:space-y-2 sm:flex-col sm:items-start sm:space-y-2">
                <div
                  className={` border border-gray-500 px-2 text-[12px] rounded-lg title`}
                >
                  {product.quantity ?? 0 > 0 ? 'Disponible' : 'Agotado'}
                </div>
                <div className="flex justify-start space-x-1">
                  {product.images &&
                    product.images.map((image, imageIndex) => (
                      <div key={image.id} className="w-7">
                        <img
                          className={` rounded-2xl cursor-pointer ${
                            selectedImages[productIndex] === imageIndex
                              ? 'border-2 border-[#F26522]'
                              : ''
                          }`}
                          src={image.image}
                          alt={`Thumbnail ${imageIndex}`}
                          onClick={() => {
                            setSelectedImages((prevSelectedImages) => {
                              const newSelectedImages = [...prevSelectedImages];
                              newSelectedImages[productIndex] = imageIndex;
                              return newSelectedImages;
                            });
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
