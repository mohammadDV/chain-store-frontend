"use client"

import { RHFPasswordInput } from "@/app/_components/hookForm/RHFPasswordInput";
import { StatusCode } from "@/constants/enums";
import { regex } from "@/constants/regex";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import { useActionState, useEffect, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { resetPasswordAction, ResetPasswordService } from "../_api/resetPasswordAction";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/ui/icon";

interface ResetPasswordFormProps {
    email: string;
    token: string;
}

export const ResetPasswordForm = ({ email, token }: ResetPasswordFormProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<ResetPasswordService | null, FormData>(
        resetPasswordAction,
        null
    );

    const resetPasswordSchema = z.object({
        password: z.string()
            .min(1, { message: "رمز عبور الزامی است" })
            .regex(regex.password, { message: "رمز عبور باید حداقل ۸ کاراکتر و شامل حروف کوچک، بزرگ و عدد باشد" }),
        password_confirmation: z.string()
            .min(1, { message: "تکرار رمز عبور الزامی است" }),
    }).refine((data) => data.password === data.password_confirmation, {
        message: "رمز عبور و تکرار آن مطابقت ندارند",
        path: ["password_confirmation"],
    });

    type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

    const form = useZodForm(resetPasswordSchema, {
        defaultValues: {
            password: '',
            password_confirmation: '',
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || "خطای ناشناخته رخ داده است");

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof ResetPasswordFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(formState?.message || "عملیات با موفقیت انجام شد");
            router.push("/auth/login")
        }
    }, [formState]);

    const onSubmit = async (data: ResetPasswordFormData) => {
        form.clearErrors();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("token", token);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password_confirmation);

        startTransition(async () => {
            await formAction(formData);
        });
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
                    className="w-full"
                    isLoading={isPending}
                    type="submit">
                    تایید
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
    );
};