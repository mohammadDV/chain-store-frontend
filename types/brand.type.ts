export interface Brand {
    id: number;
    title: string;
    logo: string | null;
    description?: string | null;
    banners: any[];
    colors: any[];
}