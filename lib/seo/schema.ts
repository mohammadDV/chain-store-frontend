import { absoluteUrl } from "./absoluteUrl";
import type { BreadcrumbItem } from "./Breadcrumbs";

export function breadcrumbListJsonLd(items: BreadcrumbItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            ...(item.href
                ? { item: absoluteUrl(item.href) }
                : {}),
        })),
    };
}

export function organizationJsonLd(options?: {
    description?: string;
    logo?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "بوف استور",
        url: absoluteUrl("/"),
        ...(options?.description ? { description: options.description } : {}),
        ...(options?.logo ? { logo: options.logo } : {}),
    };
}

export function webSiteJsonLd(description?: string) {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "بوف استور",
        url: absoluteUrl("/"),
        ...(description ? { description } : {}),
        inLanguage: "fa-IR",
        potentialAction: {
            "@type": "SearchAction",
            target: `${absoluteUrl("/shop")}?query={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };
}

export function productJsonLd(input: {
    name: string;
    description?: string;
    image?: string;
    url: string;
    price: number;
    currency?: string;
    brand?: string;
    ratingValue?: number;
    reviewCount?: number;
    availability?: "InStock" | "OutOfStock";
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: input.name,
        ...(input.description ? { description: input.description } : {}),
        ...(input.image ? { image: input.image } : {}),
        url: input.url,
        ...(input.brand
            ? { brand: { "@type": "Brand", name: input.brand } }
            : {}),
        offers: {
            "@type": "Offer",
            url: input.url,
            priceCurrency: input.currency || "IRR",
            price: input.price,
            availability: `https://schema.org/${input.availability || "InStock"}`,
        },
        ...(input.ratingValue && input.reviewCount
            ? {
                  aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: input.ratingValue,
                      reviewCount: input.reviewCount,
                  },
              }
            : {}),
    };
}

export function blogPostingJsonLd(input: {
    title: string;
    description?: string;
    image?: string;
    url: string;
    datePublished?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: input.title,
        ...(input.description ? { description: input.description } : {}),
        ...(input.image ? { image: input.image } : {}),
        url: input.url,
        mainEntityOfPage: input.url,
        ...(input.datePublished ? { datePublished: input.datePublished } : {}),
        author: {
            "@type": "Organization",
            name: "بوف استور",
        },
        publisher: {
            "@type": "Organization",
            name: "بوف استور",
        },
    };
}

export function itemListJsonLd(
    items: { name: string; url: string }[],
    name: string
) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name,
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            url: item.url,
        })),
    };
}

export function contactPageJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "تماس با ما",
        url: absoluteUrl("/contact"),
        isPartOf: {
            "@type": "WebSite",
            name: "بوف استور",
            url: absoluteUrl("/"),
        },
    };
}
