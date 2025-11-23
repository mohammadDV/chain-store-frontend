import { Icon } from "@/ui/icon"

export interface OrderNavigationProps {
    title?: string
}

export const OrderNavigation = ({ title }: OrderNavigationProps) => {
    return (
        <div className="flex items-center justify-between px-4 mt-4">
            <Icon
                icon="solar--arrow-right-outline"
                sizeClass="size-6"
                className="text-primary" />
            <h1 className="text-title font-medium line-clamp-1">
                {title}
            </h1>
            <div className="w-6"></div>
        </div>
    )
}
