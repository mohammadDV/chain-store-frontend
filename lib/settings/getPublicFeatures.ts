import { getFetch } from "@/core/publicService";

export type PublicFeatures = {
  payment_gateway_enabled: boolean;
  payment_gateway_disabled_message: string | null;
  delivery_amount: number;
  limit_delivery_amount: number;
};

const DEFAULT_FEATURES: PublicFeatures = {
  payment_gateway_enabled: true,
  payment_gateway_disabled_message: null,
  delivery_amount: 0,
  limit_delivery_amount: 0,
};

export async function getPublicFeatures(): Promise<PublicFeatures> {
  try {
    const res = await getFetch<{ status: number; data: PublicFeatures }>(
      "/settings/features",
      { revalidate: 10 }
    );

    const data = res.data;
    if (!data) {
      return DEFAULT_FEATURES;
    }

    return {
      payment_gateway_enabled: data.payment_gateway_enabled ?? true,
      payment_gateway_disabled_message:
        data.payment_gateway_disabled_message ?? null,
      delivery_amount: Number(data.delivery_amount ?? DEFAULT_FEATURES.delivery_amount),
      limit_delivery_amount: Number(
        data.limit_delivery_amount ?? DEFAULT_FEATURES.limit_delivery_amount
      ),
    };
  } catch {
    return DEFAULT_FEATURES;
  }
}
