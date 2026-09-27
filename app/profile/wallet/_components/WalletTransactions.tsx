import { cn, putCommas } from "@/lib/utils";
import { formatToShamsiDateTime } from "@/lib/dateUtils";
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

const DESCRIPTION_FALLBACKS: Record<string, string> = {
    "site.wallet_transaction_payment_order": "پرداخت سفارش",
    wallet_transaction_payment_order: "پرداخت سفارش",
    "site.wallet_transaction_wallet_topup": "شارژ کیف پول",
    wallet_transaction_wallet_topup: "شارژ کیف پول",
    "site.wallet_transaction_wallet_withdrawal": "برداشت از کیف پول",
    wallet_transaction_wallet_withdrawal: "برداشت از کیف پول",
    "site.wallet_transaction_withdrawal_refund": "بازگشت وجه برداشت",
    wallet_transaction_withdrawal_refund: "بازگشت وجه برداشت",
    "site.wallet_transaction_transfer_to": "انتقال به کیف پول دیگر",
    wallet_transaction_transfer_to: "انتقال به کیف پول دیگر",
    "site.wallet_transaction_transfer_from": "دریافت از کیف پول دیگر",
    wallet_transaction_transfer_from: "دریافت از کیف پول دیگر",
};

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

function formatDescription(description?: string | null) {
    if (!description) return "-";

    const trimmed = description.trim();
    return DESCRIPTION_FALLBACKS[trimmed] ?? trimmed;
}

function formatAmount(amount: string | number) {
    const value = Number(amount);
    const isCredit = value >= 0;
    const formatted = putCommas(Math.abs(value));

    return {
        isCredit,
        label: `${isCredit ? "+" : "-"}${formatted} تومان`,
    };
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
                                {transactions.map((t) => {
                                    const amount = formatAmount(t.amount);

                                    return (
                                        <div
                                            key={t.id}
                                            className={cn(
                                                "grid items-center px-4 py-4 transition-colors border-b border-border/50 last:border-0",
                                                gridCols,
                                                "hover:bg-secondary/5"
                                            )}
                                        >
                                            <div className="text-title font-semibold">#{t.id}</div>
                                            <div className="text-sm text-title">{formatToShamsiDateTime(t.created_at)}</div>
                                            <div className={cn(
                                                "text-sm font-bold",
                                                amount.isCredit ? "text-success" : "text-error"
                                            )}>
                                                {amount.label}
                                            </div>
                                            <div className="text-sm text-description truncate pr-2">{formatDescription(t.description)}</div>
                                            <div className="text-sm text-title">{getTypeLabel(t.type)}</div>
                                            <div className="text-left pl-2">
                                                <Badge variant={getStatusVariant(t.status)} className="rounded-full px-3 py-1">
                                                    {getStatusLabel(t.status)}
                                                </Badge>
                                            </div>
                                        </div>
                                    );
                                })}
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
