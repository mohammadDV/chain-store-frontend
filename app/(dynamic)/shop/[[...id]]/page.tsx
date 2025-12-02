import ProductCard from "@/app/_components/cards/ProductCard";
import { Carousel } from "@/app/_components/carousel";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { createFileUrl } from "@/lib/utils";
import { Category } from "@/types/category.type";
import { ProductColumnType } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { TopNavActions } from "../../_components/topNavigation/TopNavActions";
import { getCategory, getCategoryChildren, getParentCategories } from "../api/categoriesServices";
import { getProducts, SortType } from "../api/getProducts";
import { ProductsFilters } from "../_components/filters/Filters";
import { Pagination } from "@/app/_components/pagination";

interface ShopPageProps {
    params: Promise<{
        id?: string
    }>,
    searchParams: Promise<{
        [key: string]: string
    }>
}

export default async function Shop({ params, searchParams }: ShopPageProps) {
    const isMobile = await isMobileDevice();
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    let categoryData: Category = {} as Category;
    let categoryChildren: Category[] = [];
    const breadcrumbs: { label: string; href?: string }[] = [
        { label: "بوف استور", href: "/" },
        { label: "فروشگاه", href: resolvedParams.id ? "/shop" : undefined },
    ];

    if (resolvedParams.id) {
        categoryData = await getCategory(resolvedParams.id);
    }

    if (resolvedParams.id) {
        categoryChildren = await getCategoryChildren(resolvedParams.id);
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
        categories: resolvedParams.id ? [resolvedParams.id] : undefined,
        brands,
        colors,
        column: resolvedSearchParams?.column as ProductColumnType,
        start_amount: resolvedSearchParams?.start_amount,
        end_amount: resolvedSearchParams?.end_amount,
        sort: resolvedSearchParams?.sort as SortType
    })

    if (categoryData) {
        const chain: Category[] = [];
        let current: Category | undefined = categoryData;
        let depth = 0;
        while (current && current.parent_id && depth < 10) {
            const parent = await getCategory(String(current.parent_id));
            if (!parent) break;
            chain.unshift(parent);
            current = parent;
            depth++;
        }
        for (const cat of chain) {
            breadcrumbs.push({ label: cat.title, href: `/shop/${cat.id}` });
        }
        breadcrumbs.push({ label: categoryData.title });
    }

    return (
        <>
            {isMobile && <TopNavActions title={categoryData?.title || "فروشگاه"} />}
            <div className="container mx-auto px-4 lg:px-0">
                <div className="bg-surface py-3 lg:py-6 rounded-2xl mt-4 lg:mt-8">
                    {!isMobile && <h1 className="text-2xl font-bold text-title text-center">
                        {categoryData?.title || "فروشگاه"}
                    </h1>}
                    <p className="lg:text-center text-xs lg:text-sm lg:mt-3 text-muted mr-3 lg:mr-0">
                        {breadcrumbs.map((item, idx) => (
                            <span key={idx}>
                                {idx > 0 && " / "}
                                {item.href && idx !== breadcrumbs.length - 1 ? (
                                    <Link href={item.href} className="text-secondary mr-1">
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="mr-1">{item.label}</span>
                                )}
                            </span>
                        ))}
                    </p>
                    {categoryChildren && categoryChildren.length > 0 &&
                        (<div>
                            {isMobile
                                ? <Carousel
                                    slides={categoryChildren?.map(cat => (
                                        <Link
                                            key={cat.id}
                                            href={`/shop/${cat.id}`}
                                            className="flex flex-col gap-2 items-center w-20">
                                            <Image src={createFileUrl(cat.image || "")} alt="" width={84} height={84} className="rounded-full object-cover size-20" />
                                            <h3 className="text-center text-title text-xs">
                                                {cat.title}
                                            </h3>
                                        </Link>
                                    ))}
                                    desktopSlidesPerView={6}
                                    mobileSlidesPerView={3.5} />
                                : <div className="flex items-start justify-center mt-4 lg:mt-6 gap-5 flex-wrap">
                                    {categoryChildren?.map(cat => (
                                        <Link
                                            key={cat.id}
                                            href={`/shop/${cat.id}`}
                                            className="flex flex-col gap-2 items-center max-w-24">
                                            <Image src={createFileUrl(cat.image || "")} alt="" width={84} height={84} className="rounded-full object-cover size-20" />
                                            <h3 className="text-center text-title text-sm ">
                                                {cat.title}
                                            </h3>
                                        </Link>
                                    ))}
                                </div>}
                        </div>)}
                </div>
            </div>
            <div className="container mx-auto px-4 lg:px-0 mt-6 lg:mt-8 flex flex-col lg:flex-row justify-between gap-4 lg:gap-10">
                <div className="w-80">
                    <ProductsFilters />
                </div>
                <div className="flex-1">
                    <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
                        {productsData.data.map(product => (
                            <ProductCard key={product.id} data={product} />
                        ))}
                    </div>
                    {productsData.data && productsData.total > 12 && (
                        <div className="mt-10">
                            <Pagination
                                currentPage={productsData.current_page}
                                lastPage={productsData.last_page}
                                links={productsData.links}
                                total={productsData.total}
                                routeUrl="/shop"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
