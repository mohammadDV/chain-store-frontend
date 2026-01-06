"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { toast } from "sonner";

interface ShareButtonProps {
    title: string;
    text?: string;
    url?: string;
    className?: string;
    children: ReactNode;
}

export const ShareButton = ({ title, text, url, className, children }: ShareButtonProps) => {
    const handleShare = async () => {
        const shareUrl = url || window.location.href;
        const shareData = {
            title,
            text,
            url: shareUrl,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log("Share cancelled or failed", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareUrl);
                toast.success("لینک محصول کپی شد");
            } catch (err) {
                toast.error("کپی لینک با خطا مواجه شد");
                console.error("Copy failed", err);
            }
        }
    };

    return (
        <button onClick={handleShare} className={cn(className, "cursor-pointer")} type="button">
            {children}
        </button>
    );
};
