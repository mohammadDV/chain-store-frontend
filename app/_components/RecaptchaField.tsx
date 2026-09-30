"use client";

import Script from "next/script";
import { forwardRef, useImperativeHandle } from "react";

declare global {
    interface Window {
        grecaptcha?: {
            enterprise: {
                ready: (callback: () => void) => void;
                execute: (siteKey: string, options: { action: string }) => Promise<string>;
            };
        };
    }
}

export type RecaptchaFieldHandle = {
    getToken: (action?: string) => Promise<string | null>;
    reset: () => void;
};

type RecaptchaFieldProps = {
    /** Default Enterprise action name for this form */
    action?: string;
    className?: string;
};

async function executeEnterprise(siteKey: string, action: string): Promise<string | null> {
    if (!siteKey || typeof window === "undefined" || !window.grecaptcha?.enterprise) {
        return null;
    }

    await new Promise<void>((resolve) => {
        window.grecaptcha!.enterprise.ready(() => resolve());
    });

    return window.grecaptcha.enterprise.execute(siteKey, { action });
}

export const RecaptchaField = forwardRef<RecaptchaFieldHandle, RecaptchaFieldProps>(
    function RecaptchaField({ action = "SUBMIT", className }, ref) {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

        useImperativeHandle(ref, () => ({
            getToken: (overrideAction?: string) =>
                executeEnterprise(siteKey, overrideAction ?? action),
            reset: () => {
                // Score-based Enterprise tokens are one-shot; next getToken() fetches a new one.
            },
        }), [siteKey, action]);

        if (!siteKey) {
            return (
                <p className={`text-xs text-destructive ${className ?? ""}`}>
                    کلید reCAPTCHA تنظیم نشده است.
                </p>
            );
        }

        return (
            <div className={className}>
                <Script
                    src={`https://www.google.com/recaptcha/enterprise.js?render=${encodeURIComponent(siteKey)}`}
                    strategy="afterInteractive"
                />
            </div>
        );
    }
);
