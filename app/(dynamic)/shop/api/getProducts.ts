import { postFetch } from "@/core/publicService";
import { ProductColumnType, ProductSearchResponse } from "@/types/product";

export type SortType = "desc" | "asc";

interface GetProductsParams {
    query?: string;
    page?: number;
    count?: number;
    categories?: string[];
    colors?: string[];
    brands?: string[];
    start_amount?: string;
    end_amount?: string;
    column?: ProductColumnType;
    sort?: SortType
}

export async function getProducts({
    query,
    page = 1,
    count = 9,
    categories,
    colors,
    brands,
    start_amount,
    end_amount,
    column,
    sort,
}: GetProductsParams): Promise<ProductSearchResponse> {
    const searchParams = new URLSearchParams({
        count: count.toString(),
        page: page.toString(),
    });
    if (query) searchParams.set("query", query);
    if (start_amount) searchParams.set("start_amount", start_amount);
    if (end_amount) searchParams.set("end_amount", end_amount);
    if (column) searchParams.set("column", column);
    if (sort) searchParams.set("sort", sort);
    if (categories && categories.length > 0) {
        categories.forEach(categoryId => {
            searchParams.append('categories[]', categoryId);
        });
    }
    if (colors && colors.length > 0) {
        colors.forEach(colorId => {
            searchParams.append('colors[]', colorId);
        });
    }
    if (brands && brands.length > 0) {
        brands.forEach(brandId => {
            searchParams.append('brands[]', brandId);
        });
    }

    return postFetch<ProductSearchResponse>(`/products/search?${searchParams.toString()}`, {});
}