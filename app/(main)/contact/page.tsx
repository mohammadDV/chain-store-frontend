import instagramBanner from "@/assets/images/instagram-banner.png";
import mobileInstagramBanner from "@/assets/images/mobile-instagram-banner.png";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { JsonLd } from "@/lib/seo/JsonLd";
import { contactPageJsonLd } from "@/lib/seo/schema";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Icon } from "@/ui/icon";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
    title: "تماس با ما",
    description: "راه‌های ارتباطی با پشتیبانی بوف استور",
    path: "/contact",
});

export default async function Contact() {
    const isMobile = await isMobileDevice();

    return (
        <>
            <JsonLd data={contactPageJsonLd()} />
            <div className="max-w-4xl mx-auto mt-8 lg:mt-20">
                <h1 className="text-lg lg:text-3xl font-bold text-title text-center">
                    با ما در  ارتباط باشید
                </h1>
                <p className="mt-2 lg:mt-3 text-sm lg:text-base text-description text-center">
                    ما میتوانیم به شما کمک کنیم!
                </p>
                <div className="grid lg:grid-cols-3 gap-6 mt-6 lg:mt-8 px-8 lg:px-0">
                    <div className="border border-border rounded-2xl p-5">
                        <div className="size-10 flex items-center justify-center bg-surface rounded-lg">
                            <Icon
                                icon="solar--phone-calling-outline"
                                sizeClass="size-6"
                                className="text-secondary" />
                        </div>
                        <div className="mt-12">
                            <h3 className="text-title font-medium">
                                اطلاعات تماس
                            </h3>
                            <p className="text-sm text-muted mt-1.5">
                                شنبه الی چهارشنبه از ساعت 8 الی 20
                            </p>
                            <Link href={"/"} className="text-secondary underline mt-4 text-sm inline-block">
                                021-234-5660
                            </Link>
                        </div>
                    </div>
                    <div className="border border-border rounded-2xl p-5">
                        <div className="size-10 flex items-center justify-center bg-surface rounded-lg">
                            <Icon
                                icon="solar--map-point-wave-outline"
                                sizeClass="size-6"
                                className="text-secondary" />
                        </div>
                        <div className="mt-12">
                            <h3 className="text-title font-medium">
                                دفتر مرکزی
                            </h3>
                            <p className="text-sm text-muted mt-1.5">
                                تهران، میدان ولیعصر، نبش خیابان اول
                            </p>
                            <Link href={"/"} className="text-secondary underline mt-4 text-sm inline-block">
                                مشاهده در نقشه
                            </Link>
                        </div>
                    </div>
                    <div className="border border-border rounded-2xl p-5">
                        <div className="size-10 flex items-center justify-center bg-surface rounded-lg">
                            <Icon
                                icon="solar--mailbox-outline"
                                sizeClass="size-6"
                                className="text-secondary" />
                        </div>
                        <div className="mt-12">
                            <h3 className="text-title font-medium">
                                پست الکترونیکی
                            </h3>
                            <p className="text-sm text-muted mt-1.5">
                                پیغام خود را به ما ارسال کنید
                            </p>
                            <Link href={"/"} className="text-secondary underline mt-4 text-sm inline-block">
                                Info@sportside.com
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container px-4 lg:px-0 mx-auto mt-8 lg:mt-20">
                {isMobile
                    ? <Image src={mobileInstagramBanner} alt="اینستاگرام بوف استور" width={390} height={136} quality={100} sizes="390px" />
                    : <Image src={instagramBanner} alt="اینستاگرام بوف استور" width={1600} height={375} quality={100} sizes="1600px" />}
            </div>
        </>
    )
}