import ProductCard from "@/app/_components/cards/ProductCard";
import { Carousel } from "@/app/_components/carousel";
import { getFetch, postFetch } from "@/core/publicService";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { createFileUrl } from "@/lib/utils";
import { BrandBanner } from "@/types/brand.type";
import { Category } from "@/types/category.type";
import { FeaturedProducts, ProductColumnType } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { BrandHeroGrid } from "../../_components/brandHeroGrid";

interface BrandPageParams {
    params: Promise<{
        id: string
    }>
}

async function getBrandBanners(brand: string): Promise<BrandBanner[]> {
    return await postFetch<BrandBanner[]>("/banners", { brand });
}

async function getBrandCategories(id: string): Promise<Category[]> {
    return await getFetch<Category[]>(`/categories/all/${id}`);
}

async function getFeaturedProducts(column: ProductColumnType, id: string): Promise<FeaturedProducts> {
    return await postFetch<FeaturedProducts>("/products/featured", { column, brand: id });
}

export default async function Brand({ params }: BrandPageParams) {
    const isMobile = await isMobileDevice();
    const resolvedParams = await params;

    const [
        brandBannersData,
        brandCategoriesData,
        orderProductsData,
        discountProductsData,
        viewProductsData,
    ] = await Promise.all([
        getBrandBanners(resolvedParams.id),
        getBrandCategories(resolvedParams.id),
        getFeaturedProducts("order", resolvedParams.id),
        getFeaturedProducts("discount", resolvedParams.id),
        getFeaturedProducts("view", resolvedParams.id),
    ])

    return (
        <>
            {brandBannersData?.length > 0 && <BrandHeroGrid data={brandBannersData} />}
            <div className="container mx-auto mt-6 lg:mt-14">
                {isMobile
                    ? <Carousel
                        slides={brandCategoriesData?.map(category => (
                            <Link
                                key={category.id}
                                href={`/shop/${category.id}`}
                                className="flex flex-col gap-2 items-center w-20">
                                <Image src={createFileUrl(category.image || "")} alt="" width={84} height={84} className="rounded-full object-cover size-20" />
                                <h3 className="text-center text-title text-xs">
                                    {category.title}
                                </h3>
                            </Link>
                        ))}
                        desktopSlidesPerView={6}
                        mobileSlidesPerView={3.5} />
                    : <div className="flex items-start justify-center mt-4 lg:mt-6 gap-5 flex-wrap">
                        {brandCategoriesData?.map(category => (
                            <Link
                                key={category.id}
                                href={`/shop/${category.id}`}
                                className="flex flex-col gap-2 items-center max-w-24">
                                <Image src={createFileUrl(category.image || "")} alt="" width={84} height={84} className="rounded-full object-cover size-20" />
                                <h3 className="text-center text-title text-sm ">
                                    {category.title}
                                </h3>
                            </Link>
                        ))}
                    </div>}
            </div>
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
            <div className="mt-6 lg:mt-14 container mx-auto">
                <Carousel
                    slides={viewProductsData.data.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                    desktopSlidesPerView={4.5}
                    mobileSlidesPerView={2.5}
                    seeMoreLink="/shop"
                    title="داغ ترین محصولات ما" />
            </div>
        </>
    )
}