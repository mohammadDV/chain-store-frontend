import ProductCard from "@/app/_components/cards/ProductCard";
import { Carousel } from "@/app/_components/carousel";
import { Pagination } from "@/app/_components/pagination";
import { absoluteUrl, stripHtml } from "@/lib/seo/absoluteUrl";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { Breadcrumbs } from "@/lib/seo/Breadcrumbs";
import { JsonLd } from "@/lib/seo/JsonLd";
import { breadcrumbListJsonLd, itemListJsonLd } from "@/lib/seo/schema";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Category } from "@/types/category.type";
import { ProductColumnType } from "@/types/product";
import type { Metadata } from "next";
import Link from "next/link";
import { CategoryImage } from "@/app/_components/CategoryImage";
import { TopNavActions } from "../../_components/topNavigation/TopNavActions";
import { getCategory, getCategoryChildren, getParentCategories } from "../_api/categoriesServices";
import { getProducts, SortType } from "../_api/getProducts";
import { ProductsFilters } from "../_components/filters/Filters";
import { MobileFilters } from "../_components/filters/MobileFilters";
import { SortProducts } from "../_components/sort";

interface ShopPageProps {
    params: Promise<{
        slug?: string[];
    }>;
    searchParams: Promise<{
        [key: string]: string;
    }>;
}

function resolveSlugParam(slug?: string[]): string | undefined {
    if (!slug || slug.length === 0) return undefined;
    return slug[slug.length - 1];
}

export async function generateMetadata({
    params,
    searchParams,
}: ShopPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const slug = resolveSlugParam(resolvedParams.slug);
    const hasFilters = Boolean(
        resolvedSearchParams?.brands ||
            resolvedSearchParams?.colors ||
            resolvedSearchParams?.query ||
            resolvedSearchParams?.start_amount ||
            resolvedSearchParams?.end_amount
    );

    if (!slug) {
        return buildMetadata({
            title: "فروشگاه",
            description: "خرید آنلاین لوازم ورزشی از فروشگاه بوف استور",
            path: "/shop",
        });
    }

    try {
        const category = await getCategory(slug);
        const path = `/shop/${category.slug || category.id}`;
        return buildMetadata({
            title: category.meta_title || category.title,
            description:
                category.meta_description ||
                stripHtml(category.description) ||
                `خرید ${category.title} از بوف استور`,
            path,
            image: category.og_image || category.image,
            keywords: category.meta_keywords,
            // Filtered listings canonicalize to the base category URL via path above
            noIndex: hasFilters,
        });
    } catch {
        return buildMetadata({
            title: "فروشگاه",
            path: `/shop/${slug}`,
        });
    }
}

