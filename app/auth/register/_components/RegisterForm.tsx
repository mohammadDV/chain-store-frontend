"use client"

import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFPasswordInput } from "@/app/_components/hookForm/RHFPasswordInput";
import { RHFCheckbox } from "@/app/_components/hookForm/RHFCheckbox";
import { RecaptchaField, type RecaptchaFieldHandle } from "@/app/_components/RecaptchaField";
import { StatusCode } from "@/constants/enums";
import { PASSWORD_HELP, strongPasswordField } from "@/constants/password";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import Link from "next/link";
import { useActionState, useEffect, useRef, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { registerAction, RegisterService } from "../_api/registerAction";

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<RegisterService | null, FormData>(
        registerAction,
        null
    );
    const recaptchaRef = useRef<RecaptchaFieldHandle>(null);

    const registerSchema = z.object({
        email: z.string()
            .min(1, { message: "ایمیل الزامی است" })
            .email({ message: "فرمت ایمیل نامعتبر است" }),
        password: strongPasswordField,
        password_confirmation: z.string()
            .min(1, { message: "تکرار رمز عبور الزامی است" }),
        privacy_policy: z.boolean()
            .refine(val => val === true, "موافقت با قوانین و مقررات الزامی است"),
    }).refine((data) => data.password === data.password_confirmation, {
        message: "رمز عبور و تکرار آن مطابقت ندارند",
        path: ["password_confirmation"],
    });

    type RegisterFormData = z.infer<typeof registerSchema>;

    const form = useZodForm(registerSchema, {
        defaultValues: {
            email: '',
            password: '',
            password_confirmation: '',
            privacy_policy: false,
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(!!formState?.errors
                ? "اطلاعات واردشده معتبر نیست! لطفاً دوباره بررسی کنید."
                : "ثبت نام انجام نشد! لطفاً دوباره تلاش کنید.")
            recaptchaRef.current?.reset();

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof RegisterFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            window.location.href = "/auth/check-verification";
        }
    }, [formState, form]);

    const onSubmit = async (data: RegisterFormData) => {
        form.clearErrors();

        const token = await recaptchaRef.current?.getToken("REGISTER");
        if (!token) {
            toast.error("تأیید امنیتی انجام نشد. لطفاً دوباره تلاش کنید.");
            return;
        }

        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password_confirmation);
        formData.append("privacy_policy", data.privacy_policy.toString());
        formData.append("token", token);

        startTransition(async () => {
            await formAction(formData);
        });
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <RHFInput
                    name="email"
                    label={"ایمیل *"}
                    type="email"
                />
                <RHFPasswordInput
                    name="password"
                    label={"رمز عبور *"}
                    hint={PASSWORD_HELP}
                />
                <RHFPasswordInput
                    name="password_confirmation"
                    label={"تکرار رمز عبور *"}
                />
                <RHFCheckbox
                    name="privacy_policy"
                    label={
                        <span>
                            قوانین سایت را مطالعه کرده‌ام و با{" "}
                            <a
                                href="/pages/rules"
                                className="text-secondary underline"
                                target="_blank"
                                rel="noreferrer"
                                onClick={(event) => event.stopPropagation()}
                            >
                                قوانین و مقررات
                            </a>
                            {" "}موافقت می‌کنم *
                        </span>
                    }
                />
                <RecaptchaField ref={recaptchaRef} action="REGISTER" />
                <Button
                    size={"medium"}
                    variant={"primary"}
                    className="w-full mt-4"
                    isLoading={isPending}
                    type="submit">
                    {"ثبت نام"}
                </Button>
                <Link href={"/auth/login"}>
                    <Button
                        size={"medium"}
                        variant={"link"}
                        className="w-full">
                        حساب کاربری دارم
                        <Icon icon="solar--alt-arrow-left-outline" sizeClass="size-4" />
                    </Button>
                </Link>
            </form>
        </FormProvider>
    )
}
