/**
 * Resolve CMS/banner links:
 * - https://... or http://... → external (open in new tab)
 * - shop or /shop → internal Next.js path
 */
export function resolveSiteLink(link: string | null | undefined): {
    href: string;
    isExternal: boolean;
} | null {
    const raw = link?.trim();

    if (!raw) {
        return null;
    }

    if (/^https?:\/\//i.test(raw)) {
        return {
            href: raw,
            isExternal: true,
        };
    }

    const path = raw.startsWith("/") ? raw : `/${raw}`;

    return {
        href: path,
        isExternal: false,
    };
}
