import { getFetch } from "@/core/publicService";
import { Category } from "@/types/category.type";

export async function getCategory(slugOrId: string): Promise<Category> {
    return getFetch<Category>(`/categories/${slugOrId}`, { revalidate: 3600 });
}

export async function getParentCategories(): Promise<Category[]> {
    return getFetch<Category[]>("/categories/active", { revalidate: 3600 });
}

export async function getCategoryChildren(slugOrId: string): Promise<Category[]> {
    return getFetch<Category[]>(`/categories/${slugOrId}/children`, {
        revalidate: 3600,
    });
}