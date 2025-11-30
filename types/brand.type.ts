export interface Brand {
    id: number;
    title: string;
    logo: string | null;
    description?: string | null;
    banners: any[];
    colors: any[];
}

export interface BrandBanner {
    id: number;
    title: string;
    link: string | null;
    image: string | null
}