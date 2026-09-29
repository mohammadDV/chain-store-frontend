import { getFetch } from "@/core/publicService";

export type PageNavItem = {
  slug: string;
  title: string;
  show_in_menu: boolean;
  sort_order: number;
};

export type SitePage = {
  slug: string;
  title: string;
  image: string | null;
  content: string | null;
  meta_title: string | null;
  meta_description: string | null;
};

export async function getPagesNav(): Promise<PageNavItem[]> {
  try {
    const res = await getFetch<{ status: number; data: PageNavItem[] }>(
      "/pages",
      { revalidate: false, tags: ["pages-nav"] }
    );

    return Array.isArray(res.data) ? res.data : [];
  } catch {
    return [];
  }
}

export async function getPage(slug: string): Promise<SitePage | null> {
  try {
    const res = await getFetch<{ status: number; data: SitePage }>(
      `/pages/${slug}`,
      { revalidate: false, tags: [`page-${slug}`] }
    );

    if (res.status !== 1 || !res.data) {
      return null;
    }

    return res.data;
  } catch {
    return null;
  }
}

export function pageHref(slug: string): string {
  return `/pages/${slug}`;
}
