"use client"

import { useCartStore } from "@/stores/cart"
import { Icon } from "@/ui/icon"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { MobileHeaderSearch } from "@/app/_components/header/MobileHeaderSearch"

export interface TopNavActionsProps {
    title?: string
}

export const TopNavActions = ({ title }: TopNavActionsProps) => {
    const router = useRouter();
    const cart = useCartStore(state => state.items);
    const [openSearch, setOpenSearch] = useState(false);

    return (
        <div className="flex items-center justify-between px-4 mt-4">
            <div className="flex items-center gap-2.5">
                <Icon
                    icon="solar--arrow-right-outline"
                    sizeClass="size-6"
                    className="text-primary"
                    onClick={() => router.back()} />
                <h1 className="text-title font-medium line-clamp-1">
                    {title}
                </h1>
            </div>
            <div className="flex items-center justify-end gap-4">
                <Icon
                    icon="solar--magnifer-outline"
                    sizeClass="size-6"
                    className="text-primary cursor-pointer" 
                    onClick={() => setOpenSearch(true)}
                />
                <Link href={"/cart"} className="relative flex">
                    <span className="bg-secondary size-4 flex items-center justify-center absolute -top-1.5 -right-1.5 rounded-full z-20 text-xs text-white">
                        {cart.length}
                    </span>
                    <Icon
                        icon="solar--bag-4-outline"
                        sizeClass="size-6"
                        className="text-primary" />
                </Link>
            </div>
            {openSearch && <MobileHeaderSearch onClose={() => setOpenSearch(false)} />}
        </div>
    )
}