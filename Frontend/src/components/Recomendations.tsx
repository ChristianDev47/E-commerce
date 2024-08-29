import { useProductData } from "../hooks/useProductData.ts";
import { Card } from "./Card.tsx";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";

const options = {
  loop: true,
  margin: 5,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  nav: false,
  responsive: {
    0: {
      items: 2,
    },
    550: {
      items: 3,
    },
    700: {
      items: 4,
    },
    970: {
      items: 5,
    },
    1204: {
      items: 6,
    },
  },
};

interface Props {
  category?: string;
}

export function Recomenations({ category }: Props) {
  const { RecomendProducts } = useProductData();

  return (
    <>
      <div className="max-w-screen-xl mx-auto mt-[2rem] space-y-16">
        <div className="w-full">
          <h3 className="title text-[18px]">
            Mira en alguna de estas recomenaciones
          </h3>
          <OwlCarousel {...options} className="owl-theme">
            {category && <Card products={RecomendProducts(category)} />}
          </OwlCarousel>
        </div>
      </div>
    </>
  );
}
