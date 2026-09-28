import type { Metadata } from "next";
import {
    absoluteImageUrl,
    absoluteUrl,
    getSiteUrl,
    stripHtml,
    truncateText,
} from "./absoluteUrl";

export type BuildMetadataInput = {
    title: string;
    description?: string | null;
    path: string;
    image?: string | null;
    keywords?: string | null;
    type?: "website" | "article" | "product";
    noIndex?: boolean;
    absoluteTitle?: boolean;
};

const DEFAULT_DESCRIPTION =
    "بوف استور؛ بزرگترین مرجع لوازم ورزشی — خرید آنلاین محصولات اصل با ارسال سریع";

export function buildMetadata({
    title,
    description,
    path,
    image,
    keywords,
    type = "website",
    noIndex = false,
    absoluteTitle = false,
}: BuildMetadataInput): Metadata {
    const desc = truncateText(
        stripHtml(description) || DEFAULT_DESCRIPTION,
        160
    );
    const url = absoluteUrl(path);
    const ogImage = absoluteImageUrl(image);
    const siteName = "بوف استور";

    return {
        title: absoluteTitle ? { absolute: title } : title,
        description: desc,
        keywords: keywords || undefined,
        alternates: {
            canonical: url,
        },
        robots: noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true },
        openGraph: {
            title,
            description: desc,
            url,
            siteName,
            locale: "fa_IR",
            type: type === "article" ? "article" : "website",
            ...(ogImage
                ? {
                      images: [
                          {
                              url: ogImage,
                              alt: title,
                          },
                      ],
                  }
                : {}),
        },
        twitter: {
            card: ogImage ? "summary_large_image" : "summary",
            title,
            description: desc,
            ...(ogImage ? { images: [ogImage] } : {}),
        },
        metadataBase: new URL(getSiteUrl()),
    };
}

export { DEFAULT_DESCRIPTION };
