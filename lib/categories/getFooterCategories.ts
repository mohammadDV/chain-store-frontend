import { getFetch } from "@/core/publicService";

export type FooterCategoryLink = {
  title: string;
  slug: string | null;
};

export type FooterCategoryColumn = {
  title: string;
  slug: string | null;
  links: FooterCategoryLink[];
};

export async function getFooterCategories(): Promise<FooterCategoryColumn[]> {
  try {
    const res = await getFetch<{ status: number; data: FooterCategoryColumn[] }>(
      "/categories/footer",
      {
        revalidate: 86400,
        tags: ["categories-footer"],
      }
    );

    return Array.isArray(res.data) ? res.data : [];
  } catch {
    return [];
  }
}

export function categoryHref(slug: string | null | undefined): string {
  return slug ? `/shop/${slug}` : "/shop";
}
