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
import { withdrawAction } from "../_api/withdrawAction";

export const WithdrawModal = () => {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const schema = z.object({
        amount: z.string()
            .min(1, "مبلغ الزامی است")
            .regex(/^\d+$/, "فقط عدد وارد کنید")
            .refine(val => Number(val) >= 10000, "حداقل مبلغ ۱۰,۰۰۰ تومان است"),
        card: z.string()
            .min(16, "شماره کارت باید ۱۶ رقم باشد")
            .max(16, "شماره کارت باید ۱۶ رقم باشد")
            .regex(/^\d+$/, "فقط عدد وارد کنید"),
        sheba: z.string()
            .min(1, "شماره شبا الزامی است")
            .regex(/^(IR)?\d{24}$/i, "شماره شبا نامعتبر است (مثال: IR1234...)"),
        description: z.string().optional(),
    });

    type FormData = z.infer<typeof schema>;

    const form = useZodForm(schema, {
        defaultValues: {
            amount: "",
            card: "",
            sheba: "",
            description: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("amount", data.amount);
        formData.append("card", data.card);
        formData.append("sheba", data.sheba);
        if (data.description) {
            formData.append("description", data.description);
        }

        try {
            const res = await withdrawAction(null, formData);

            if (res.status === 1) {
                toast.success(res.message || "درخواست برداشت با موفقیت ثبت شد");
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
                variant="outline" 
                className="flex-1 md:flex-none"
                onClick={() => setOpen(true)}
            >
                <Icon icon="solar--alt-arrow-up-outline" sizeClass="size-5" />
                برداشت
            </Button>

            <Modal
                open={open}
                onOpenChange={(nextOpen) => {
                    if (!nextOpen) form.reset();
                    setOpen(nextOpen);
                }}
                title="درخواست برداشت"
                confirmText="ثبت درخواست"
                cancelText="انصراف"
                loading={isSubmitting}
                disabled={isSubmitting}
                onConfirm={() => form.handleSubmit(onSubmit)()}
                onCancel={() => setOpen(false)}
            >
                <FormProvider {...form}>
                    <form className="flex flex-col gap-4">
                        <RHFInput 
                            name="amount" 
                            label="مبلغ (تومان)" 
                            convertPersianNumbers 
                            placeholder="مثال: ۱۰۰,۰۰۰"
                            trailingLabel="تومان"
                        />
                        <RHFInput 
                            name="card" 
                            label="شماره کارت" 
                            convertPersianNumbers 
                            placeholder="۱۶ رقم شماره کارت"
                            dir="ltr"
                        />
                        <RHFInput 
                            name="sheba" 
                            label="شماره شبا" 
                            convertPersianNumbers 
                            placeholder="IR..."
                            dir="ltr"
                        />
                        <RHFInput 
                            name="description" 
                            label="توضیحات" 
                            placeholder="توضیحات مربوط به برداشت..."
                        />
                    </form>
                </FormProvider>
            </Modal>
        </>
    );
};
