import { getFetch } from "@/core/publicService";

export type SeoSettings = {
    site_name: string | null;
    default_meta_description: string | null;
    default_og_image: string | null;
};

export type SitemapEntry = {
    type: string;
    path: string;
    slug: string;
    updated_at: string | null;
};

export type SeoRedirect = {
    from_path: string;
    to_path: string;
    status_code: number;
};

export async function getSeoSettings(): Promise<SeoSettings> {
    const res = await getFetch<{ status: number; data: SeoSettings }>(
        "/seo/settings",
        { revalidate: 3600 }
    );
    return res.data;
}

export async function getSeoSitemap(): Promise<{
    products: SitemapEntry[];
    categories: SitemapEntry[];
    posts: SitemapEntry[];
    brands: SitemapEntry[];
}> {
    const res = await getFetch<{
        status: number;
        data: {
            products: SitemapEntry[];
            categories: SitemapEntry[];
            posts: SitemapEntry[];
            brands: SitemapEntry[];
        };
    }>("/seo/sitemap", { revalidate: 3600 });
    return res.data;
}

export async function getSeoRedirects(): Promise<SeoRedirect[]> {
    const res = await getFetch<{ status: number; data: SeoRedirect[] }>(
        "/seo/redirects",
        { revalidate: 300 }
    );
    return res.data;
}
