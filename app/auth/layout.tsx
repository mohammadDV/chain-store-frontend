import authImg from "@/assets/images/auth.jpg";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import Image from "next/image";
import Link from "next/link";

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
                            alt={""}
                            width={1080}
                            height={1080}
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute bottom-0 left-0 w-full h-full bg-primary/20"></div>
                        <h2 className="absolute w-full text-center bottom-16 left-1/2 -translate-x-1/2 text-3xl text-white font-bold z-10">
                            احساس قدرت، لمس کیفیت...
                        </h2>
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