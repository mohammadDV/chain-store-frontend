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
import { transferAction } from "../_api/transferAction";

export const TransferModal = () => {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const schema = z.object({
        amount: z.string()
            .min(1, "مبلغ الزامی است")
            .regex(/^\d+$/, "فقط عدد وارد کنید")
            .refine(val => Number(val) >= 1000, "حداقل مبلغ ۱,۰۰۰ تومان است"),
        customer_number: z.string()
            .min(1, "شماره مشتری الزامی است"),
    });

    type FormData = z.infer<typeof schema>;

    const form = useZodForm(schema, {
        defaultValues: {
            amount: "",
            customer_number: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("amount", data.amount);
        formData.append("customer_number", data.customer_number);

        try {
            const res = await transferAction(null, formData);

            if (res.status === 1) {
                toast.success(res.message || "انتقال با موفقیت انجام شد");
                setOpen(false);
                form.reset();
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
                variant="white" 
                className="flex-1 md:flex-none text-secondary"
                onClick={() => setOpen(true)}
            >
                <Icon icon="solar--share-circle-outline" sizeClass="size-5" />
                انتقال
            </Button>

            <Modal
                open={open}
                onOpenChange={(nextOpen) => {
                    if (!nextOpen) form.reset();
                    setOpen(nextOpen);
                }}
                title="انتقال اعتبار"
                confirmText="انتقال"
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
                        <RHFInput 
                            name="customer_number" 
                            label="شماره مشتری مقصد" 
                            convertPersianNumbers 
                            placeholder="کد مشتری..."
                        />
                    </form>
                </FormProvider>
            </Modal>
        </>
    );
};
