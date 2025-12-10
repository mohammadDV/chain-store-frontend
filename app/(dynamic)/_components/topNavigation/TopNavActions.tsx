import { Icon } from "@/ui/icon"

export interface TopNavActionsProps {
    title?: string
}

export const TopNavActions = ({ title }: TopNavActionsProps) => {
    return (
        <div className="flex items-center justify-between px-4 mt-4">
            <div className="flex items-center gap-2.5">
                <Icon
                    icon="solar--arrow-right-outline"
                    sizeClass="size-6"
                    className="text-primary" />
                <h1 className="text-title font-medium line-clamp-1">
                    {title}
                </h1>
            </div>
            <div className="flex items-center justify-end gap-3">
                <Icon
                    icon="solar--magnifer-outline"
                    sizeClass="size-6"
                    className="text-primary" />
                <Icon
                    icon="solar--bag-4-outline"
                    sizeClass="size-6"
                    className="text-primary" />
            </div>
        </div>
    )
}