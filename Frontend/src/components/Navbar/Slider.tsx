import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";

const options = {
  items: 1,
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  nav: false,
};

const slides = [
  {
    title: "Compra lo Mejor con la Calidad de Siempre",
    description:
      "Garantizamos la calidad de nuestros productos y tu satisfacción. Encuentra artículos que han sido rigurosamente seleccionados para cumplir con los más altos estándares, desde tecnología hasta moda.",
    image: "images/slider/banner9.png",
    alt: "Imagen del banner 3",
  },
  {
    title: "Descubre los Mejores Productos",
    description:
      "Explora nuestra amplia selección de productos que cubre todo lo que necesitas, desde ropa de moda, accesorios únicos, hasta electrodomésticos de última generación. ",
    image: "images/slider/banner10.png",
    alt: "Imagen del banner 1",
  },
  {
    title: "¡Aprovecha Nuestros Descuentos!",
    description:
      "Obtén hasta un 50% de descuento en una gran variedad de productos de todas las categorías. No te pierdas esta oportunidad única de ahorrar mientras compras artículos de alta calidad.",
    image: "images/slider/banner4.png",
    alt: "Imagen del banner 2",
  },
];


export default function Slider() {
  return (
    <OwlCarousel {...options} className="z-40 owl-theme">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="relative flex md:flex-col sm:flex-col items-center justify-between w-full h-full 2xl:px-[9rem] px-[2rem] group"
        >
          <div className="w-[45%] lg:w-[60%] md:w-[90%] sm:w-[90%] space-y-2 text-[45px] z-40 relative lg:text-[32px] md:text-[32px]  md:leading-[1.8rem] md:flex md:flex-col md:items-center md:my-4 sm:text-[32px]  sm:leading-[1.5rem] sm:flex sm:flex-col sm:items-center sm:my-4">
            <h2 className=" lg:leading-[2.5rem] leading-[3.2rem] uppercase title md:text-center sm:text-center titlePrincipal">
              {slide.title}
            </h2>
            <p className="w-[90%] text-[18px] leading-6 md:text-center sm:text-center">
              {slide.description}
            </p>
            <button className="py-4 my-8 rounded-md px-8 text-[16px] bg-[#F26522] hover:bg-black md:w-[200px] sm:w-[200px]  text-white  transition-all duration-200">
              Compra ahora
            </button>
          </div>
          <div className="h-[700px] lg:h-[500px] md:h-[400px] sm:h-[400px] w-auto z-30">
            <img
              src={slide.image}
              alt={slide.alt}
              className="object-cover object-center w-full h-full"
              style={{
                background: `url(${slide.image}) center/cover no-repeat`,
              }}
            />
          </div>
        </div>
      ))}
    </OwlCarousel>
  );
}
