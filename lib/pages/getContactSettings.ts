import { getFetch } from "@/core/publicService";

export type ContactSettings = {
  title: string;
  subtitle: string | null;
  phone: string | null;
  phone_hours: string | null;
  address: string | null;
  map_url: string | null;
  email: string | null;
  email_hint: string | null;
  telegram_username: string;
};

const DEFAULT_CONTACT: ContactSettings = {
  title: "با ما در  ارتباط باشید",
  subtitle: "ما میتوانیم به شما کمک کنیم!",
  phone: null,
  phone_hours: null,
  address: null,
  map_url: null,
  email: null,
  email_hint: null,
  telegram_username: "mohammaddv",
};

export async function getContactSettings(): Promise<ContactSettings> {
  try {
    const res = await getFetch<{ status: number; data: ContactSettings }>(
      "/settings/contact",
      { revalidate: false, tags: ["settings-contact"] }
    );

    return {
      ...(res.data ?? DEFAULT_CONTACT),
      telegram_username:
        res.data?.telegram_username?.replace(/^@+/, "").trim() ||
        DEFAULT_CONTACT.telegram_username,
    };
  } catch {
    return DEFAULT_CONTACT;
  }
}

export function telegramProfileUrl(username: string): string {
  const handle = username.replace(/^@+/, "").trim();
  return `https://t.me/${handle || "mohammaddv"}`;
}

export function formatTelegramHandle(username: string): string {
  const handle = username.replace(/^@+/, "").trim() || "mohammaddv";
  return `@${handle}`;
}
