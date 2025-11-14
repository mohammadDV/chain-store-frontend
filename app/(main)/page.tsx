import { BrandSlider } from "./_components/brandSlider";
import { BentoCategory } from "./_components/bentoCategory";
import { Hero } from "./_components/hero";
import { Carousel } from "../_components/carousel";
import ProductCard from "../_components/cards/ProductCard";
import instagramBanner from "@/assets/images/instagram-banner.png";
import mobileInstagramBanner from "@/assets/images/mobile-instagram-banner.png";
import Image from "next/image";
import { PostCard } from "../_components/cards/PostCard";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import jacket from "@/assets/images/jacket.jpg";

export default async function Home() {
  const isMobile = await isMobileDevice();

  return (
    <>
      <Hero isMobile={isMobile} />
      <BrandSlider />
      {isMobile ?
        <div className="mt-2">
          <Carousel
            slides={Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="relative group overflow-hidden rounded-xl aspect-square">
                <Image
                  src={jacket}
                  alt={""}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent opacity-90" />
                <div className="absolute bottom-3 right-3 text-white">
                  <h3 className="text-sm font-semibold">توپ بسکتبال</h3>
                  <p className="text-2xs mt-1">+200 محصول</p>
                </div>
              </div>
            ))}
            desktopSlidesPerView={4}
            mobileSlidesPerView={2.5} />
        </div>
        : <BentoCategory />}
      <div className="mt-6 lg:mt-14 container mx-auto">
        <Carousel
          slides={Array.from({ length: 6 }, (_, i) => <ProductCard key={i} />)}
          desktopSlidesPerView={4.5}
          mobileSlidesPerView={2.5}
          seeMoreLink="مشاهده همه"
          title="محبوب ترین های این هفته" />
      </div>
      <div className="container lg:mx-auto mt-6 lg:mt-14 pt-4 lg:pt-8 lg:px-8 relative">
        <div className="bg-primary h-40 lg:h-80 rounded-xl lg:rounded-3xl absolute top-0 left-0 right-0 -z-10"></div>
        <Carousel
          slides={Array.from({ length: 6 }, (_, i) => <ProductCard key={i} />)}
          desktopSlidesPerView={4}
          mobileSlidesPerView={2.5}
          seeMoreLink="مشاهده همه"
          titleColor="text-white"
          title="پیشنهادات شگفت انگیز" />
      </div>
      <div className="container px-4 lg:px-0 mx-auto mt-6 lg:mt-14">
        {isMobile
          ? <Image src={mobileInstagramBanner} alt="" width={390} height={136} quality={100} />
          : <Image src={instagramBanner} alt="" width={1600} height={375} quality={100} />}
      </div>
      <div className="mt-6 lg:mt-14 container mx-auto">
        <Carousel
          slides={Array.from({ length: 6 }, (_, i) => <ProductCard key={i} />)}
          desktopSlidesPerView={4.5}
          mobileSlidesPerView={2.5}
          seeMoreLink="مشاهده همه"
          title="جدید ترین محصولات ما" />
      </div>
      <div className="mt-6 lg:mt-14 container mx-auto">
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
