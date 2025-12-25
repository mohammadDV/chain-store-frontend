"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { Modal } from "@/app/_components/modal/Modal";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { topUpAction } from "../_api/topUpAction";

export const TopUpModal = () => {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const schema = z.object({
        amount: z.string()
            .min(1, "مبلغ الزامی است")
            .regex(/^\d+$/, "فقط عدد وارد کنید")
            .refine(val => Number(val) >= 10000, "حداقل مبلغ ۱۰,۰۰۰ تومان است"),
    });

    type FormData = z.infer<typeof schema>;

    const form = useZodForm(schema, {
        defaultValues: {
            amount: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("amount", data.amount);

        try {
            const res = await topUpAction(null, formData);

            if (res.status === 1 && res.url) {
                toast.success("در حال انتقال به درگاه پرداخت...");
                window.location.href = res.url;
                return;
            }

            toast.error(res.message || "خطایی رخ داد");
            if (res.errors) {
                Object.entries(res.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof FormData, {
                            type: "server",
                            message: fieldErrors[0],
                        });
                    }
                });
            }
        } catch {
            toast.error("خطایی رخ داد");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Button 
                variant="primary" 
                className="flex-1 md:flex-none"
                onClick={() => setOpen(true)}
            >
                <Icon icon="solar--alt-arrow-down-outline" sizeClass="size-5" />
                افزایش موجودی
            </Button>

            <Modal
                open={open}
                onOpenChange={(nextOpen) => {
                    if (!nextOpen) form.reset();
                    setOpen(nextOpen);
                }}
                title="افزایش موجودی"
                confirmText="پرداخت"
                cancelText="انصراف"
                loading={isSubmitting}
                disabled={isSubmitting}
                onConfirm={() => form.handleSubmit(onSubmit)()}
                onCancel={() => setOpen(false)}
            >
                <FormProvider {...form}>
                    <form className="flex flex-col gap-5">
                        <RHFInput 
                            name="amount" 
                            label="مبلغ (تومان)" 
                            convertPersianNumbers 
                            placeholder="مثال: ۱۰۰,۰۰۰"
                            trailingLabel="تومان"
                        />
                    </form>
                </FormProvider>
            </Modal>
        </>
    );
};
