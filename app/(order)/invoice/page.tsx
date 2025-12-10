import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { OrderNavigation } from "../_components/orderNavigation";
import { OrderHeader } from "../_components/orderHeader";
import { Icon } from "@/ui/icon";
import { Button } from "@/ui/button";

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
                    <OrderHeader step="invoice" />
                </div>}
            <div className="lg:max-w-xs mt-12 mx-auto px-4 lg:px-0">
                <div className="flex items-center justify-center">
                    <Icon
                        icon="solar--check-circle-bold"
                        sizeClass="size-14"
                        className="text-success" />
                </div>
                <p className="text-center text-success font-bold text-2xl mt-5">
                    پرداخت موفق
                </p>
                <div className="mt-8 flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <p className="text-muted">
                            شناسه پرداخت:
                        </p>
                        <p className="text-title">
                            ۱۰۰۰۲۸۸۵۷۸۲۲
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-muted">
                            مبلغ پرداختی:
                        </p>
                        <p className="text-secondary font-bold">
                            ۳،۴۹۵،۰۰۰ تومان
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-muted">
                            کد سفارش:
                        </p>
                        <p className="text-title">
                            ۵۴۰۰۵۵۸
                        </p>
                    </div>
                    <hr className="border-t border-surface" />
                    <div className="flex items-center justify-between">
                        <p className="text-title">
                            کد پیگیری سفارش:
                        </p>
                        <p className="text-secondary font-bold">
                            ۴۶۴۸۵۱۳۱۰۰۴
                        </p>
                    </div>
                </div>
                <Button variant={"outline"} className="mt-10 w-full">
                    بازگشت به پروفایل
                </Button>
            </div>
        </>
    )
}