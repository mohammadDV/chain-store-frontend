import { BrandSlider } from "./_components/brandSlider";
import { BentoCategory } from "./_components/bentoCategory";
import { Hero } from "./_components/hero";
import { Carousel } from "../_components/carousel";
import ProductCard from "../_components/cards/ProductCard";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandSlider />
      <BentoCategory />
      <Carousel
        slides={Array.from({ length: 6 }, (_, i) => <ProductCard key={i} />)}
        desktopSlidesPerView={4}
        mobileSlidesPerView={2}
        seeMoreLink="مشاهده همه"
        title="محبوب ترین های این هفته" />
    </>
  );
}
