import { postFetchAuth } from "@/core/privateService";

export interface TopUpResponse {
  status: number;
  message?: string;
  errors?: { [key: string]: string[] };
  url?: string;
}

export const topUpAction = async (
  _state: any,
  formData: FormData
): Promise<TopUpResponse> => {
  const amount = formData.get("amount");

  try {
    const res = await postFetchAuth<TopUpResponse>("/profile/wallet/top-up", {
      amount,
    });
    return res;
  } catch (error) {
    throw new Error(`مشکل در دریافت اطلاعات`);
  }
};
