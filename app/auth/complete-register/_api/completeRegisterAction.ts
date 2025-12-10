"use server"

import { StatusCode } from "@/constants/enums";
import { postFetchAuth } from "@/core/privateService";
import { UserInfo } from "@/types/user.type";
import { cookies } from "next/headers";

export interface CompleteRegisterService {
    profile_photo_path?: string;
    first_name: string;
    last_name: string;
    nickname: string;
    mobile: string;
    privacy_policy: boolean;
}

export interface CompleteRegisterResponse {
    status: StatusCode;
    message?: string;
    errors?: { [key: string]: string[] };
    user?: UserInfo;
    verify_email?: boolean;
    verify_access?: boolean;
    customer_number?: string;
}

export const completeRegisterAction = async (_state: any, formData: FormData): Promise<any> => {
    const profile_photo_path = formData.get("profile_photo_path");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const nickname = formData.get("nickname");
    const mobile = formData.get("mobile");
    const privacy_policy = formData.get("privacy_policy");

    try {
        const res = await postFetchAuth<CompleteRegisterResponse>("/complete-register", {
            profile_photo_path,
            first_name,
            last_name,
            nickname,
            mobile,
            privacy_policy: privacy_policy === "true",
        });
        if (res?.status === StatusCode.Success) {
            const cookieStore = await cookies();
            cookieStore.set({
                name: "userData",
                value: JSON.stringify({
                    verify_email: res?.verify_email,
                    verify_access: res?.verify_access,
                    customer_number: res.customer_number,
                    user: res?.user,
                }),
                httpOnly: false,
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            });
        }
        return res;
    } catch (error) {
        throw new Error("مشکل در دریافت اطلاعات");
    }
};