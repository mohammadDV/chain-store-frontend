"use client"

import { useActionState, useEffect, useTransition } from "react";
import { loginAction, LoginService } from "../_api/loginAction";
import z from "zod";
import { useZodForm } from "@/hooks/useZodForm";
import { StatusCode } from "@/constants/enums";
import { toast } from "sonner";
import { FormProvider } from "react-hook-form";
import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFPasswordInput } from "@/app/_components/hookForm/RHFPasswordInput";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import Link from "next/link";
import { Label } from "@/ui/label";
import { Icon } from "@/ui/icon";

const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<LoginService | null, FormData>(
        loginAction,
        null
    );

    const loginSchema = z.object({
        email: z.string()
            .min(1, { message: "ایمیل الزامی است" })
            .email({ message: "فرمت ایمیل نامعتبر است" }),
        password: z.string()
            .min(1, { message: "رمز عبور الزامی است" }),
    });

    type LoginFormData = z.infer<typeof loginSchema>;

    const form = useZodForm(loginSchema, {
        defaultValues: {
            email: '',
            password: '',
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || "مشکل در ورود به حساب کاربری");

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof LoginFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            if (!formState?.verify_email) {
                window.location.href = "/auth/check-verification";
            } else if (!formState?.verify_access) {
                window.location.href = "/auth/complete-register";
            } else window.location.href = "/";
        }
    }, [formState, form]);

    const onSubmit = async (data: LoginFormData) => {
        form.clearErrors();

        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

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
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember" className="text-xs text-title">
                            مرا بخاطر بسپار
                        </Label>
                    </div>
                    <Link href={"/auth/forgot-password"} className="text-xs text-secondary">
                        فراموشی رمز عبور
                    </Link>
                </div>
                <Button
                    size={"medium"}
                    variant={"primary"}
                    className="w-full mt-4"
                    isLoading={isPending}
                    type="submit">
                    {"ورود به حساب کاربری"}
                </Button>
                <Link href={"/auth/register"}>
                    <Button
                        size={"medium"}
                        variant={"link"}
                        className="w-full">
                        ساخت حساب کاربری جدید
                        <Icon icon="solar--alt-arrow-left-outline" sizeClass="size-4" />
                    </Button>
                </Link>
            </form>
        </FormProvider>
    )
}

export default LoginForm;