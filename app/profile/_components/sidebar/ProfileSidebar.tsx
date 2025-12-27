"use client"

import avatar from "@/assets/images/avatar.svg";
import { cn, createFileUrl } from "@/lib/utils";
import { UserData } from "@/types/user.type";
import { Icon } from "@/ui/icon";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "../logout";

interface ProfileSidebarProps {
    userData?: UserData | null;
}

export const ProfileSidebar = ({ userData }: ProfileSidebarProps) => {
    const pathname = usePathname();

    const menuItems = [
        {
            icon: "solar--widget-outline",
            title: "داشبورد",
            url: "/profile",
        },
        {
            icon: "solar--bag-4-outline",
            title: "سفارشات من",
            url: "/profile/orders",
        },
        {
            icon: "solar--wallet-outline",
            title: "کیف پول",
            url: "/profile/wallet",
        },
        {
            icon: "solar--heart-linear",
            title: "علاقه مندی ها",
            url: "/profile/favorites",
        },
        {
            icon: "solar--chat-dots-outline",
            title: "نظرات من",
            url: "/profile/reviews",
        },
        {
            icon: "solar--lock-password-outline",
            title: "تغییر رمز عبور",
            url: "/profile/change-password",
        },
    ]

    return (
        <div className="lg:w-sm lg:shrink-0 px-4 lg:px-0 mt-4 lg:mt-0">
            <Link
                href={"/profile/account"}
                className="bg-surface p-5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                    <Image
                        src={createFileUrl(userData?.user.profile_photo_path || "") || avatar}
                        alt="avatar"
                        width={64}
                        height={64}
                        className="size-16 rounded-full object-cover" />
                    <div className="flex flex-col gap-1.5">
                        <p className="text-title text-sm font-medium">
                            {userData?.user.nickname}
                        </p>
                        <p className="text-muted text-xs">
                            {userData?.customer_number}
                        </p>
                    </div>
                </div>
                <Icon icon="solar--alt-arrow-left-outline" className="text-disabled" sizeClass="size-6" />
            </Link>
            <div className="mt-3 lg:mt-4 bg-surface p-5 rounded-2xl flex flex-col gap-5 divide-y divide-border">
                {menuItems.map(item => (
                    <Link href={item.url} key={item.url} className="flex items-center justify-between pb-5 relative">
                        <div className="flex items-center gap-2.5">
                            <Icon icon={item.icon} sizeClass="size-6" className="text-secondary" />
                            <p className={cn("text-sm font-medium", pathname === item.url ? "text-secondary" : "text-title")}>
                                {item.title}
                            </p>
                        </div>
                        <Icon icon="solar--alt-arrow-left-outline" className="text-disabled" sizeClass="size-6" />
                        {pathname === item.url && <div className="w-0.5 rounded-full bg-secondary h-5 absolute -right-5"></div>}
                    </Link>
                ))}
                <LogoutButton />
            </div>
        </div>
    )
}