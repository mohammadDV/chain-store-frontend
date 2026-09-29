import { getFetch } from "@/core/publicService";

export type PublicFeatures = {
  payment_gateway_enabled: boolean;
  payment_gateway_disabled_message: string | null;
};

const DEFAULT_FEATURES: PublicFeatures = {
  payment_gateway_enabled: true,
  payment_gateway_disabled_message: null,
};

export async function getPublicFeatures(): Promise<PublicFeatures> {
  try {
    const res = await getFetch<{ status: number; data: PublicFeatures }>(
      "/settings/features",
      { revalidate: 60 }
    );

    return res.data ?? DEFAULT_FEATURES;
  } catch {
    return DEFAULT_FEATURES;
  }
}