export default async function Shop({ params, searchParams }: ShopPageProps) {
    const isMobile = await isMobileDevice();
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const slug = resolveSlugParam(resolvedParams.slug);

    let categoryData: Category | null = null;
    let categoryChildren: Category[] = [];
    const breadcrumbs: { label: string; href?: string }[] = [
        { label: "بوف استور", href: "/" },
        { label: "فروشگاه", href: slug ? "/shop" : undefined },
    ];

    if (slug) {
        categoryData = await getCategory(slug);
        categoryChildren = await getCategoryChildren(slug);
    } else {
        categoryChildren = await getParentCategories();
    }

    const brandsParam = resolvedSearchParams?.brands;
    const brands = Array.isArray(brandsParam)
        ? brandsParam
        : brandsParam
            ? [brandsParam]
            : undefined;

    const colorsParam = resolvedSearchParams?.colors;
    const colors = Array.isArray(colorsParam)
        ? colorsParam
        : colorsParam
            ? [colorsParam]
            : undefined;

    const productsData = await getProducts({
        page: parseInt(resolvedSearchParams?.page || "1"),
        query: resolvedSearchParams?.query,
        categories: categoryData ? [String(categoryData.id)] : undefined,
        brands,
        colors,
        column: resolvedSearchParams?.column as ProductColumnType,
        start_amount: resolvedSearchParams?.start_amount,
        end_amount: resolvedSearchParams?.end_amount,
        sort: resolvedSearchParams?.sort as SortType,
    });

    if (categoryData?.id) {
        const chain: Category[] = [];
        let current: Category | undefined = categoryData;
        let depth = 0;
        while (current && current.parent_id && depth < 10) {
            const parent = await getCategory(String(current.parent_id));
            if (!parent?.id) break;
            chain.unshift(parent);
            current = parent;
            depth++;
        }
        for (const cat of chain) {
            breadcrumbs.push({
                label: cat.title,
                href: `/shop/${cat.slug || cat.id}`,
            });
        }
        breadcrumbs.push({ label: categoryData.title });
    }

    const shopPath = categoryData
        ? `/shop/${categoryData.slug || categoryData.id}`
        : "/shop";

    return (
        <>
            <JsonLd
                data={[
                    breadcrumbListJsonLd(breadcrumbs),
                    itemListJsonLd(
                        (productsData.data || []).slice(0, 20).map((p) => ({
                            name: p.title,
                            url: absoluteUrl(`/product/${p.slug || p.id}`),
                        })),
                        categoryData?.title || "فروشگاه بوف استور"
                    ),
                ]}
            />
            {isMobile && (
                <TopNavActions title={categoryData?.title || "فروشگاه"} />
            )}
            <div className="container mx-auto px-4 lg:px-0">
                <div className="bg-surface py-3 lg:py-6 rounded-2xl mt-4 lg:mt-8">
                    {!isMobile && (
                        <h1 className="text-2xl font-bold text-title text-center">
                            {categoryData?.title || "فروشگاه"}
                        </h1>
                    )}
                    <Breadcrumbs
                        items={breadcrumbs}
                        className="lg:text-center mr-3 lg:mr-0 lg:mt-3"
                    />
                    {categoryChildren && categoryChildren.length > 0 && (
                        <div>
                            {isMobile ? (
                                <Carousel
                                    slides={categoryChildren?.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={`/shop/${cat.slug || cat.id}`}
                                            className="flex flex-col gap-2 items-center w-20"
                                        >
                                            <CategoryImage
                                                image={cat.image}
                                                alt={cat.title}
                                                width={84}
                                                height={84}
                                                sizes="84px"
                                                className="rounded-full object-cover size-20"
                                            />
                                            <h3 className="text-center text-title text-xs">
                                                {cat.title}
                                            </h3>
                                        </Link>
                                    ))}
                                    desktopSlidesPerView={6}
                                    mobileSlidesPerView={3.5}
                                />
                            ) : (
                                <div className="flex items-start justify-center mt-4 lg:mt-6 gap-5 flex-wrap">
                                    {categoryChildren?.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={`/shop/${cat.slug || cat.id}`}
                                            className="flex flex-col gap-2 items-center max-w-24"
                                        >
                                            <CategoryImage
                                                image={cat.image}
                                                alt={cat.title}
                                                width={84}
                                                height={84}
                                                sizes="84px"
                                                className="rounded-full object-cover size-20"
                                            />
                                            <h3 className="text-center text-title text-sm ">
                                                {cat.title}
                                            </h3>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="container mx-auto px-4 lg:px-0 mt-5 lg:mt-8 flex flex-col lg:flex-row justify-between gap-4 lg:gap-10">
                {!isMobile && (
                    <div className="w-80">
                        <ProductsFilters />
                    </div>
                )}
                <div className="flex-1">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mb-4 lg:mb-6">
                        {isMobile ? (
                            <div className="flex items-center gap-3">
                                <MobileFilters />
                                <div className="flex-1 overflow-x-auto">
                                    <div className="min-w-max">
                                        <SortProducts />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <SortProducts />
                        )}
                        <h2 className="text-description text-sm font-medium">
                            {productsData?.total} محصول پیدا شد
                        </h2>
                    </div>
                    {productsData.data.length === 0 ? (
                        <div className="flex items-center justify-center py-10">
                            <p className="text-description">محصولی یافت نشد</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
                            {productsData.data.map((product) => (
                                <ProductCard key={product.id} data={product} />
                            ))}
                        </div>
                    )}
                    {productsData.data && productsData.total > 12 && (
                        <div className="mt-10">
                            <Pagination
                                currentPage={productsData.current_page}
                                lastPage={productsData.last_page}
                                links={productsData.links}
                                total={productsData.total}
                                routeUrl={shopPath}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
