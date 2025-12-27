import { getFetchAuth } from "@/core/privateService";
import { UserAccountResponse } from "@/types/user.type";

export async function getUserAccount(): Promise<{ user: UserAccountResponse }> {
    return getFetchAuth<{ user: UserAccountResponse }>('/profile/my-info');
}