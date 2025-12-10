import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Button } from "@/ui/button";
import { OrderHeader } from "../_components/orderHeader";
import { OrderNavigation } from "../_components/orderNavigation";
import { CheckoutForm } from "./_components/CheckoutForm";

export default async function Cart() {
    const isMobile = await isMobileDevice();

    return (
        <>
            {isMobile
                ? <OrderNavigation title="صورتحساب" />
                : <div className="mt-12 max-w-3xl mx-auto">
                    <h1 className="text-title text-3xl font-bold text-center mb-6">
                        صورتحساب
                    </h1>
                    <OrderHeader step="checkout" />
                </div>}
            <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-10 mt-4 lg:mt-12 container mx-auto px-4 lg:px-0">
                <div className="lg:w-2/3">
                    <CheckoutForm />
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