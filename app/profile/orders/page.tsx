import { Pagination } from "@/app/_components/pagination";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { cn, putCommas } from "@/lib/utils";
import type { OrderStatus } from "@/types/Order.type";
import { Badge } from "@/ui/badge";
import type { ComponentProps } from "react";
import { TopNavProfile } from "../_components/topNavigation/TopNavProfile";
import { getMyOrders } from "./_api/getMyOrders";
import { OrderProductsModal } from "./_components/OrderProductsModal";

function getStatusLabel(status: OrderStatus) {
    if (status === "pending") return "جاری";
    if (status === "paid") return "پرداخت شده";
    if (status === "completed") return "تحویل شده";
    return "لغو شده";
}

function getStatusVariant(status: OrderStatus): ComponentProps<typeof Badge>["variant"] {
    if (status === "pending") return "warning";
    if (status === "paid") return "success";
    if (status === "completed") return "success";
    return "error";
}

export default async function OrdersPage({
    searchParams,
}: {
    searchParams?: { page?: string };
}) {
    const isMobile = await isMobileDevice();

    const page = Math.max(1, Number(searchParams?.page ?? 1) || 1);
    const ordersData = await getMyOrders({ page });
    const orders = ordersData.data ?? [];

    const gridCols = "grid-cols-[140px_160px_220px_220px_180px_1fr]";

    return (
        <>
            {isMobile && <TopNavProfile title="سفارشات من" />}
            <div className="p-2 border border-border rounded-xl mx-4 lg:mx-0 mt-4 lg:mt-0">
                <div className="overflow-hidden bg-white">
                    <div className="overflow-x-auto">
                        <div className="min-w-[980px]">
                            <div className={cn("grid", gridCols, "bg-surface px-4 py-4 mb-2 rounded-lg")}>
                                <div className="text-sm font-medium text-title">شماره سفارش</div>
                                <div className="text-sm font-medium text-title">تاریخ</div>
                                <div className="text-sm font-medium text-title">مبلغ</div>
                                <div className="text-sm font-medium text-title">کد رهگیری</div>
                                <div className="text-sm font-medium text-title">وضعیت سفارش</div>
                                <div className="text-sm font-medium text-title text-left">عملیات</div>
                            </div>

                            {orders.length === 0 ? (
                                <p className="text-sm text-description text-center py-8">موردی جهت نمایش وجود ندارد.</p>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {orders.map((o, idx) => {
                                        return (
                                            <div
                                                key={o.id}
                                                className={cn(
                                                    "grid items-center px-4 py-3 rounded-lg transition-colors",
                                                    gridCols,
                                                    idx % 2 === 0 ? "bg-white" : "bg-surface",
                                                    "hover:bg-secondary/5"
                                                )}
                                            >
                                                <div className="text-title font-semibold">{o.id}</div>
                                                <div className="text-sm text-title">{o.created_at}</div>
                                                <div className="text-sm font-bold text-secondary">{putCommas(Number(o.amount || 0))} تومان</div>
                                                <div className="text-sm text-title">{o.code}</div>
                                                <div>
                                                    <Badge variant={getStatusVariant(o.status)} className="rounded-full px-3 py-1">
                                                        {getStatusLabel(o.status)}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-2 justify-end">
                                                    <OrderProductsModal orderCode={o.code} products={o.products ?? []} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {orders.length > 0 && ordersData.total > ordersData.per_page && (
                    <div className="mt-6">
                        <Pagination
                            currentPage={ordersData.current_page}
                            lastPage={ordersData.last_page}
                            links={ordersData.links}
                            total={ordersData.total}
                            routeUrl="/profile/orders"
                        />
                    </div>
                )}
            </div>
        </>
    );
}
