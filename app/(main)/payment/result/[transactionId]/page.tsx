import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import Link from "next/link";
import { getPaymentResult } from "../_api/getPaymentResult";
import { cn, putCommas } from "@/lib/utils";
import { formatToShamsiWithYear } from "@/lib/dateUtils";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { OrderHeader } from "@/app/(order)/_components/orderHeader";

export interface PaymentResultResponse {
    bank_transaction_id: string;
    reference: number | null;
    status: "completed" | "failed";
    amount: number;
    message: string;
    date: string
}

interface PaymentResultPageProps {
    params: Promise<{
        transactionId: string;
    }>;
}

export default async function PaymentResultPage({ params }: PaymentResultPageProps) {
    const isMobile = await isMobileDevice();
    const resolvedParams = await params;

    const paymentResultData: PaymentResultResponse = await getPaymentResult({ id: resolvedParams.transactionId })

    const paymentDate = new Date(paymentResultData?.date?.replace(' ', 'T'));
    const formattedDate = formatToShamsiWithYear(paymentDate);
    const formattedTime = paymentDate.toLocaleTimeString('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return (
        <div className="mt-5 lg:mt-16">
            {!isMobile && <div className="max-w-3xl mx-auto">
                <h1 className="text-title text-3xl font-bold text-center mb-6">
                    صورتحساب
                </h1>
                <OrderHeader step="invoice" />
            </div>}
            <div className="md:max-w-md px-4 mx-auto">
                <div className="bg-white py-8 px-6 rounded-xl relative">
                    <div className={cn("flex items-center w-fit mx-auto justify-center p-3 rounded-full",
                        paymentResultData?.status === "completed"
                            ? "bg-success/15"
                            : "bg-destructive/15"
                    )}>
                        <Icon
                            icon={paymentResultData?.status === "completed"
                                ? "solar--check-circle-bold"
                                : "solar--close-circle-bold"}
                            sizeClass="size-8"
                            className={paymentResultData?.status === "completed"
                                ? "text-success"
                                : "text-destructive"
                            } />
                    </div>
                    <h2 className={cn("text-2xl text-center font-semibold mt-4",
                        paymentResultData?.status === "completed"
                            ? "text-success"
                            : "text-destructive"
                    )}>
                        {paymentResultData?.status === "completed" ? "پرداخت موفق" : "پرداخت ناموفق"}
                    </h2>
                    <p className="text-description text-center mt-2">
                        {paymentResultData.message}
                    </p>
                    <hr className="border-t border-dashed border-border my-8" />
                    <div className="flex flex-col gap-3.5">
                        <div className="flex items-center justify-between flex-wrap">
                            <p className="text-muted text-sm font-medium">
                                کد پیگیری
                            </p>
                            <p className="text-text text-sm font-medium">
                                {paymentResultData?.bank_transaction_id}
                            </p>
                        </div>
                        {paymentResultData?.reference && <div className="flex items-center justify-between">
                            <p className="text-muted text-sm font-medium">
                                کد مرجع
                            </p>
                            <p className="text-text text-sm font-medium">
                                {paymentResultData.reference}
                            </p>
                        </div>}
                        <div className="flex items-center justify-between">
                            <p className="text-muted text-sm font-medium">
                                تاریخ پرداخت
                            </p>
                            <p className="text-text text-sm font-medium">
                                {formattedDate}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-muted text-sm font-medium">
                                زمان
                            </p>
                            <p className="text-text text-sm font-medium">
                                {formattedTime}
                            </p>
                        </div>
                    </div>
                    <hr className="border-t border-dashed border-border my-3.5" />
                    <div className="flex items-center justify-between mb-7">
                        <p className="text-muted text-sm font-medium">
                            مبلغ پرداخت شده
                        </p>
                        <p className="text-title font-medium">
                            {putCommas(parseFloat(paymentResultData?.amount?.toString()))}
                            {" "}
                            تومان
                        </p>
                    </div>
                    <Link href={"/profile"}>
                        <Button variant={"ghost"} className="w-full">
                            بازگشت به پروفایل
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}