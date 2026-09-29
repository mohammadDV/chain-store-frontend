import { putCommas } from "@/lib/utils";
import { Icon } from "@/ui/icon";
import { TopUpModal } from "./TopUpModal";
import { WithdrawModal } from "./WithdrawModal";
import { TransferModal } from "./TransferModal";

interface WalletHeaderProps {
    balance: number;
    paymentGatewayEnabled?: boolean;
    paymentGatewayDisabledMessage?: string | null;
}

export function WalletHeader({
    balance,
    paymentGatewayEnabled = true,
    paymentGatewayDisabledMessage = null,
}: WalletHeaderProps) {
    return (
        <div className="bg-surface rounded-2xl p-6 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm text-secondary">
                        <Icon icon="solar--bag-4-outline" sizeClass="size-8" />
                    </div>
                    <div>
                        <div className="text-sm text-description mb-1">موجودی کیف پول</div>
                        <div className="text-3xl font-bold text-title">
                            {putCommas(balance)} <span className="text-sm font-normal text-title">تومان</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                    <TopUpModal
                        paymentGatewayEnabled={paymentGatewayEnabled}
                        paymentGatewayDisabledMessage={paymentGatewayDisabledMessage}
                    />
                    <WithdrawModal />
                    <TransferModal />
                </div>
            </div>

            {!paymentGatewayEnabled && paymentGatewayDisabledMessage ? (
                <p className="text-sm text-secondary leading-6">
                    {paymentGatewayDisabledMessage}
                </p>
            ) : null}
        </div>
    );
}
