import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { OrderHeader } from "../../_components/orderHeader";
import { OrderNavigation } from "../../_components/orderNavigation";
import { getOrder } from "../_api/getOrder";
import { CheckoutClient } from "../_components/CheckoutClient";

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function Checkout({ params }: ProductPageProps) {
    const isMobile = await isMobileDevice();
    const resolvedParams = await params;
    const order = await getOrder(resolvedParams.id);

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
            <CheckoutClient order={order} />
        </>
    )
}
