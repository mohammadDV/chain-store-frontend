"use client";

import Script from "next/script";
import { forwardRef, useImperativeHandle } from "react";

declare global {
    interface Window {
        grecaptcha?: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

export type RecaptchaFieldHandle = {
    getToken: (action?: string) => Promise<string | null>;
    reset: () => void;
};

type RecaptchaFieldProps = {
    /** Default reCAPTCHA v3 action name for this form */
    action?: string;
    className?: string;
};

async function executeRecaptcha(siteKey: string, action: string): Promise<string | null> {
    if (!siteKey || typeof window === "undefined" || !window.grecaptcha?.execute) {
        return null;
    }

    await new Promise<void>((resolve) => {
        window.grecaptcha!.ready(() => resolve());
    });

    return window.grecaptcha.execute(siteKey, { action });
}

export const RecaptchaField = forwardRef<RecaptchaFieldHandle, RecaptchaFieldProps>(
    function RecaptchaField({ action = "SUBMIT", className }, ref) {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

        useImperativeHandle(ref, () => ({
            getToken: (overrideAction?: string) =>
                executeRecaptcha(siteKey, overrideAction ?? action),
            reset: () => {
                // Score-based v3 tokens are one-shot; next getToken() fetches a new one.
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
                    src={`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`}
                    strategy="afterInteractive"
                />
            </div>
        );
    }
);
