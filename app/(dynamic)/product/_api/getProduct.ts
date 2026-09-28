import { getFetch } from "@/core/publicService";
import { Product } from "@/types/product";
import { notFound } from "next/navigation";

export const getProduct = async (slug: string): Promise<Product> => {
    const productData = await getFetch<Product>(`/products/${slug}`, {
        revalidate: 3600,
    });

    if (!productData?.product) {
        notFound();
    }

    return productData;
}