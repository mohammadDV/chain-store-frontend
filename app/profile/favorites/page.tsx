import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import ProductCard from "@/app/_components/cards/ProductCard";
import { Pagination } from "@/app/_components/pagination";
import { TopNavProfile } from "../_components/topNavigation/TopNavProfile";
import { getMyFavorites } from "./_api/getMyFavorites";

export default async function FavoritesPage({
    searchParams,
}: {
    searchParams?: { page?: string };
}) {
    const isMobile = await isMobileDevice();
    const page = Math.max(1, Number(searchParams?.page ?? 1) || 1);
    const favoritesData = await getMyFavorites({ page });
    const products = favoritesData.data ?? [];

    return (
        <>
            {isMobile && <TopNavProfile title="علاقه مندی های من" />}

            <div className="p-2 border border-border rounded-xl mx-4 lg:mx-0 mt-3 lg:mt-0">
                <div className="bg-surface px-3 py-2 rounded-lg flex items-center justify-between">
                    <p className="text-title font-medium">علاقه مندی های من</p>
                </div>

                {products.length === 0 ? (
                    <p className="text-sm text-description text-center py-8">موردی جهت نمایش وجود ندارد.</p>
                ) : (
                    <div className="mt-3 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} data={product} />
                        ))}
                    </div>
                )}

                {products.length > 0 && favoritesData.total > favoritesData.per_page && (
                    <div className="mt-8">
                        <Pagination
                            currentPage={favoritesData.current_page}
                            lastPage={favoritesData.last_page}
                            links={favoritesData.links}
                            total={favoritesData.total}
                            routeUrl="/profile/favorites"
                        />
                    </div>
                )}
            </div>
        </>
    )
}
