export const regex = {
    mobileDevice: /Android|iPhone|iPad|iPod/i,
    phone: /^0\d{10}$/,
    /** @deprecated Use constants/password.ts — kept for backward compatibility. */
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
    website: /^https?:\/\//i
};
