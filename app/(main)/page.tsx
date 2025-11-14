import { BrandSlider } from "./_components/brandSlider";
import { BentoCategory } from "./_components/bentoCategory";
import { Hero } from "./_components/hero";
import { Carousel } from "../_components/carousel";
import ProductCard from "../_components/cards/ProductCard";
import instagramBanner from "@/assets/images/instagram-banner.png";
import Image from "next/image";
import { PostCard } from "../_components/cards/PostCard";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandSlider />
      <BentoCategory />
      <div className="mt-8 lg:mt-14 container mx-auto">
        <Carousel
          slides={Array.from({ length: 6 }, (_, i) => <ProductCard key={i} />)}
          desktopSlidesPerView={4.5}
          mobileSlidesPerView={2}
          seeMoreLink="مشاهده همه"
          title="محبوب ترین های این هفته" />
      </div>
      <div className="container mx-auto mt-14 pt-8 px-8 relative">
        <div className="bg-primary h-80 rounded-3xl absolute top-0 left-0 right-0 -z-10"></div>
        <Carousel
          slides={Array.from({ length: 6 }, (_, i) => <ProductCard key={i} />)}
          desktopSlidesPerView={4}
          mobileSlidesPerView={2}
          seeMoreLink="مشاهده همه"
          titleColor="text-white"
          title="پیشنهادات شگفت انگیز" />
      </div>
      <div className="container mx-auto mt-14">
        <Image src={instagramBanner} alt="" width={1600} height={375} quality={100} />
      </div>
      <div className="mt-8 lg:mt-14 container mx-auto">
        <Carousel
          slides={Array.from({ length: 6 }, (_, i) => <ProductCard key={i} />)}
          desktopSlidesPerView={4.5}
          mobileSlidesPerView={2}
          seeMoreLink="مشاهده همه"
          title="جدید ترین محصولات ما" />
      </div>
      <div className="mt-8 lg:mt-14 container mx-auto">
        <Carousel
          slides={Array.from({ length: 6 }, (_, i) => <PostCard key={i} />)}
          desktopSlidesPerView={3}
          mobileSlidesPerView={1.5}
          seeMoreLink="مشاهده همه"
          title="از وبلاگ و مقالات ما بخوانید" />
      </div>
    </>
  );
}
