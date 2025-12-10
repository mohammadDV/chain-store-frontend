import { Icon } from "@/ui/icon"

export const MobileHeader = () => {
    return (
        <header className="mt-4 mx-4">
            <div className="flex items-center gap-2.5">
                <div className="flex-1 bg-surface flex gap-2 items-center h-10 rounded-md p-2.5">
                    <Icon
                        icon="solar--magnifer-outline"
                        sizeClass="size-5"
                        className="text-disabled" />
                    <p className="text-sm text-muted">
                        جستجو در
                        <span className="text-secondary font-bold mr-1">
                            بوف استور
                        </span>
                    </p>
                </div>
                <div className="size-10 bg-surface rounded-md flex items-center justify-center">
                    <Icon
                        icon="solar--box-minimalistic-outline"
                        sizeClass="size-6"
                        className="text-title" />
                </div>
            </div>
        </header>
    )
}