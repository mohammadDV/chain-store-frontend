"use client";

import { cn } from "@/lib/utils";
import type { WalletTransactionsResponse, WithdrawRequestsResponse } from "@/types/wallet.type";
import { useRouter, useSearchParams } from "next/navigation";
import { WalletRequests } from "./WalletRequests";
import { WalletTransactions } from "./WalletTransactions";

interface WalletTabsProps {
    transactionsData: WalletTransactionsResponse | null;
    requestsData: WithdrawRequestsResponse | null;
    activeTab: 'transactions' | 'withdraws';
}

export function WalletTabs({ transactionsData, requestsData, activeTab }: WalletTabsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleTabChange = (tab: 'transactions' | 'withdraws') => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('tab', tab);
        params.delete('page');
        router.push(`/profile/wallet?${params.toString()}`);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-1 border-b border-border">
                <button
                    onClick={() => handleTabChange("transactions")}
                    className={cn(
                        "px-6 py-3 text-sm font-medium transition-all cursor-pointer relative",
                        activeTab === "transactions"
                            ? "text-secondary"
                            : "text-description hover:text-title"
                    )}
                >
                    تراکنش ها
                    {activeTab === "transactions" && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-t-full" />
                    )}
                </button>
                <button
                    onClick={() => handleTabChange("withdraws")}
                    className={cn(
                        "px-6 py-3 text-sm font-medium transition-all cursor-pointer relative",
                        activeTab === "withdraws"
                            ? "text-secondary"
                            : "text-description hover:text-title"
                    )}
                >
                    درخواست ها
                    {activeTab === "withdraws" && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-t-full" />
                    )}
                </button>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                {activeTab === "transactions" && transactionsData ? (
                    <WalletTransactions
                        transactions={transactionsData.data}
                        pagination={{
                            currentPage: transactionsData.current_page,
                            lastPage: transactionsData.last_page,
                            links: transactionsData.links,
                            total: transactionsData.total,
                            perPage: transactionsData.per_page
                        }}
                    />
                ) : activeTab === "withdraws" && requestsData ? (
                    <WalletRequests
                        requests={requestsData.data}
                        pagination={{
                            currentPage: requestsData.current_page,
                            lastPage: requestsData.last_page,
                            links: requestsData.links,
                            total: requestsData.total,
                            perPage: requestsData.per_page
                        }}
                    />
                ) : null}
            </div>
        </div>
    );
}
