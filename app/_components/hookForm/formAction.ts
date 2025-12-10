"use server";

import { postFormDataAuth } from "@/core/privateService";

export interface UploadResponse {
    status: number;
    message?: string;
    url?: string;
}

export const uploadImageAction = async (
    formData: FormData
): Promise<UploadResponse> => {
    try {
        const res = await postFormDataAuth<UploadResponse>(
            "/upload-image",
            formData
        );
        return res;
    } catch (error) {
        throw new Error("مشکل در آپلود تصویر");
    }
};

export const uploadVideoAction = async (
    formData: FormData
): Promise<UploadResponse> => {
    try {
        const res = await postFormDataAuth<UploadResponse>(
            "/upload-video",
            formData
        );
        return res;
    } catch (error) {
        throw new Error("مشکل در آپلود ویدیو");
    }
};

export const uploadFileAction = async (
    formData: FormData
): Promise<UploadResponse> => {
    try {
        const res = await postFormDataAuth<UploadResponse>(
            "/upload-file",
            formData
        );
        return res;
    } catch (error) {
        throw new Error("مشکل در آپلود فایل");
    }
};
