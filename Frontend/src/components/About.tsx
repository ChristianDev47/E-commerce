import payment from "../assets/about/payment.svg";
import disponibility from "../assets/about/disponibility.svg";
import trunck from "../assets/about/trunck.svg";

export default function About() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-full h-full space-y-20 title max-w-[1700px]">
        <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1  mt-8 gap-4 bg-gradient-to-br from-gray-50 to-gray-100 w-full h-[400px] 2xl:px-[9rem] px-[2rem] ">
          <div className="flex flex-col justify-center md:items-center sm:items-center">
            <p className="font-semibold uppercase">Sobre Nosotros</p>
            <h3 className="text-[32px] md:text-[25px] sm:text-[25px] font-semibold leading-8 mb-2 sm:text-center">
              Impulsando tu experiencia de compra
            </h3>
            <div className="h-1.5 w-[33rem] bg-[#F26522]"></div>
            <p className="text-[18px] md:text-center sm:text-center mt-4">
              EcomTrend es la plataforma integral para descubrir, comprar y
              disfrutar de una amplia variedad de productos.
            </p>
          </div>
          <div className="flex items-center justify-center ">
            <div className="relative mr-14 md:w-[50%] sm:w-[50%]">
              <img src="/images/about/about1.webp" alt="" width={500} />
              <img
                className="absolute bottom-[-40px] right-[-40px] w-[60%]"
                src="/images/about/about2.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1  gap-12 2xl:px-[9rem] px-[2rem]">
          <img className="w-full" src="/images/about/about3.jpg" alt="" />
          <div className="space-y-2">
            <h3 className="text-[23px] font-semibold">
              De la Pasión a la Diversidad
            </h3>
            <p>
              Comenzamos como una pequeña tienda en línea con una selección
              limitada de productos, pero con una gran pasión por ofrecer
              calidad y servicio excepcionales. Con el tiempo, fuimos
              expandiéndonos hasta convertirnos en una plataforma que ofrece
              todo tipo de productos, desde tecnología hasta moda, hogar y más.
              Nuestro compromiso siempre ha sido brindar la mejor experiencia de
              compra a nuestros clientes.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-[60%] md:w-[90%] sm:w-[90%]">
          <h3 className="font-semibold">Nuestra Misión</h3>
          <h1 className="font-semibold text-[23px] sm:text-center">
            Haciendo la Compra Fácil y Accesible
          </h1>
          <div className="h-1.5 w-[25rem] bg-[#F26522]"></div>
          <p className="my-5 text-center">
            Nuestro objetivo es facilitar el acceso a una variedad de productos
            de calidad para todos. Creemos que todos merecen una experiencia de
            compra agradable y sin complicaciones, por lo que trabajamos
            continuamente para mejorar y expandir nuestra oferta, asegurando que
            siempre encuentres lo que necesitas, cuando lo necesitas.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1   gap-12 2xl:px-[9rem] px-[2rem]">
          <div className="space-y-2">
            <h3 className="text-[23px] font-semibold">
              Construyendo una Comunidad de Confianza
            </h3>
            <p>
              Hemos crecido desde un pequeño equipo dedicado a una comunidad
              global de profesionales apasionados por el comercio. Invertimos en
              nuestra gente y nuestras comunidades, apoyando diversas
              iniciativas sociales y ambientales. Nos esforzamos por crear un
              impacto positivo a través de nuestros productos y nuestras
              acciones, promoviendo un futuro más equitativo y sostenible.
            </p>
          </div>
          <img className="w-full" src="/images/about/about4.webp" alt="" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1   gap-12 2xl:px-[9rem] px-[2rem]">
          <img className="w-full" src="/images/about/about5.webp" alt="" />
          <div className="space-y-2">
            <h3 className="text-[23px] font-semibold">
              Hacia un Futuro Sostenible
            </h3>
            <p>
              Nos comprometemos a operar de manera responsable y sostenible, no
              solo para nuestro negocio, sino también para el planeta. Nuestro
              enfoque incluye la reducción de nuestra huella de carbono, la
              adopción de energías renovables y la implementación de prácticas
              ecológicas en todas nuestras operaciones. Queremos asegurarnos de
              que cada compra que realices con nosotros también sea una elección
              consciente para el futuro.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-[90%] pb-[5rem] ">
          <h1 className="font-semibold text-[23px]">
            Que nos caracteriza
          </h1>
          <div className="h-1.5 w-[15rem] bg-[#F26522]  mb-[2rem]"></div>
          <div className="flex justify-center my-[1rem] flex-wrap ">
            <div className="flex items-start justify-between space-x-4  w-[300px] mx-8 my-4 min-w-[300px]">
              <img src={trunck} alt="" width={60} />
              <div className="space-y-1">
                <p className="text-[19px] font-semibold">Envio gratis</p>
                <p className="text-[15px]">
                  Envio gratis en pedidos superiores a 100$
                </p>
              </div>
            </div>
            <div className="flex items-start justify-between space-x-4  w-[300px] mx-8 my-4  min-w-[300px]">
              <img src={payment} alt="" width={60} />
              <div className="space-y-1">
                <p className="text-[19px] font-semibold">Pago seguro</p>
                <p className="text-[15px]">
                  Garantizamos el pago seguro en todos los pedidos
                </p>
              </div>
            </div>
            <div className="flex items-start justify-between space-x-4  w-[300px] mx-8 my-4  min-w-[300px]">
              <img src={disponibility} alt="" width={60} />
              <div className="space-y-1">
                <p className="text-[19px] font-semibold">
                  Soporte 24 horas al día
                </p>
                <p className="text-[15px]">
                  Contáctenos las 24 horas del día, los 7 días de la semana
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
