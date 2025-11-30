export type Category = {
    id: number;
    title: string;
    parent_id: number;
    image: string | null;
    children: Category[]
}