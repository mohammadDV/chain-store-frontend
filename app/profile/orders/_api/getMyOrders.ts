import { getFetchAuth } from "@/core/privateService";
import { OrdersResponse } from "@/types/Order.type";

interface GetMyOrdersParams {
    page?: number;
    count?: number;
}

export async function getMyOrders({
    page = 1,
    count = 8,
}: GetMyOrdersParams): Promise<OrdersResponse> {
    const searchParams = new URLSearchParams({
        count: count.toString(),
        page: page.toString(),
    });

    return getFetchAuth<OrdersResponse>(
        `/profile/orders?${searchParams.toString()}`
    );
}