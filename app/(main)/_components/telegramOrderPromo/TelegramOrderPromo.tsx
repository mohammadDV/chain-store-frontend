import {
  formatTelegramHandle,
  telegramProfileUrl,
} from "@/lib/pages/getContactSettings";
import Image from "next/image";
import Link from "next/link";

interface TelegramOrderPromoProps {
  telegramUsername: string;
}

export function TelegramOrderPromo({
  telegramUsername,
}: TelegramOrderPromoProps) {
  const href = telegramProfileUrl(telegramUsername);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full items-center gap-3 lg:gap-4 rounded-xl lg:rounded-2xl bg-surface p-3 lg:p-4 transition-colors hover:bg-surface/80"
    >
      <div className="relative size-16 shrink-0 lg:size-28">
        <Image
          src="/images/Telegram-order.webp"
          alt="سفارش از طریق تلگرام"
          fill
          sizes="(max-width: 1024px) 64px, 112px"
          className="object-contain"
        />
      </div>
      <div className="min-w-0 text-right">
        <h3 className="text-xs font-semibold text-title lg:text-base">
          ✨ محصولی از برندهای دیگر می‌خواهید؟
        </h3>
        <p className="mt-1 text-2xs leading-5 text-description lg:mt-1.5 lg:text-sm lg:leading-6">
          اگر محصول موردنظرتان از برندهای موجود در مجموعه ما نبود، نگران نباشید!
          می‌توانید محصولات موردنظر خود از برندهای دیگر در ترکیه یا دبی را نیز
          سفارش دهید.
        </p>
        <span className="mt-2 inline-block text-2xs font-medium text-secondary underline-offset-2 group-hover:underline lg:mt-3 lg:text-sm">
          کلیک کنید
        </span>
      </div>
    </Link>
  );
}
