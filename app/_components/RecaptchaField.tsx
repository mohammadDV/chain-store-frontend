"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export type RecaptchaFieldHandle = {
    getToken: () => string | null;
    reset: () => void;
};

type RecaptchaFieldProps = {
    className?: string;
};

export const RecaptchaField = forwardRef<RecaptchaFieldHandle, RecaptchaFieldProps>(
    function RecaptchaField({ className }, ref) {
        const captchaRef = useRef<ReCAPTCHA>(null);
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

        useImperativeHandle(ref, () => ({
            getToken: () => captchaRef.current?.getValue() ?? null,
            reset: () => captchaRef.current?.reset(),
        }));

        if (!siteKey) {
            return (
                <p className="text-xs text-destructive">
                    کلید reCAPTCHA تنظیم نشده است.
                </p>
            );
        }

        return (
            <div className={className}>
                <ReCAPTCHA
                    ref={captchaRef}
                    sitekey={siteKey}
                    hl="fa"
                />
            </div>
        );
    }
);
