"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { RHFRating } from "@/app/_components/hookForm/RHFRating";
import { RHFTextarea } from "@/app/_components/hookForm/RHFTextarea";
import { Modal } from "@/app/_components/modal/Modal";
import { StatusCode } from "@/constants/enums";
import { useZodForm } from "@/hooks/useZodForm";
import { isEmpty } from "@/lib/utils";
import type { UserData } from "@/types/user.type";
import { Button } from "@/ui/button";

import { postProductReviewAction } from "../_api/postReviewAction";

export interface AddReviewModalProps {
  productId: number;
  userData?: UserData | null;
}

export const AddReviewModal = ({ productId, userData }: AddReviewModalProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reviewSchema = z.object({
    rate: z
      .string()
      .refine((value) => {
        const parsed = Number(value);
        return Number.isFinite(parsed) && parsed >= 1 && parsed <= 5;
      }, "امتیاز الزامی است"),
    comment: z.string().min(1, { message: "نظر شما الزامی است" }),
  });

  type ReviewFormData = z.infer<typeof reviewSchema>;

  const form = useZodForm(reviewSchema, {
    defaultValues: {
      rate: "0",
      comment: "",
    },
  });

  const handleOpen = () => {
    if (isEmpty(userData)) {
      router.push("/auth/login");
      return;
    }
    setOpen(true);
  };

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    try {
      const res = await postProductReviewAction(productId, {
        rate: Number(data.rate),
        comment: data.comment,
      });

      if (res.status !== StatusCode.Success) {
        toast.error(res.message || "خطایی رخ داد");
        if (res.errors) {
          Object.entries(res.errors).forEach(([fieldName, fieldErrors]) => {
            if (fieldErrors && fieldErrors.length > 0) {
              form.setError(fieldName as keyof ReviewFormData, {
                type: "server",
                message: fieldErrors[0],
              });
            }
          });
        }
        return;
      }

      toast.success(res.message || "نظر شما ثبت شد");
      form.reset({ rate: "0", comment: "" });
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("خطایی رخ داد");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        variant={"outline"}
        size={"medium"}
        className="w-full mt-6 lg:mt-8"
        onClick={handleOpen}
        type="button"
      >
        نظر خود را بنویسید
      </Button>

      <Modal
        open={open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) form.reset({ rate: "0", comment: "" });
          setOpen(nextOpen);
        }}
        title="ثبت نظر"
        confirmText="ثبت"
        cancelText="انصراف"
        loading={isSubmitting}
        disabled={isSubmitting}
        onConfirm={() => form.handleSubmit(onSubmit)()}
        onCancel={() => setOpen(false)}
      >
        <FormProvider {...form}>
          <form className="flex flex-col gap-5">
            <RHFRating name="rate" label="امتیاز" />
            <RHFTextarea name="comment" label="نظر شما" />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};
