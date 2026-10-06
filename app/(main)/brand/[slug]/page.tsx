import ProductCard from "@/app/_components/cards/ProductCard";
import { Carousel } from "@/app/_components/carousel";
import { getFetch, postFetch } from "@/core/publicService";
import { stripHtml } from "@/lib/seo/absoluteUrl";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Brand, BrandBanner } from "@/types/brand.type";
import { Category } from "@/types/category.type";
import { FeaturedProducts, ProductColumnType } from "@/types/product";
import type { Metadata } from "next";
import Link from "next/link";
import { CategoryImage } from "@/app/_components/CategoryImage";
import { BrandHeroGrid } from "../../_components/brandHeroGrid";

interface BrandPageParams {
    params: Promise<{
        slug: string;
    }>;
}

async function getBrand(slug: string): Promise<Brand> {
    return getFetch<Brand>(`/brands/${slug}`, { revalidate: 3600 });
}

async function getBrandBanners(brandId: number): Promise<BrandBanner[]> {
    return await postFetch<BrandBanner[]>(
        "/banners",
        { brand: brandId },
        { revalidate: 300, tags: ["banners", `banners-brand-${brandId}`] }
    );
}

async function getBrandCategories(id: number): Promise<Category[]> {
    return await getFetch<Category[]>(`/categories/all/${id}`, {
        revalidate: 3600,
    });
}

async function getFeaturedProducts(
    column: ProductColumnType,
    id: number
): Promise<FeaturedProducts> {
    return await postFetch<FeaturedProducts>(
        "/products/featured",
        {
            column,
            brand: id,
        },
        { revalidate: 300, tags: ["featured-products", `featured-${column}`, `featured-brand-${id}`] }
    );
}

export async function generateMetadata({
    params,
}: BrandPageParams): Promise<Metadata> {
    const { slug } = await params;
    try {
        const brand = await getBrand(slug);
        return buildMetadata({
            title: brand.meta_title || brand.title,
            description:
                brand.meta_description ||
                stripHtml(brand.description) ||
                `محصولات برند ${brand.title}`,
            path: `/brand/${brand.slug || brand.id}`,
            image: brand.og_image || brand.logo,
            keywords: brand.meta_keywords,
        });
    } catch {
        return buildMetadata({
            title: "برند",
            path: `/brand/${slug}`,
        });
    }
}

export default async function BrandPage({ params }: BrandPageParams) {
    const isMobile = await isMobileDevice();
    const resolvedParams = await params;
    const brand = await getBrand(resolvedParams.slug);
    const brandId = brand.id;

    const [
        brandBannersData,
        brandCategoriesData,
        orderProductsData,
        discountProductsData,
        viewProductsData,
    ] = await Promise.all([
        getBrandBanners(brandId),
        getBrandCategories(brandId),
        getFeaturedProducts("order", brandId),
        getFeaturedProducts("discount", brandId),
        getFeaturedProducts("view", brandId),
    ]);

    return (
        <>
            <h1 className="sr-only">{brand.title}</h1>
            {brandBannersData?.length > 0 && (
                <BrandHeroGrid data={brandBannersData} />
            )}
            <div className="container mx-auto mt-6 lg:mt-14">
                {isMobile ? (
                    <Carousel
                        slides={brandCategoriesData?.map((category) => (
                            <Link
                                key={category.id}
                                href={`/shop/${category.slug || category.id}?brands=${brandId}`}
                                className="flex flex-col gap-2 items-center w-20"
                            >
                                <CategoryImage
                                    image={category.image}
                                    alt={category.title}
                                    width={84}
                                    height={84}
                                    sizes="84px"
                                    className="rounded-full object-cover size-20"
                                />
                                <h3 className="text-center text-title text-xs">
                                    {category.title}
                                </h3>
                            </Link>
                        ))}
                        desktopSlidesPerView={6}
                        mobileSlidesPerView={3.5}
                    />
                ) : (
                    <div className="flex items-start justify-center mt-4 lg:mt-6 gap-5 flex-wrap">
                        {brandCategoriesData?.map((category) => (
                            <Link
                                key={category.id}
                                href={`/shop/${category.slug || category.id}?brands=${brandId}`}
                                className="flex flex-col gap-2 items-center max-w-24"
                            >
                                <CategoryImage
                                    image={category.image}
                                    alt={category.title}
                                    width={84}
                                    height={84}
                                    sizes="84px"
                                    className="rounded-full object-cover size-20"
                                />
                                <h3 className="text-center text-title text-sm ">
                                    {category.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <div className="mt-6 lg:mt-14 container mx-auto">
                <Carousel
                    slides={orderProductsData.data.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                    desktopSlidesPerView={4.5}
                    mobileSlidesPerView={2.5}
                    seeMoreLink={`/shop?brands=${brandId}`}
                    title="محبوب ترین های این هفته"
                />
            </div>
            <div className="container lg:mx-auto mt-6 lg:mt-14 pt-4 lg:pt-8 lg:px-8 relative">
                <div className="bg-primary h-40 lg:h-80 rounded-xl lg:rounded-3xl absolute top-0 left-0 right-0 -z-10"></div>
                <Carousel
                    slides={discountProductsData.data.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                    desktopSlidesPerView={4}
                    mobileSlidesPerView={2.5}
                    seeMoreLink={`/shop?brands=${brandId}`}
                    titleColor="text-white"
                    title="پیشنهادات شگفت انگیز"
                />
            </div>
            <div className="mt-6 lg:mt-14 container mx-auto">
                <Carousel
                    slides={viewProductsData.data.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                    desktopSlidesPerView={4.5}
                    mobileSlidesPerView={2.5}
                    seeMoreLink={`/shop?brands=${brandId}`}
                    title="داغ ترین محصولات ما"
                />
            </div>
        </>
    );
}
