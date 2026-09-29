import { absoluteUrl } from "@/lib/seo/absoluteUrl";
import { getSeoSitemap } from "@/lib/seo/getSeoApi";
import { getPagesNav, pageHref } from "@/lib/pages/getPage";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const pages = await getPagesNav();

    const staticPages: MetadataRoute.Sitemap = [
        { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
        { url: absoluteUrl("/shop"), changeFrequency: "daily", priority: 0.9 },
        { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.7 },
        { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.5 },
        ...pages.map((page) => ({
            url: absoluteUrl(pageHref(page.slug)),
            changeFrequency: "monthly" as const,
            priority: 0.5,
        })),
    ];

    try {
        const data = await getSeoSitemap();
        const dynamicEntries: MetadataRoute.Sitemap = [
            ...data.products.map((item) => ({
                url: absoluteUrl(item.path),
                lastModified: item.updated_at || undefined,
                changeFrequency: "weekly" as const,
                priority: 0.8,
            })),
            ...data.categories.map((item) => ({
                url: absoluteUrl(item.path),
                lastModified: item.updated_at || undefined,
                changeFrequency: "weekly" as const,
                priority: 0.7,
            })),
            ...data.posts.map((item) => ({
                url: absoluteUrl(item.path),
                lastModified: item.updated_at || undefined,
                changeFrequency: "monthly" as const,
                priority: 0.6,
            })),
            ...data.brands.map((item) => ({
                url: absoluteUrl(item.path),
                lastModified: item.updated_at || undefined,
                changeFrequency: "weekly" as const,
                priority: 0.6,
            })),
        ];

        return [...staticPages, ...dynamicEntries];
    } catch {
        return staticPages;
    }
}
