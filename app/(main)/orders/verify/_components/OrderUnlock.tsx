"use client";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { FormEvent, useEffect, useState, useTransition } from "react";
import type { UnlockedOrderDetails } from "../_api/getOrderByCode";
import { unlockOrderRecipient } from "../_api/unlockOrderRecipient";
import { OrderDetailsCard } from "./OrderDetailsCard";

const COOKIE_NAME = "boof_invoice_unlock";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24h

type Props = {
  orderCode: string;
};

function readUnlockCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  return decodeURIComponent(match.slice(COOKIE_NAME.length + 1)) || null;
}

function writeUnlockCookie(token: string, maxAgeSeconds = COOKIE_MAX_AGE) {
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(token)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax${secure}`;
}

function clearUnlockCookie() {
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax${secure}`;
}

export function OrderUnlock({ orderCode }: Props) {
  const [password, setPassword] = useState("");
  const [order, setOrder] = useState<UnlockedOrderDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [bootstrapping, setBootstrapping] = useState(true);

  useEffect(() => {
    const token = readUnlockCookie();
    if (!token) {
      setBootstrapping(false);
      return;
    }

    startTransition(async () => {
      const result = await unlockOrderRecipient(orderCode, {
        unlock_token: token,
      });

      if (result.ok) {
        setOrder(result.data);
        if (result.data.unlock_token) {
          const maxAge =
            result.data.unlock_expires_at != null
              ? Math.max(
                  60,
                  result.data.unlock_expires_at - Math.floor(Date.now() / 1000)
                )
              : COOKIE_MAX_AGE;
          writeUnlockCookie(result.data.unlock_token, maxAge);
        }
      } else {
        clearUnlockCookie();
      }

      setBootstrapping(false);
    });
  }, [orderCode]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await unlockOrderRecipient(orderCode, { password });

      if (!result.ok) {
        setError(result.message);
        return;
      }

      setOrder(result.data);
      setPassword("");
      if (result.data.unlock_token) {
        const maxAge =
          result.data.unlock_expires_at != null
            ? Math.max(
                60,
                result.data.unlock_expires_at - Math.floor(Date.now() / 1000)
              )
            : COOKIE_MAX_AGE;
        writeUnlockCookie(result.data.unlock_token, maxAge);
      }
    });
  };

  if (bootstrapping) {
    return (
      <div className="mt-8 bg-white border border-border rounded-2xl p-5 lg:p-6">
        <p className="text-sm text-description text-center py-6">
          در حال بررسی دسترسی...
        </p>
      </div>
    );
  }

  if (order) {
    return <OrderDetailsCard order={order} />;
  }

  return (
    <div className="mt-8 bg-white border border-border rounded-2xl p-5 lg:p-6">
      <div>
        <p className="text-xs text-description">کد رهگیری</p>
        <p className="text-base font-semibold text-title mt-1 tracking-wide">
          {orderCode}
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface/60 p-4 lg:p-5">
        <h2 className="text-sm font-semibold text-title">مشاهده کامل سفارش</h2>
        <p className="text-xs text-description mt-1 leading-6">
          برای دیدن تمام اطلاعات سفارش (گیرنده، اقلام، مبالغ و وضعیت) رمز مشترک
          پیک/انبار را وارد کنید.
        </p>

        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
          <Input
            type="password"
            autoComplete="current-password"
            placeholder="رمز مشاهده سفارش"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={pending}
            required
          />
          {error ? <p className="text-sm text-error">{error}</p> : null}
          <Button
            type="submit"
            variant="secondary"
            size="small"
            disabled={pending || !password}
          >
            {pending ? "در حال بررسی..." : "نمایش تمام اطلاعات سفارش"}
          </Button>
        </form>
      </div>
    </div>
  );
}
