import { getFetchAuth } from "@/core/privateService";
import {
  WalletTransactionsResponse,
  WalletTransactionFilters,
} from "@/types/wallet.type";

interface GetWalletTransactionsParams extends WalletTransactionFilters {
  id: string;
}

export async function getWalletTransactions({
  id,
  type,
  status,
  page = 1,
  count = 10,
}: GetWalletTransactionsParams): Promise<WalletTransactionsResponse> {
  const searchParams = new URLSearchParams({
    count: count.toString(),
    page: page.toString(),
  });

  if (type) searchParams.set("type", type);
  if (status) searchParams.set("status", status);

  return getFetchAuth<WalletTransactionsResponse>(
    `/profile/wallet-transaction/${id}?${searchParams.toString()}`
  );
}
