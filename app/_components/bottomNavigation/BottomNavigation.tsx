"use client"

import { useCartStore } from "@/stores/cart"
import { Icon } from "@/ui/icon"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { CategoryModal } from "./CategoryModal"

export const BottomNavigation = () => {
    const cart = useCartStore(state => state.items)
    const pathname = usePathname()
    const [openCategoryModal, setOpenCategoryModal] = useState(false)

    return (
        <>
            <div className="fixed bottom-2 left-4 right-4 z-50 bg-surface/80 backdrop-blur-md py-2 rounded-full border border-white">
                <div className="flex items-center justify-between px-8">
                    <Link href={"/"} className="flex flex-col items-center gap-1 relative">
                        {pathname === "/" && <hr className="w-5 h-0.5 bg-secondary absolute -top-2.5 rounded-b-md" />}
                        <Icon icon="solar--home-angle-2-linear" sizeClass="size-5" className={cn("text-primary", pathname === "/" && "text-secondary")} />
                        <p className={cn("text-title text-xs", pathname === "/" && "text-secondary")}>
                            خانه
                        </p>
                    </Link>
                    <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setOpenCategoryModal(true)}>
                        <Icon icon="solar--widget-outline" sizeClass="size-5" className="text-primary" />
                        <p className="text-title text-xs">
                            دسته‌بندی‌ها
                        </p>
                    </div>
                    <Link href={"/cart"} className="flex flex-col items-center gap-1 relative">
                        {pathname === "/cart" && <hr className="w-5 h-0.5 bg-secondary absolute -top-2.5 rounded-b-md" />}
                        <div className="relative flex">
                            <span className="bg-secondary size-4 flex items-center justify-center absolute -top-1 -right-1.5 rounded-full z-20 text-xs text-white">
                                {cart.length}
                            </span>
                            <Icon icon="solar--bag-4-outline" sizeClass="size-5" className={cn("text-primary", pathname === "/cart" && "text-secondary")} />
                        </div>
                        <p className={cn("text-title text-xs", pathname === "/cart" && "text-secondary")}>
                            سبد خرید
                        </p>
                    </Link>
                    <Link href={"/profile"} className="flex flex-col items-center gap-1 relative">
                        {pathname.startsWith("/profile") && <hr className="w-5 h-0.5 bg-secondary absolute -top-2.5 rounded-b-md" />}
                        <Icon icon="solar--user-rounded-outline" sizeClass="size-5" className={cn("text-primary", pathname.startsWith("/profile") && "text-secondary")} />
                        <p className={cn("text-title text-xs", pathname.startsWith("/profile") && "text-secondary")}>
                            پروفایل
                        </p>
                    </Link>
                </div>
            </div>
            <CategoryModal open={openCategoryModal} onOpenChange={setOpenCategoryModal} />
        </>
    )
}