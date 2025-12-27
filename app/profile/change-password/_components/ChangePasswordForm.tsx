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
import { changePasswordAction, ChangePasswordService } from "../_api/changePasswordAction";

export const ChangePasswordForm = () => {
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<ChangePasswordService | null, FormData>(
        changePasswordAction,
        null
    );

    const changePasswordSchema = z.object({
        current_password: z.string().min(1, { message: "وارد کردن این فیلد الزامی هست" }),
        password: z.string()
            .min(1, { message: "رمز عبور الزامی است" })
            .regex(regex.password, { message: "رمز عبور باید حداقل ۸ کاراکتر و شامل حروف کوچک، بزرگ و عدد باشد" }),
        password_confirmation: z.string()
            .min(1, { message: "تکرار رمز عبور الزامی است" }),
    }).refine((data) => data.password === data.password_confirmation, {
        message: "رمز عبور و تکرار آن مطابقت ندارند",
        path: ["password_confirmation"],
    });

    type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

    const form = useZodForm(changePasswordSchema, {
        defaultValues: {
            current_password: "",
            password: "",
            password_confirmation: "",
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || "خطای ناشناخته رخ داده است");

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof ChangePasswordFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success("عملیات با موفقیت انجام شد");
            form.reset();
        }
    }, [formState, form]);

    const onSubmit = async (data: ChangePasswordFormData) => {
        form.clearErrors();

        const formData = new FormData();
        formData.append("current_password", data.current_password);
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
                    name="current_password"
                    label={"رمز عبور فعلی *"}
                />
                <RHFPasswordInput
                    name="password"
                    label={"رمز عبور جدید *"}
                />
                <RHFPasswordInput
                    name="password_confirmation"
                    label={"تکرار رمز عبور جدید *"}
                />
                <Button
                    size={"medium"}
                    variant={"secondary"}
                    className="w-full"
                    isLoading={isPending}
                    type="submit"
                >
                    ذخیره تغییرات
                </Button>
            </form>
        </FormProvider>
    );
}