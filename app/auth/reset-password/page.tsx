import Link from "next/link";
import { Button } from "@/ui/button";
import { StatusCode } from "@/constants/enums";
import { notFound } from "next/navigation";
import { verifyResetPassword } from "./_api/verifyResetPassword";
import { Icon } from "@/ui/icon";
import { ResetPasswordForm } from "./_components/resetPasswordForm";

interface ResetPasswordPageProps {
    searchParams: Promise<{
        token: string;
        email: string;
    }>
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
    const resolvedSearchParams = await searchParams;

    const verifyData = await verifyResetPassword({
        token: resolvedSearchParams.token,
        email: resolvedSearchParams.email
    })

    if (verifyData.status === StatusCode.Failed) {
        notFound();
    }

    return (
        <>
            <h1 className="text-title text-xl lg:text-3xl font-bold mb-2 lg:mb-4">
                رمز عبور جدید
            </h1>
            <p className="text-sm lg:text-base text-muted mb-6">
                لطفا رمز عبور جدید خود را وارد کنید.
            </p>
            <ResetPasswordForm
                email={resolvedSearchParams.email}
                token={resolvedSearchParams.token}
            />
        </>
    )
}