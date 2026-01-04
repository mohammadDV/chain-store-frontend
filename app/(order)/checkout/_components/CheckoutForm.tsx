"use client"

import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFTextarea } from "@/app/_components/hookForm/RHFTextarea";
import { useZodForm } from "@/hooks/useZodForm";
import { useEffect, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import z from "zod";

type Props = {
    onValuesChange?: (values: any) => void;
};

export const CheckoutForm = ({ onValuesChange }: Props) => {
    const [isPending, startTransition] = useTransition();

    const checkoutSchema = z.object({
        fullname: z.string()
            .min(1, { message: "وارد کردن نام اجباری است" }),
        postal_code: z.string()
            .min(1, { message: "وارد کردن کد پستی اجباری است" }),
        address: z.string()
            .min(1, { message: "وارد کردن آدرس اجباری است" }),
        description: z.string().optional()
    });

    type CheckoutFormData = z.infer<typeof checkoutSchema>;

    const form = useZodForm(checkoutSchema, {
        defaultValues: {
            fullname: '',
            postal_code: '',
            address: '',
            description: ''
        }
    });

    useEffect(() => {
        const subscription = form.watch((values) => {
            if (onValuesChange) {
                onValuesChange(values as CheckoutFormData);
            }
        });
        return () => subscription.unsubscribe();
    }, [form.watch, onValuesChange]);

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
                            name="fullname"
                            label="نام *"
                            type="text" />
                        <RHFInput
                            name="postal_code"
                            label="کد پستی *"
                            type="text" />
                    </div>
                    <RHFTextarea
                        name="address"
                        label="آدرس *" />
                    <RHFTextarea
                        name="description"
                        label="توضیحات" />
                </form>
            </FormProvider>
        </div>
    )
}
