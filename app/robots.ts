import { getSiteUrl } from "@/lib/seo/absoluteUrl";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const siteUrl = getSiteUrl();

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/auth/",
                    "/profile/",
                    "/cart",
                    "/checkout/",
                ],
            },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
        host: new URL(siteUrl).host,
    };
}
