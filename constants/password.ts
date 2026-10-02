/**
 * Shared strong-password policy — keep in sync with
 * Application\Api\User\Rules\StrongPassword on the backend.
 */

import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_HELP =
    "رمز عبور باید حداقل ۸ کاراکتر باشد و همه موارد زیر را داشته باشد: حرف کوچک (a-z)، حرف بزرگ (A-Z)، عدد (0-9) و نماد (! @ # $ % …). مثال معتبر: Pass123!";

const SYMBOL_PATTERN = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

export type PasswordRequirementId =
    | "min"
    | "lowercase"
    | "uppercase"
    | "number"
    | "symbol";

export interface PasswordRequirement {
    id: PasswordRequirementId;
    label: string;
    test: (password: string) => boolean;
}

export const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
    {
        id: "min",
        label: `حداقل ${PASSWORD_MIN_LENGTH} کاراکتر`,
        test: (password) => password.length >= PASSWORD_MIN_LENGTH,
    },
    {
        id: "lowercase",
        label: "حداقل یک حرف کوچک انگلیسی (a-z)",
        test: (password) => /[a-z]/.test(password),
    },
    {
        id: "uppercase",
        label: "حداقل یک حرف بزرگ انگلیسی (A-Z)",
        test: (password) => /[A-Z]/.test(password),
    },
    {
        id: "number",
        label: "حداقل یک عدد (0-9)",
        test: (password) => /\d/.test(password),
    },
    {
        id: "symbol",
        label: "حداقل یک نماد (! @ # $ % ^ & * و مشابه)",
        test: (password) => SYMBOL_PATTERN.test(password),
    },
];

export function getMissingPasswordRequirements(password: string): string[] {
    return PASSWORD_REQUIREMENTS
        .filter((requirement) => !requirement.test(password))
        .map((requirement) => requirement.label);
}

export function formatPasswordMissingMessage(password: string): string | null {
    const missing = getMissingPasswordRequirements(password);

    if (missing.length === 0) {
        return null;
    }

    return `رمز عبور کامل نیست. موارد ناقص: ${missing.join("، ")}`;
}

export const strongPasswordField = z
    .string()
    .min(1, { message: "رمز عبور الزامی است" })
    .superRefine((value, ctx) => {
        const message = formatPasswordMissingMessage(value);

        if (message) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message,
            });
        }
    });
