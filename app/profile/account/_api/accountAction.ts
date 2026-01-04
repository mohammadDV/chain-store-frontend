"use server"

import { patchFetchAuth } from "@/core/privateService";
import { UserInfo } from "@/types/user.type";
import { cookies } from "next/headers";

export interface AccountService {
    status: number;
    message?: string;
    errors?: { [key: string]: string[] };
    user?: UserInfo;
}

export const accountAction = async (_state: any, formData: FormData): Promise<AccountService> => {
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const nickname = formData.get("nickname");
    const mobile = formData.get("mobile");
    const country_id = formData.get("country_id");
    const city_id = formData.get("city_id");
    const profile_photo_path = formData.get("profile_photo_path");

    try {
        const res = await patchFetchAuth<AccountService>("/profile/users", {
            first_name,
            last_name,
            nickname,
            mobile,
            country_id,
            city_id,
            profile_photo_path,
            status: 1
        });

        if (res.user) {
            const cookieStore = await cookies();

            cookieStore.set({
                name: "userData",
                value: JSON.stringify({ ...JSON.parse(cookieStore.get("userData")?.value || "{}"), user: res.user }),
                httpOnly: false,
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            });
        }

        return res;
    } catch (error) {
        throw new Error(`مشکل در دریافت اطلاعات`);
    }
};