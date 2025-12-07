export interface UserInfo {
    id: number;
    nickname: string;
    biography: string | null;
    profile_photo_path: string | null;
    bg_photo_path: string | null;
    rate: number;
    point: number | null;
}