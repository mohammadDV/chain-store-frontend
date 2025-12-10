"use server"

import { StatusCode } from "@/constants/enums";
import { postFetchAuth } from "@/core/privateService";

export interface ResendVerifyService {
    status: StatusCode;
    message?: string;
}

export const resendVerifyAction = async (): Promise<ResendVerifyService> => {
    try {
        return await postFetchAuth<ResendVerifyService>("/email/verification-notification", {});
    } catch (error) {
        throw new Error("مشکل در دریافت اطلاعات");
    }
};
