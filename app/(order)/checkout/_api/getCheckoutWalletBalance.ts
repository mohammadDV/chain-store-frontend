import { getFetchAuth } from "@/core/privateService";

type WalletShowResponse = {
  status: number;
  data?: {
    balance?: string | number;
    available_balance?: string | number;
    currency?: string;
  };
};

/**
 * Available wallet balance for checkout (prefers available_balance).
 */
export async function getCheckoutWalletBalance(): Promise<number> {
  try {
    const res = await getFetchAuth<WalletShowResponse>("/profile/wallet");
    const raw = res.data?.available_balance ?? res.data?.balance ?? 0;
    const balance = Number(raw);

    return Number.isFinite(balance) ? Math.max(0, balance) : 0;
  } catch {
    return 0;
  }
}
