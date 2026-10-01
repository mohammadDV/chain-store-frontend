import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getPublicFeatures } from "@/lib/settings/getPublicFeatures";
import { OrderHeader } from "../../_components/orderHeader";
import { OrderNavigation } from "../../_components/orderNavigation";
import { getCheckoutWalletBalance } from "../_api/getCheckoutWalletBalance";
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
    const [order, features, walletBalance] = await Promise.all([
        getOrder(resolvedParams.id),
        getPublicFeatures(),
        getCheckoutWalletBalance(),
    ]);

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
            <CheckoutClient
                order={order}
                paymentGatewayEnabled={features.payment_gateway_enabled}
                paymentGatewayDisabledMessage={features.payment_gateway_disabled_message}
                deliveryFee={features.delivery_amount}
                freeShippingThreshold={features.limit_delivery_amount}
                walletBalance={walletBalance}
            />
        </>
    )
}
