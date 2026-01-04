import { getFetchAuth } from "@/core/privateService";
import { ProductSearchResponse } from "@/types/product";

interface GetMyFavoritesParams {
    page?: number;
    count?: number;
}

export async function getMyFavorites({
    page = 1,
    count = 8,
}: GetMyFavoritesParams): Promise<ProductSearchResponse> {
    const searchParams = new URLSearchParams({
        count: count.toString(),
        page: page.toString(),
    });

    return getFetchAuth<ProductSearchResponse>(
        `/profile/products/favorite?${searchParams.toString()}`
    );
}