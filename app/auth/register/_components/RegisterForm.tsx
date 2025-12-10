"use client"

import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFPasswordInput } from "@/app/_components/hookForm/RHFPasswordInput";
import { StatusCode } from "@/constants/enums";
import { regex } from "@/constants/regex";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import Link from "next/link";
import { useActionState, useEffect, useTransition } from "react";
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

    const registerSchema = z.object({
        email: z.string()
            .min(1, { message: "ایمیل الزامی است" })
            .email({ message: "فرمت ایمیل نامعتبر است" }),
        password: z.string()
            .min(1, { message: "رمز عبور الزامی است" })
            .regex(regex.password, { message: "رمز عبور باید حداقل ۸ کاراکتر و شامل حروف کوچک، بزرگ و عدد باشد" }),
        password_confirmation: z.string()
            .min(1, { message: "تکرار رمز عبور الزامی است" }),
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
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(!!formState?.errors
                ? "اطلاعات واردشده معتبر نیست! لطفاً دوباره بررسی کنید."
                : "ثبت نام انجام نشد! لطفاً دوباره تلاش کنید.")

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

        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password_confirmation);

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
                />
                <RHFPasswordInput
                    name="password_confirmation"
                    label={"تکرار رمز عبور *"}
                />
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