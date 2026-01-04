"use server";

import { FavoriteStatus, StatusCode } from "@/constants/enums";
import { postFetchAuth } from "@/core/privateService";

interface AddToFavoriteResponse {
    status: StatusCode;
    message: string;
    favorite: FavoriteStatus;
}

export const addProductToFavoriteAction = async (id: number): Promise<AddToFavoriteResponse> => {
    try {
        return await postFetchAuth<AddToFavoriteResponse>(`/profile/products/${id}/favorite`, {});
    } catch (error) {
        throw new Error("مشکل در دریافت اطلاعات");
    }
};