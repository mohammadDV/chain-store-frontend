import Image from "next/image";
import { OrderHeader } from "../_components/orderHeader";
import sampleProduct from "@/assets/images/product-sample.png";
import { Icon } from "@/ui/icon";
import { Button } from "@/ui/button";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { OrderNavigation } from "../_components/orderNavigation";

export default async function Cart() {
    const isMobile = await isMobileDevice();

    return (
        <>
            {isMobile
                ? <OrderNavigation title="سبد خرید" />
                : <div className="mt-12 max-w-3xl mx-auto">
                    <h1 className="text-title text-3xl font-bold text-center mb-6">
                        سبد خرید شما
                    </h1>
                    <OrderHeader step="cart" />
                </div>}
            <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-10 mt-4 lg:mt-12 container mx-auto px-4 lg:px-0">
                <div className="lg:w-2/3">
                    <div className="border border-border p-2 lg:p-6 rounded-2xl lg:rounded-3xl flex flex-col gap-3 lg:gap-6 divide-y divide-border">
                        {Array.from({ length: 3 }, (_, i) => (
                            <div key={i} className="flex gap-3 lg:gap-5 pb-4 lg:pb-6">
                                <div className="aspect-square p-4 flex items-center justify-center rounded-xl lg:rounded-2xl bg-surface">
                                    <Image src={sampleProduct} width={112} height={112} alt="product" className="size-20 lg:size-28" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="text-title font-bold text-sm lg:text-lg mb-1.5 lg:mb-2">
                                                کاپشن ورزشی پوما مدل 2340
                                            </h3>
                                            <p className="text-description text-xs lg:text-sm mb-1 lg:mb-1.5">
                                                سایز: XL
                                            </p>
                                            <p className="text-description text-xs lg:text-sm">
                                                رنگبندی: طوسی
                                            </p>
                                        </div>
                                        <div className="size-8 lg:size-9 rounded-full bg-surface flex items-center justify-center">
                                            <Icon icon="solar--trash-bin-trash-bold" sizeClass="size-5 lg:size-6" className="text-secondary" />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-secondary text-sm lg:text-base font-bold">
                                                11,980,000 تومان
                                            </p>
                                        </div>
                                        <div className="bg-surface rounded-full p-1 flex items-center justify-between gap-3 lg:gap-6">
                                            <div className="size-7 lg:size-8 bg-white rounded-full flex items-center justify-center">
                                                <Icon
                                                    icon="lucide--plus"
                                                    sizeClass="size-4"
                                                    className="text-secondary" />
                                            </div>
                                            <p className="text-sm lg:text-lg font-medium text-title">
                                                1
                                            </p>
                                            <div className="size-7 lg:size-8 bg-white rounded-full flex items-center justify-center">
                                                <Icon
                                                    icon="lucide--minus"
                                                    sizeClass="size-4"
                                                    className="text-secondary" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:w-1/3">
                    <div className="bg-surface p-4 lg:p-6 rounded-2xl lg:rounded-3xl sticky top-6">
                        <h4 className="text-lg text-title font-bold mb-4">
                            فاکتور خرید
                        </h4>
                        <div className="flex flex-col gap-3.5">
                            <div className="flex items-center justify-between">
                                <p className="text-muted">
                                    قیمت کالا ها
                                </p>
                                <p className="text-title font-medium">
                                    11,980,000 تومان
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-muted">
                                    کد تخفیف (20%)
                                </p>
                                <p className="text-title font-medium">
                                    250,000 تومان
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-muted">
                                    هزینه ارسال
                                </p>
                                <p className="text-title font-medium">
                                    150,000 تومان
                                </p>
                            </div>
                        </div>
                        <hr className="border-t border-border my-5" />
                        <div className="flex items-center justify-between">
                            <p className="text-title font-medium">
                                مبلغ قابل پرداخت
                            </p>
                            <p className="text-title font-bold">
                                11,980,000 تومان
                            </p>
                        </div>
                        <div className="flex items-center justify-between gap-3 mt-6">
                            <input
                                className="h-12 bg-white rounded-full text-sm placeholder:text-disabled px-4 flex-1"
                                placeholder="کد تخفیف دارید؟" />
                            <Button variant={"outline"}>
                                ثبت کد
                            </Button>
                        </div>
                        <Button variant={"primary"} size={"large"} className="lg:w-full mt-6 fixed bottom-4 lg:static left-4 right-4 z-20">
                            تایید و تکمیل سفارش
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}