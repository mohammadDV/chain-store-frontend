import { getFetchAuth } from "@/core/privateService";
import { Order } from "@/types/Order.type";

export const getOrder = async (id: string): Promise<Order> => {
    return getFetchAuth<Order>(`/profile/orders/${id}`);
}