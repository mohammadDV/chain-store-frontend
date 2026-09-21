import { getFetch } from "@/core/publicService";
import { Product } from "@/types/product";
import { notFound } from "next/navigation";

export const getProduct = async (id: string): Promise<Product> => {
    const productData = await getFetch<Product>(`/products/${id}`);

    if (!productData?.product) {
        notFound();
    }

    return productData;
}