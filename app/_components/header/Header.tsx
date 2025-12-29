"use client"

import { isEmpty } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import { UserData } from "@/types/user.type";
import { Button } from "@/ui/button"
import { Icon } from "@/ui/icon"
import Link from "next/link"
import { MegaMenu } from "./MegaMenu";
import { HeaderSearch } from "./HeaderSearch";

export interface HeaderProps {
    userData?: UserData | null;
}

const menuData = [
    {
        id: 1,
        title: "صفحه اصلی",
        link: '/'
    },
    {
        id: 2,
        title: "فروشگاه",
        link: '/shop'
    },
    {
        id: 3,
        title: "وبلاگ",
        link: '/blog'
    },
    {
        id: 4,
        title: "تماس با ما",
        link: '/contact'
    },
    {
        id: 5,
        title: "درباره ما",
        link: '/about'
    },
];

export const Header = ({ userData }: HeaderProps) => {
    const cart = useCartStore(state => state.items)

    return (
        <header className="container mx-auto mt-7">
            <div className="flex items-center justify-between">
                <Link href={"/"} className="text-2xl font-extrabold text-title">
                    <img src={"/images/logo.png"} alt="logo" width={156} height={32} />
                </Link>
                <HeaderSearch />
                <div className="flex items-center justify-end gap-4">
                    <Link href={"/profile/favorites"}>
                        <Icon
                            icon="solar--heart-linear"
                            sizeClass="size-6"
                            className="text-primary" />
                    </Link>
                    <Link href={"/cart"} className="relative">
                        <span className="bg-secondary size-4 flex items-center justify-center absolute -top-1.5 -right-1.5 rounded-full z-20 text-xs text-white">
                            {cart.length}
                        </span>
                        <Icon
                            icon="solar--bag-4-outline"
                            sizeClass="size-6"
                            className="text-primary" />
                    </Link>
                    <Link href={!!userData && !isEmpty(userData) ? "/profile" : "/auth/login"}>
                        <Button variant={"secondary"} size={"medium"}>
                            {(!!userData && !isEmpty(userData) ? "حساب کاربری من" : "ورود / ثبت نام")}
                        </Button>
                    </Link>
                </div>
            </div>
            <hr className="border-t border-surface my-4.5" />
            <div className="flex items-center justify-between">
                <MegaMenu />
                <div className="flex items-center justify-center gap-8">
                    {menuData?.map(item => (
                        <Link
                            key={item.id}
                            href={item.link}
                            className="text-sm text-title hover:text-secondary hover:scale-105 transition-all">
                            {item.title}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center justify-end gap-2 w-72">
                    <Icon
                        icon="solar--box-minimalistic-outline"
                        sizeClass="size-6"
                        className="text-primary" />
                    <p className="text-sm text-title">
                        رهگیری مرسوله
                    </p>
                </div>
            </div>
        </header>
    )
}
