export type OrderStatus = "pending" | "completed" | "cancelled";

export interface Order {
    id: number;
    code: string;
    fullname: string | null;
    address: string | null;
    postal_code: string | null;
    user_id: number;
    product_count: number;
    total_amount: string;
    delivery_amount: string;
    discount_amount: string;
    amount: string;
    status: OrderStatus;
    vip: number;
    products: OrderProduct[];
    created_at: string;
}

export interface OrderProduct {
    id: number;
    title: string;
    image: string | null;
    count: number;
    amount: string;
    status: OrderStatus;
    color_id: number;
    size_id: number;
}