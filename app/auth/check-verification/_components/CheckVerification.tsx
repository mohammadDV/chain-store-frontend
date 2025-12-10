"use client"

import { StatusCode } from "@/constants/enums";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Loading } from "@/ui/loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { resendVerifyAction, ResendVerifyService } from "../_api/resendVerifyAction";
import { checkVerificationAction } from "../_api/verificationAction";
import { Icon } from "@/ui/icon";

export const CheckVerification = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [seconds, setSeconds] = useState<number>(0);
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<ResendVerifyService | null>(
        resendVerifyAction,
        null
    );

    const backUrl = searchParams.get("backUrl")

    useEffect(() => {
        const checkVerification = async () => {
            setIsLoading(true);
            try {
                const res = await checkVerificationAction();
                if (res?.verify_access) {
                    router.replace("/");
                } else if (res?.verify_email) {
                    router.replace(backUrl || "/auth/complete-register")
                } else setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        checkVerification();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0)
                clearInterval(interval);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || "خطای ناشناخته رخ داده است");
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success("لینک تایید با موفقیت ارسال شد!");
            setSeconds(60);
        }
    }, [formState]);

    const onSubmit = async () => {
        startTransition(async () => {
            await formAction();
        });
    }

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
        <div className="p-6 md:p-12 2xl:p-36">
            <div className="text-center">
                <Icon icon="solar--mailbox-bold-duotone" sizeClass="size-28" className="text-secondary mx-auto" />
                <h3 className="mt-7 text-title text-xl font-bold text-center mb-3">
                    ایمیل خود را چک کنید!
                </h3>
                <p className="text-sm lg:text-base text-muted leading-7 font-normal text-center mb-4">
                    برای تکمیل ثبت‌نام، لطفاً به ایمیل خود بروید و روی لینک تأیید کلیک کنید. اگر ایمیلی دریافت نکرده‌اید، پوشه اسپم خود را بررسی کنید یا برای ارسال مجدد، دکمه زیر را بزنید.
                </p>
                {seconds > 0
                    ? <div className="flex items-center justify-center gap-1">
                        <p className="text-description">ارسال مجدد لینک تایید: </p>
                        <p className="text-secondary" dir="ltr">
                            {`${Math.floor(seconds / 60) > 0
                                ? Math.floor(seconds / 60) : '00'}
                                :${(seconds - (Math.floor(seconds / 60)) * 60) > 0
                                    ? (seconds - (Math.floor(seconds / 60)) * 60)
                                    : '00'}`}
                        </p>
                    </div>
                    : <form action={onSubmit}>
                        <Button
                            type="submit"
                            variant="link"
                            className={cn("mx-auto text-center block font-medium",
                                isPending ? "pointer-events-none opacity-40" : "")}>
                            ارسال مجدد لینک تایید
                        </Button>
                    </form>}
            </div>
        </div>
    );
}