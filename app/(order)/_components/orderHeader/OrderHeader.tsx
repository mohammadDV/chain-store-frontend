import { cn } from "@/lib/utils"

interface OrderHeaderProps {
    step: "cart" | "checkout" | "invoice"
}

const orderSteps = [
    {
        value: "cart",
        name: "سبد خرید"
    },
    {
        value: "checkout",
        name: "اطلاعات ارسال و پرداخت"
    },
    {
        value: "invoice",
        name: "تکمیل سفارش"
    }
]

export const OrderHeader = ({ step }: OrderHeaderProps) => {
    return (
        <div className="p-3 bg-surface rounded-2xl flex items-center justify-around gap-10">
            {orderSteps?.map((item, index) => (
                <div key={item.value} className="flex items-center gap-3">
                    <div className={cn("size-11 flex items-center justify-center text-white text-lg font-bold rounded-xl",
                        item.value === step ? "bg-secondary" : "bg-disabled")}>
                        {index + 1}
                    </div>
                    <p className={cn("text-lg font-semibold", item.value === step ? "text-secondary" : "text-disabled")}>
                        {item.name}
                    </p>
                </div>
            ))}
        </div>
    )
}