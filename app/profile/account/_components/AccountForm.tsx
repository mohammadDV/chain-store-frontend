"use client"

import { RHFAvatar } from "@/app/_components/hookForm/RHFAvatar";
import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { StatusCode } from "@/constants/enums";
import { regex } from "@/constants/regex";
import { useZodForm } from "@/hooks/useZodForm";
import { UserAccountResponse } from "@/types/user.type";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { accountAction, AccountService } from "../_api/accountAction";

interface AccountFormProps {
    accountData: UserAccountResponse;
}

export const AccountForm = ({ accountData }: AccountFormProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<AccountService | null, FormData>(
        accountAction,
        null
    );

    const accountSchema = z.object({
        first_name: z.string().min(1, "نام الزامی است"),
        last_name: z.string().min(1, "نام خانوادگی الزامی است"),
        nickname: z.string().min(1, "نام کاربری الزامی است"),
        mobile: z.string().min(1, "شماره تماس الزامی است")
            .regex(regex.phone, "شماره تماس نامعتبر است"),
        profile_photo_path: z.string().optional(),
    });

    type AccountFormData = z.infer<typeof accountSchema>;

    const form = useZodForm(accountSchema, {
        defaultValues: {
            first_name: accountData?.first_name || '',
            last_name: accountData?.last_name || '',
            nickname: accountData?.nickname || '',
            mobile: accountData?.mobile || '',
            profile_photo_path: accountData?.profile_photo_path || '',
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(!!formState?.errors
                ? "اطلاعات واردشده معتبر نیست! لطفاً دوباره بررسی کنید."
                : formState?.message || "مشکل در دریافت اطلاعات");

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof AccountFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(formState?.message || "بروزرسانی با موفقیت انجام شد");
            router.refresh();
        }
    }, [formState, form]);

    const onSubmit = async (data: AccountFormData) => {

        const formData = new FormData();
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("nickname", data.nickname);
        formData.append("mobile", data.mobile);
        formData.append("country_id", "1");
        formData.append("city_id", "1");
        formData.append("profile_photo_path", data.profile_photo_path || "");

        startTransition(async () => {
            await formAction(formData);
        });
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <RHFAvatar
                    name="profile_photo_path"
                    className="mx-auto"
                    defaultValue="/images/default-avatar.png"
                />

                <div className="grid grid-cols-2 gap-4">
                    <RHFInput
                        name="first_name"
                        label={"نام *"}
                        type="text"
                    />
                    <RHFInput
                        name="last_name"
                        label={"نام خانوادگی *"}
                        type="text"
                    />
                </div>

                <RHFInput
                    name="nickname"
                    label={"نام کاربری *"}
                    type="text"
                />

                <RHFInput
                    name="mobile"
                    label={"شماره موبایل *"}
                    type="tel"
                    convertPersianNumbers
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
    )
}