"use server"

import { patchFetchAuth } from "@/core/privateService";

export interface ChangePasswordService {
    status: number;
    message?: string;
    errors?: { [key: string]: string[] };
}

export const changePasswordAction = async (_state: any, formData: FormData): Promise<ChangePasswordService> => {

    const current_password = formData.get("current_password");
    const password = formData.get("password");
    const password_confirmation = formData.get("password_confirmation");

    try {
        const res = await patchFetchAuth<ChangePasswordService>("/profile/users/change-password", {
            current_password,
            password,
            password_confirmation,
        });

        return res;
    } catch (error) {
        throw new Error(`مشکل در دریافت اطلاعات`);
    }
};