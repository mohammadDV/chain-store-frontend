import { getFetchAuth } from "@/core/privateService";
import { WalletsResponse } from "@/types/wallet.type";

export const getWallets = async (): Promise<WalletsResponse> => {
  return await getFetchAuth<WalletsResponse>("/profile/wallets");
};
