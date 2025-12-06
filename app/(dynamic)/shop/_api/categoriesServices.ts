import { getFetch } from "@/core/publicService";
import { Category } from "@/types/category.type";

export async function getCategory(id: string): Promise<Category> {
    return getFetch<Category>(`/categories/${id}`);
}

export async function getParentCategories(): Promise<Category[]> {
    return getFetch<Category[]>("/categories/active");
}

export async function getCategoryChildren(id: string): Promise<Category[]> {
    return getFetch<Category[]>(`/categories/${id}/children`);
}