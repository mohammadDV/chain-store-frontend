import { getApiUrl } from "@/configs/global";
import type { UnlockedOrderDetails } from "./getOrderByCode";

interface UnlockResponse {
  status: number;
  message?: string;
  data?: UnlockedOrderDetails;
}

export async function unlockOrderRecipient(
  code: string,
  payload: { password?: string; unlock_token?: string }
): Promise<{ ok: true; data: UnlockedOrderDetails } | { ok: false; message: string }> {
  try {
    const res = await fetch(
      `${getApiUrl()}/orders/by-code/${encodeURIComponent(code)}/recipient`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const json = (await res.json()) as UnlockResponse;

    if (res.ok && json.status === 1 && json.data) {
      return { ok: true, data: json.data };
    }

    return {
      ok: false,
      message: json.message || "امکان مشاهده اطلاعات سفارش وجود ندارد.",
    };
  } catch {
    return {
      ok: false,
      message: "خطا در ارتباط با سرور. دوباره تلاش کنید.",
    };
  }
}
