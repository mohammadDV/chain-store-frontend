import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { OrderHeader } from "../_components/orderHeader";
import { OrderNavigation } from "../_components/orderNavigation";
import { CartItemsList } from "./_components/CartItemsList";
import { CartInvoice } from "./_components/CartInvoice";

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
                    <CartItemsList />
                </div>
                <div className="lg:w-1/3">
                    <CartInvoice />
                </div>
            </div>
        </>
    )
}
