import { cn, putCommas } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import type { WithdrawRequest, WithdrawStatus } from "@/types/wallet.type";
import type { ComponentProps } from "react";
import { Pagination } from "@/app/_components/pagination";
import type { PaginationLink } from "@/app/_components/pagination";

interface WalletRequestsProps {
    requests: WithdrawRequest[];
    pagination: {
        currentPage: number;
        lastPage: number;
        links: PaginationLink[];
        total: number;
        perPage: number;
    };
}

function getStatusLabel(status: WithdrawStatus) {
    if (status === "completed") return "تایید شده";
    if (status === "pending") return "در انتظار بررسی";
    return "رد شده";
}

function getStatusVariant(status: WithdrawStatus): ComponentProps<typeof Badge>["variant"] {
    if (status === "pending") return "warning";
    if (status === "completed") return "success";
    return "error";
}

export function WalletRequests({ requests, pagination }: WalletRequestsProps) {
    const gridCols = "grid-cols-[100px_180px_180px_1fr_120px]";

    return (
        <div className="flex flex-col gap-4">
            <div className="overflow-hidden bg-white border border-border rounded-xl">
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className={cn("grid", gridCols, "bg-surface px-4 py-4 mb-2 border-b border-border/50")}>
                            <div className="text-sm font-medium text-title">شناسه</div>
                            <div className="text-sm font-medium text-title">تاریخ</div>
                            <div className="text-sm font-medium text-title">مبلغ</div>
                            <div className="text-sm font-medium text-title">شماره شبا</div>
                            <div className="text-sm font-medium text-title text-left pl-2">وضعیت</div>
                        </div>

                        {requests.length === 0 ? (
                            <p className="text-sm text-description text-center py-8">درخواستی یافت نشد.</p>
                        ) : (
                            <div className="flex flex-col">
                                {requests.map((r, idx) => (
                                    <div
                                        key={r.id}
                                        className={cn(
                                            "grid items-center px-4 py-4 transition-colors border-b border-border/50 last:border-0",
                                            gridCols,
                                            "hover:bg-secondary/5"
                                        )}
                                    >
                                        <div className="text-title font-semibold">#{r.id}</div>
                                        <div className="text-sm text-title">{r.created_at}</div>
                                        <div className="text-sm font-bold text-title">
                                            {putCommas(Number(r.amount))} تومان
                                        </div>
                                        <div className="text-sm text-title font-mono">{r.sheba || "-"}</div>
                                        <div className="text-left pl-2">
                                            <Badge variant={getStatusVariant(r.status)} className="rounded-full px-3 py-1">
                                                {getStatusLabel(r.status)}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {requests.length > 0 && pagination.total > pagination.perPage && (
                <Pagination
                    currentPage={pagination.currentPage}
                    lastPage={pagination.lastPage}
                    links={pagination.links}
                    total={pagination.total}
                    routeUrl="/profile/wallet?tab=withdraws"
                />
            )}
        </div>
    );
}
