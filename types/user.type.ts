export interface UserInfo {
    id: number;
    nickname: string;
    biography: string | null;
    profile_photo_path: string | null;
    bg_photo_path: string | null;
    rate: number;
    point: number | null;
}

export interface UserData {
    is_admin?: boolean;
    verify_email: boolean;
    verify_access: boolean;
    customer_number: string;
    user: UserInfo;
}

export interface UserAccountResponse {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    nickname: string;
    address: string | null;
    country_id: number | null;
    city_id: number | null;
    area_id: number | null;
    mobile: string;
    biography: string | null;
    profile_photo_path: string | null;
    bg_photo_path: string | null;
    rate: number;
    point: number;
}