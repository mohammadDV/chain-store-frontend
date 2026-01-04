"use server";

import { StatusCode } from "@/constants/enums";
import { getFetchAuth } from "@/core/privateService";
import { cookies } from "next/headers";

interface logoutResponse {
    status: StatusCode;
    message: string;
}

export const logoutAction = async (): Promise<logoutResponse> => {
    try {
        const res = await getFetchAuth<logoutResponse>("/logout");
        const cookieStore = await cookies();
        cookieStore.set({
            name: 'token',
            value: "",
            httpOnly: true,
            path: '/',
            maxAge: 0,
        });
        cookieStore.set({
            name: "userData",
            value: "",
            httpOnly: false,
            path: "/",
            maxAge: 0,
        });
        return res;
    } catch (error) {
        throw new Error("مشکل در دریافت اطلاعات");
    }
};