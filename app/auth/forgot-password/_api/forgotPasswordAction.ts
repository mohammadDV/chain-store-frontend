"use server"

import { postFetch } from "@/core/publicService";

export interface ForgotPasswordService {
    status: number;
    message?: string;
    errors?: { [key: string]: string[] };
}

export const forgotPasswordAction = async (_state: any, formData: FormData): Promise<ForgotPasswordService> => {
    const email = formData.get("email");

    try {
        return await postFetch<ForgotPasswordService>("/forgot-password", { email });
    } catch (error) {
        throw new Error("مشکل در دریافت اطلاعات");
    }
}