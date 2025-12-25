import { cn, putCommas } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import type { WalletTransaction, TransactionStatus } from "@/types/wallet.type";
import type { ComponentProps } from "react";
import { Pagination } from "@/app/_components/pagination";
import type { PaginationLink } from "@/app/_components/pagination";

interface WalletTransactionsProps {
    transactions: WalletTransaction[];
    pagination: {
        currentPage: number;
        lastPage: number;
        links: PaginationLink[];
        total: number;
        perPage: number;
    };
}

function getStatusLabel(status: TransactionStatus) {
    if (status === "completed") return "موفق";
    if (status === "pending") return "در حال پردازش";
    return "ناموفق";
}

function getStatusVariant(status: TransactionStatus): ComponentProps<typeof Badge>["variant"] {
    if (status === "pending") return "warning";
    if (status === "completed") return "success";
    return "error";
}

function getTypeLabel(type: WalletTransaction["type"]) {
    if (type === "deposit") return "واریز";
    if (type === "withdrawal") return "برداشت";
    if (type === "refund") return "مرجوعی";
    if (type === "purchase") return "خرید";
    return "انتقال";
}

export function WalletTransactions({ transactions, pagination }: WalletTransactionsProps) {
    const gridCols = "grid-cols-[100px_200px_140px_1fr_120px_120px]";

    return (
        <div className="flex flex-col gap-4">
            <div className="overflow-hidden bg-white border border-border rounded-xl">
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className={cn("grid", gridCols, "bg-surface px-4 py-4 mb-2 border-b border-border/50")}>
                            <div className="text-sm font-medium text-title">شناسه</div>
                            <div className="text-sm font-medium text-title">تاریخ</div>
                            <div className="text-sm font-medium text-title">مبلغ</div>
                            <div className="text-sm font-medium text-title">توضیحات</div>
                            <div className="text-sm font-medium text-title">نوع</div>
                            <div className="text-sm font-medium text-title text-left pl-2">وضعیت</div>
                        </div>

                        {transactions.length === 0 ? (
                            <p className="text-sm text-description text-center py-8">تراکنشی یافت نشد.</p>
                        ) : (
                            <div className="flex flex-col">
                                {transactions.map((t, idx) => (
                                    <div
                                        key={t.id}
                                        className={cn(
                                            "grid items-center px-4 py-4 transition-colors border-b border-border/50 last:border-0",
                                            gridCols,
                                            "hover:bg-secondary/5"
                                        )}
                                    >
                                        <div className="text-title font-semibold">#{t.id}</div>
                                        <div className="text-sm text-title">{t.created_at}</div>
                                        <div className={cn(
                                            "text-sm font-bold",
                                            t.type === "deposit" ? "text-success" : "text-error"
                                        )}>
                                            {t.type === "deposit" ? "+" : "-"}{putCommas(Number(t.amount))} تومان
                                        </div>
                                        <div className="text-sm text-description truncate pr-2">{t.description}</div>
                                        <div className="text-sm text-title">{getTypeLabel(t.type)}</div>
                                        <div className="text-left pl-2">
                                            <Badge variant={getStatusVariant(t.status)} className="rounded-full px-3 py-1">
                                                {getStatusLabel(t.status)}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {transactions.length > 0 && pagination.total > pagination.perPage && (
                <Pagination
                    currentPage={pagination.currentPage}
                    lastPage={pagination.lastPage}
                    links={pagination.links}
                    total={pagination.total}
                    routeUrl="/profile/wallet?tab=transactions"
                />
            )}
        </div>
    );
}
