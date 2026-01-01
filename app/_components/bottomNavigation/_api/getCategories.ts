import { getFetch } from "@/core/publicService";
import { Category } from "@/types/category.type";

export const getCategories = async (): Promise<Category[]> => {
    try {
        const res = await getFetch<Category[]>("/categories/all");
        return res;
    } catch (error) {
        return [];
    }
};
