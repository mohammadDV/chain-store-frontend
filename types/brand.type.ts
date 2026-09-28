export interface Brand {
    id: number;
    title: string;
    slug?: string | null;
    logo: string | null;
    description?: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string | null;
    og_image?: string | null;
    banners: any[];
    colors: any[];
}

export interface BrandBanner {
    id: number;
    title: string;
    link: string | null;
    image: string | null
}
