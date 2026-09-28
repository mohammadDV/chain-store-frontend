export type Category = {
    id: number;
    title: string;
    slug?: string | null;
    parent_id: number;
    description?: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string | null;
    og_image?: string | null;
    image: string | null;
    children: Category[];
    parent?: Category | null;
}
