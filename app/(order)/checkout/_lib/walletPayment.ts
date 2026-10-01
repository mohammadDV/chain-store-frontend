export type WalletPaymentStatus = {
  balance: number;
  payable: number;
  sufficient: boolean;
  shortfall: number;
};

/**
 * Pure helper for checkout wallet affordability checks.
 */
export function getWalletPaymentStatus(
  balance: number,
  payable: number
): WalletPaymentStatus {
  const safeBalance = Number.isFinite(balance) ? Math.max(0, balance) : 0;
  const safePayable = Number.isFinite(payable) ? Math.max(0, payable) : 0;
  const shortfall = Math.max(0, safePayable - safeBalance);

  return {
    balance: safeBalance,
    payable: safePayable,
    sufficient: shortfall === 0,
    shortfall,
  };
}
