import { FILE_URL, SITE_URL } from "@/configs/global";

export function getSiteUrl(): string {
    return (SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

export function absoluteUrl(path: string = "/"): string {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return `${getSiteUrl()}${normalized}`;
}

export function absoluteImageUrl(image?: string | null): string | undefined {
    if (!image) return undefined;
    if (image.startsWith("http://") || image.startsWith("https://")) {
        return image;
    }
    const base = (FILE_URL || "").replace(/\/$/, "");
    const path = image.startsWith("/") ? image : `/${image}`;
    return base ? `${base}${path}` : absoluteUrl(path);
}

export function stripHtml(html?: string | null): string {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function truncateText(text: string, max = 160): string {
    if (text.length <= max) return text;
    return `${text.slice(0, max - 1).trim()}…`;
}

export function isNumericParam(value: string): boolean {
    return /^\d+$/.test(value);
}

export function entityPath(
    type: "product" | "shop" | "post" | "brand",
    slugOrId: string | number | null | undefined
): string {
    if (slugOrId === null || slugOrId === undefined || slugOrId === "") {
        return type === "shop" ? "/shop" : "/";
    }
    return `/${type === "shop" ? "shop" : type}/${slugOrId}`;
}
