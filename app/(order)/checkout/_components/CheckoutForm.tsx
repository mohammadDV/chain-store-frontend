"use client"

import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { useZodForm } from "@/hooks/useZodForm";
import { useTransition } from "react";
import { FormProvider } from "react-hook-form";
import z from "zod";

export const CheckoutForm = () => {
    const [isPending, startTransition] = useTransition();

    const checkoutSchema = z.object({
        firstName: z.string()
            .min(1, { message: "وارد کردن نام اجباری است" }),
        lastName: z.string()
            .min(1, { message: "وارد کردن نام خانوادگی اجباری است" }),
        phone: z.string()
            .min(1, { message: "وارد کردن شماره موبایل اجباری است" }),
        postalCode: z.string()
            .min(1, { message: "وارد کردن کد پستی اجباری است" }),
        address: z.string()
            .min(1, { message: "وارد کردن آدرس اجباری است" })
    });

    type CheckoutFormData = z.infer<typeof checkoutSchema>;

    const form = useZodForm(checkoutSchema, {
        defaultValues: {
            firstName: '',
            lastName: '',
            phone: '',
            postalCode: '',
            address: ''
        }
    });

    const onSubmit = async (data: CheckoutFormData) => {
        form.clearErrors();

        startTransition(async () => {
            console.log(data)
        });
    };

    return (
        <div className="border border-border p-3 lg:p-6 rounded-2xl lg:rounded-3xl">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                        <RHFInput
                            name="firstName"
                            label="نام"
                            type="text" />
                        <RHFInput
                            name="lastName"
                            label="نام خانوادگی"
                            type="text" />
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                        <RHFInput
                            name="phone"
                            label="نام"
                            type="text" />
                        <RHFInput
                            name="postalCode"
                            label="کد پستی"
                            type="text" />
                    </div>
                    <RHFInput
                        name="address"
                        label="آدرس"
                        type="text" />
                </form>
            </FormProvider>
        </div>
    )
}