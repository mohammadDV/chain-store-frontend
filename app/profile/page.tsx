import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Icon } from "@/ui/icon";
import Link from "next/link";
import { MobileHeader } from "../_components/header/MobileHeader";
import { ProfileSidebar } from "./_components/sidebar";
import { getUserData } from "@/lib/getUserDataFromHeaders";

export default async function ProfilePage() {
    const isMobile = await isMobileDevice();
    const userData = await getUserData();

    return (
        <>
            {isMobile && (
                <>
                    <MobileHeader />
                    <ProfileSidebar userData={userData} />
                </>
            )}
            <div className="p-2 border border-border rounded-xl mx-4 lg:mx-0 mt-3 lg:mt-0">
                <div className="bg-surface px-3 py-2 rounded-lg flex items-center justify-between">
                    <p className="text-title font-medium">
                        سفارش های من
                    </p>
                    <Link href={"/profile/orders"} className="underline text-sm text-secondary">
                        مشاهده همه
                    </Link>
                </div>
                <div className="py-5 flex items-center justify-around flex-wrap gap-4">
                    <div className="flex items-center gap-3 lg:gap-4">
                        <div className="size-11 lg:size-14 rounded-lg lg:rounded-xl bg-info/20 flex items-center justify-center">
                            <Icon icon="solar--clock-square-bold" sizeClass="size-5 lg:size-8" className="text-info" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <p className="text-title text-sm font-medium">
                                28 سفارش
                            </p>
                            <p className="text-xs text-description">
                                جاری
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 lg:gap-4">
                        <div className="size-11 lg:size-14 rounded-lg lg:rounded-xl bg-success/20 flex items-center justify-center">
                            <Icon icon="solar--delivery-bold" sizeClass="size-5 lg:size-8" className="text-success" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <p className="text-title text-sm font-medium">
                                28 سفارش
                            </p>
                            <p className="text-xs text-description">
                                تحویل شده
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 lg:gap-4">
                        <div className="size-11 lg:size-14 rounded-lg lg:rounded-xl bg-warning/20 flex items-center justify-center">
                            <Icon icon="solar--refresh-circle-bold" sizeClass="size-5 lg:size-8" className="text-warning" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <p className="text-title text-sm font-medium">
                                28 سفارش
                            </p>
                            <p className="text-xs text-description">
                                مرجوع شده
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 lg:gap-4">
                        <div className="size-11 lg:size-14 rounded-lg lg:rounded-xl bg-error/20 flex items-center justify-center">
                            <Icon icon="solar--close-circle-bold" sizeClass="size-5 lg:size-8" className="text-error" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <p className="text-title text-sm font-medium">
                                28 سفارش
                            </p>
                            <p className="text-xs text-description">
                                لغو شده
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-2 border border-border rounded-xl mt-3 lg:mt-5 mx-4 lg:mx-0 mb-5">
                <div className="bg-surface px-3 py-2 rounded-lg flex items-center justify-between">
                    <p className="text-title font-medium">
                        سفارش‌های پرتکرار
                    </p>
                    <Link href={"/profile/orders"} className="underline text-sm text-secondary">
                        مشاهده همه
                    </Link>
                </div>
                <p className="my-5 text-center text-description">
                    موردی جهت نمایش وجود ندارد.
                </p>
            </div>
        </>
    )
}
