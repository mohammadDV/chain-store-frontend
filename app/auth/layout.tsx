import authImg from "@/assets/images/login-register-photo.png";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = await isMobileDevice();

    return (
        <>
            <div className="min-h-svh flex flex-col lg:flex-row lg:justify-between 2xl:gap-20">
                {isMobile && <Link href={"/"} className="m-2">
                    <Button variant={"link"} size={"small"} className="px-2">
                        <Icon icon="solar--alt-arrow-right-outline" sizeClass="size-4" />
                        بازگشت به وبسایت
                    </Button>
                </Link>}
                <div className="lg:w-1/2 p-4 lg:p-16 2xl:p-32">
                    {children}
                </div>
                {!isMobile && <div className="lg:w-1/2 p-5">
                    <div className="w-full h-full relative rounded-4xl overflow-hidden">
                        <Image
                            src={authImg}
                            alt="بوف استور | فروشگاه لباس و لوازم ورزشی"
                            width={1080}
                            height={1080}
                            className="object-cover w-full h-full"
                            priority
                        />
                        <Link href={"/"} className="absolute right-6 top-6">
                            <Button variant={"outline"} size={"small"}>
                                <Icon icon="solar--alt-arrow-right-outline" sizeClass="size-4" />
                                بازگشت به وبسایت
                            </Button>
                        </Link>
                    </div>
                </div>}
            </div>
        </>
    )
}