"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "./logoutAction";
import { StatusCode } from "@/constants/enums";
import { toast } from "sonner";
import { Modal } from "@/app/_components/modal";
import { Icon } from "@/ui/icon";

export const LogoutButton = () => {
    const router = useRouter();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const logoutHandler = async () => {
        setIsLoading(true);
        try {
            const res = await logoutAction();
            if (res?.status === StatusCode.Success) {
                router.replace("/");
            } else {
                toast.error(res?.message || "مشکل در دریافت اطلاعات");
            }
        } catch (error) {
            toast.error("مشکل در دریافت اطلاعات");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div onClick={() => setIsOpenModal(true)} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2.5">
                    <Icon icon="solar--logout-outline" sizeClass="size-6" className="text-secondary" />
                    <p className="text-sm text-title font-medium">
                        خروج از حساب کاربری
                    </p>
                </div>
                <Icon icon="solar--alt-arrow-left-outline" className="text-disabled" sizeClass="size-6" />
            </div>
            <Modal
                open={isOpenModal}
                size="small"
                onOpenChange={setIsOpenModal}
                title={"خروج از حساب کاربری"}
                description={"آیا از خروج خود مطمئن هستید؟"}
                confirmText={"بله"}
                cancelText={"انصراف"}
                confirmVariant="secondary"
                cancelVariant="outline"
                onCancel={() => setIsOpenModal(false)}
                loading={isLoading}
                onConfirm={logoutHandler}
            />
        </>
    )
}