import { Button } from "@/ui/button"
import { Icon } from "@/ui/icon"
import { Input } from "@/ui/input"
import Link from "next/link"

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

export const Header = () => {
    return (
        <header className="container mx-auto mt-7">
            <div className="flex items-center justify-between">
                <Link href={"/"} className="text-2xl font-extrabold text-title">
                    اسپورت ساید
                    <span className="text-secondary mr-1">
                        (لوگو)
                    </span>
                </Link>
                <div className="relative w-md">
                    <Input placeholder="دنبال چه محصولی میگردی؟" className="w-full" />
                    <Icon
                        icon="solar--magnifer-outline"
                        sizeClass="size-6"
                        className="text-disabled absolute left-3 top-3" />
                </div>
                <div className="flex items-center justify-end gap-4">
                    <Icon
                        icon="solar--heart-linear"
                        sizeClass="size-6"
                        className="text-primary" />
                    <Icon
                        icon="solar--bag-4-outline"
                        sizeClass="size-6"
                        className="text-primary" />
                    <Button variant={"secondary"} size={"medium"}>
                        ورود / ثبت نام
                    </Button>
                </div>
            </div>
            <hr className="border-t border-surface my-4.5" />
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <Icon
                        icon="solar--hamburger-menu-outline"
                        sizeClass="size-6"
                        className="text-primary" />
                    <p className="text-title text-sm">
                        دسته بندی محصولات
                    </p>
                    <Icon
                        icon="solar--alt-arrow-down-outline"
                        sizeClass="size-4"
                        className="text-primary" />
                </div>
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
                <div className="flex items-center justify-end gap-2 w-56">
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