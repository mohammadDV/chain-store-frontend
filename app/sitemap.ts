import { absoluteUrl } from "@/lib/seo/absoluteUrl";
import { getSeoSitemap } from "@/lib/seo/getSeoApi";
import type { MetadataRoute } from "next";

const STATIC_PAGES: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/shop"), changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/complaint"), changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

        return [...STATIC_PAGES, ...dynamicEntries];
    } catch {
        return STATIC_PAGES;
    }
}
