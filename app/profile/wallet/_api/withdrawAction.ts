import { postFetchAuth } from "@/core/privateService";

export interface WithdrawResponse {
  status: number;
  message?: string;
  errors?: { [key: string]: string[] };
}

export const withdrawAction = async (
  _state: any,
  formData: FormData
): Promise<WithdrawResponse> => {
  const amount = formData.get("amount");
  const card = formData.get("card");
  const sheba = formData.get("sheba");
  const description = formData.get("description");

  try {
    const res = await postFetchAuth<WithdrawResponse>("/profile/withdraws", {
      amount,
      card,
      sheba,
      description,
    });
    return res;
  } catch (error) {
    throw new Error(`مشکل در دریافت اطلاعات`);
  }
};
