"use client"

import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { StatusCode } from "@/constants/enums";
import { regex } from "@/constants/regex";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { checkVerificationAction } from "../../check-verification/_api/verificationAction";
import { completeRegisterAction, CompleteRegisterResponse } from "../_api/completeRegisterAction";
import { Loading } from "@/ui/loading";
import { RHFAvatar } from "@/app/_components/hookForm/RHFAvatar";
import { RHFCheckbox } from "@/app/_components/hookForm/RHFCheckbox";

export const CompleteRegister = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<CompleteRegisterResponse | null, FormData>(
        completeRegisterAction,
        null
    );

    const completeRegisterSchema = z.object({
        profile_photo_path: z.string().optional(),
        first_name: z.string()
            .min(1, "نام الزامی است"),
        last_name: z.string()
            .min(1, "نام خانوادگی الزامی است"),
        nickname: z.string()
            .min(1, "نام کاربری الزامی است")
            .min(3, "نام کاربری باید حداقل 3 کاراکتر باشد"),
        mobile: z.string()
            .min(1, "شماره تماس الزامی است")
            .regex(regex.phone, "شماره تماس نامعتبر است"),
        privacy_policy: z.boolean()
            .refine(val => val === true, "موافقت با قوانین و مقررات الزامی است"),
    });

    type CompleteRegisterFormData = z.infer<typeof completeRegisterSchema>;

    const form = useZodForm(completeRegisterSchema,
        {
            defaultValues: {
                profile_photo_path: "",
                first_name: "",
                last_name: "",
                nickname: "",
                mobile: "",
                privacy_policy: false,
            },
        }
    );

    useEffect(() => {
        const checkAccessVerification = async () => {
            setIsLoading(true);
            try {
                const res = await checkVerificationAction();
                if (!res?.verify_email) {
                    router.replace("/auth/check-verification")
                } else if (res?.verify_access) {
                    router.replace("/")
                } else setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        checkAccessVerification();
    }, [router]);

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(!!formState?.errors
                ? "اطلاعات واردشده معتبر نیست! لطفاً دوباره بررسی کنید."
                : "مشکل در دریافت اطلاعات");

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof CompleteRegisterFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            window.location.href = "/";
        }
    }, [formState, form]);

    const onSubmit = async (data: CompleteRegisterFormData) => {
        form.clearErrors();

        const formData = new FormData();
        formData.append("profile_photo_path", data.profile_photo_path || "");
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("nickname", data.nickname);
        formData.append("mobile", data.mobile);
        formData.append("privacy_policy", data.privacy_policy.toString());

        startTransition(async () => {
            await formAction(formData);
        });
    };

    if (isLoading) return (
        <div className="p-6 md:p-12 2xl:p-36 text-text flex items-center justify-center">
            <div className="mt-10 md:mt-0 text-center">
                <Loading type="spinner" size={"large"} variant="secondary" />
                <h3 className="mt-7 text-title text-xl font-medium text-center mb-3">
                    در حال بارگذاری...
                </h3>
            </div>
        </div>
    )

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

                <RHFCheckbox
                    name="privacy_policy"
                    label={"موافقت با قوانین و مقررات"}
                />

                <Button
                    size={"medium"}
                    variant={"primary"}
                    className="w-full"
                    isLoading={isPending}
                    type="submit"
                >
                    {"تکمیل پروفایل"}
                </Button>
            </form>
        </FormProvider>
    );
};