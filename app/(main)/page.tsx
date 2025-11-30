import instagramBanner from "@/assets/images/instagram-banner.png";
import mobileInstagramBanner from "@/assets/images/mobile-instagram-banner.png";
import { getFetch, postFetch } from "@/core/publicService";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Brand } from "@/types/brand.type";
import Image from "next/image";
import Link from "next/link";
import { PostCard } from "../_components/cards/PostCard";
import ProductCard from "../_components/cards/ProductCard";
import { Carousel } from "../_components/carousel";
import { BentoCategory, categoriesCards } from "./_components/bentoCategory";
import { BrandSlider } from "./_components/brandSlider";
import { Hero } from "./_components/hero";
import { FeaturedProducts, ProductColumnType } from "@/types/product";
import { PostsResponse } from "@/types/post.type";

async function getBrands(): Promise<Brand[]> {
  return await getFetch<Brand[]>("/brands");
}

async function getFeaturedProducts(column: ProductColumnType): Promise<FeaturedProducts> {
  return await postFetch<FeaturedProducts>("/products/featured", { column });
}

async function getLatestPosts(): Promise<PostsResponse> {
  return await getFetch<PostsResponse>("/posts/latest");
}

export default async function Home() {
  const isMobile = await isMobileDevice();

  const [
    brandsData,
    orderProductsData,
    discountProductsData,
    viewProductsData,
    latestPostsData
  ] = await Promise.all([
    getBrands(),
    getFeaturedProducts("order"),
    getFeaturedProducts("discount"),
    getFeaturedProducts("view"),
    getLatestPosts()
  ])

  return (
    <>
      <Hero isMobile={isMobile} />
      <BrandSlider brandsData={brandsData} isMobile={isMobile} />
      {isMobile ?
        <div className="mt-2">
          <Carousel
            slides={categoriesCards.map((category) => (
              <Link
                href={`/shop/${category.id}`}
                key={category.id}
                className="relative group block overflow-hidden rounded-xl aspect-square">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent opacity-90" />
                <div className="absolute bottom-3 right-3 text-white">
                  <h3 className="text-sm font-semibold">{category.title}</h3>
                  <p className="text-2xs mt-1">{category.caption}</p>
                </div>
              </Link>
            ))}
            desktopSlidesPerView={4}
            mobileSlidesPerView={2.5} />
        </div>
        : <BentoCategory />}
      <div className="mt-6 lg:mt-14 container mx-auto">
        <Carousel
          slides={orderProductsData.data.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
          desktopSlidesPerView={4.5}
          mobileSlidesPerView={2.5}
          seeMoreLink="/shop"
          title="محبوب ترین های این هفته" />
      </div>
      <div className="container lg:mx-auto mt-6 lg:mt-14 pt-4 lg:pt-8 lg:px-8 relative">
        <div className="bg-primary h-40 lg:h-80 rounded-xl lg:rounded-3xl absolute top-0 left-0 right-0 -z-10"></div>
        <Carousel
          slides={discountProductsData.data.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
          desktopSlidesPerView={4}
          mobileSlidesPerView={2.5}
          seeMoreLink="/shop"
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
          slides={viewProductsData.data.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
          desktopSlidesPerView={4.5}
          mobileSlidesPerView={2.5}
          seeMoreLink="/shop"
          title="جدید ترین محصولات ما" />
      </div>
      <div className="mt-6 lg:mt-14 container mx-auto">
        <Carousel
          slides={latestPostsData.data?.map(post => (
            <PostCard key={post.id} data={post} />
          ))}
          desktopSlidesPerView={3}
          mobileSlidesPerView={1.5}
          seeMoreLink="/blog"
          title="از وبلاگ و مقالات ما بخوانید" />
      </div>
    </>
  );
}
