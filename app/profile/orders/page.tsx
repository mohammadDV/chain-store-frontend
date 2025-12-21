import Link from "next/link";
import type { ComponentProps } from "react";
import { putCommas, cn } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";

type OrderStatus = "pending" | "completed" | "cancelled";

type OrderRow = {
    id: number;
    code: string;
    created_at: string;
    amount: number;
    tracking_code: string;
    status: OrderStatus;
};

function formatDateFa(dateIso: string) {
    const dt = new Date(dateIso);
    if (Number.isNaN(dt.getTime())) return dateIso;
    return dt.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}

function getStatusLabel(status: OrderStatus) {
    if (status === "pending") return "جاری";
    if (status === "completed") return "تحویل شده";
    return "لغو شده";
}

function getStatusVariant(status: OrderStatus): ComponentProps<typeof Badge>["variant"] {
    if (status === "pending") return "warning";
    if (status === "completed") return "success";
    return "error";
}

export default async function OrdersPage() {
    const orders: OrderRow[] = [
        {
            id: 101,
            code: "۵۴۰۰۵۵۸",
            created_at: "2025-12-10T10:20:00.000Z",
            amount: 12687300,
            tracking_code: "۴۶۴۸۵۱۳۱۰۰۴",
            status: "pending",
        },
        {
            id: 102,
            code: "۵۴۰۰۵۵۹",
            created_at: "2025-11-28T16:45:00.000Z",
            amount: 3495000,
            tracking_code: "۴۶۴۸۵۱۳۱۰۱۱",
            status: "completed",
        },
        {
            id: 103,
            code: "۵۴۰۰۵۶۰",
            created_at: "2025-11-02T08:05:00.000Z",
            amount: 985000,
            tracking_code: "۴۶۴۸۵۱۳۱۰۳۵",
            status: "cancelled",
        },
        {
            id: 104,
            code: "۵۴۰۰۵۶۱",
            created_at: "2025-10-18T19:10:00.000Z",
            amount: 15490000,
            tracking_code: "۴۶۴۸۵۱۳۱۰۴۹",
            status: "completed",
        },
    ];

    const gridCols = "grid-cols-[140px_160px_180px_220px_180px_1fr]";

    return (
        <div className="p-2 border border-border rounded-xl mx-4 lg:mx-0 mt-3 lg:mt-0">
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
                                        <div className="text-title font-semibold">{o.code}</div>
                                        <div className="text-sm text-title">{formatDateFa(o.created_at)}</div>
                                    <div className="text-sm font-bold text-secondary">{putCommas(o.amount)} تومان</div>
                                    <div className="text-sm text-title">{o.tracking_code}</div>
                                    <div>
                                            <Badge variant={getStatusVariant(o.status)} className="rounded-full px-3 py-1">
                                                {getStatusLabel(o.status)}
                                            </Badge>
                                    </div>
                                        <div className="flex items-center gap-2 justify-end">
                                            <Link
                                                href={`/profile/orders?order=${o.id}`}
                                                aria-label="مشاهده سفارش"
                                                className="size-8 rounded-full bg-white border border-border flex items-center justify-center hover:border-secondary/50 transition-colors"
                                            >
                                                <Icon icon="solar--eye-bold" sizeClass="size-5" className="text-secondary" />
                                            </Link>
                                            <Link
                                                href={o.status === "pending" ? `/checkout/${o.id}` : "/invoice"}
                                                aria-label={o.status === "pending" ? "پرداخت سفارش" : "مشاهده فاکتور"}
                                                className="size-8 rounded-full bg-white border border-border flex items-center justify-center hover:border-secondary/50 transition-colors"
                                            >
                                                <Icon icon="solar--document-text-bold" sizeClass="size-5" className="text-secondary" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
