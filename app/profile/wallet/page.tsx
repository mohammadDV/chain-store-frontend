import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { TopNavProfile } from "../_components/topNavigation/TopNavProfile";
import { WalletHeader } from "./_components/WalletHeader";
import { WalletTabs } from "./_components/WalletTabs";
import type { TransactionType, WithdrawStatus, TransactionStatus } from "@/types/wallet.type";
import { getWallets } from "./_api/getWallets";
import { getWalletTransactions } from "./_api/getWalletTransactions";
import { getWithdrawRequests } from "./_api/getWithdrawRequests";

interface WalletPageProps {
    searchParams: Promise<{
        page?: string;
        type?: TransactionType;
        status?: TransactionStatus | WithdrawStatus;
        tab?: 'transactions' | 'withdraws';
    }>;
}

export default async function WalletPage({ searchParams }: WalletPageProps) {
    const isMobile = await isMobileDevice();
    const resolvedSearchParams = await searchParams;

    const walletsData = await getWallets();
    const balance = walletsData?.data?.[0]?.balance ? Number(walletsData.data[0].balance) : 0;

    const page = parseInt(resolvedSearchParams?.page || "1");
    const tab = resolvedSearchParams?.tab || 'transactions';

    let transactionsData = null;
    let withdrawRequestsData = null;

    if (tab === 'transactions') {
        const type = resolvedSearchParams?.type as TransactionType;
        const status = resolvedSearchParams?.status as TransactionStatus;

        transactionsData = await getWalletTransactions({
            id: walletsData?.data?.[0]?.id.toString() ?? "",
            page,
            type,
            status,
            count: 10
        });
    } else if (tab === 'withdraws') {
        const status = resolvedSearchParams?.status as WithdrawStatus;

        withdrawRequestsData = await getWithdrawRequests({
            page,
            status,
            count: 10
        });
    }

    return (
        <>
            {isMobile && <TopNavProfile title="کیف پول من" />}

            <div className="flex flex-col gap-6 p-4 lg:p-0 mt-4 lg:mt-0">
                <WalletHeader balance={balance} />
                <WalletTabs 
                    transactionsData={transactionsData} 
                    requestsData={withdrawRequestsData}
                    activeTab={tab}
                />
            </div>
        </>
    );
}
