"use client";

import { cn } from "@/lib/utils";
import { Size } from "@/types/size.type";
import { Button } from "@/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle
} from "@/ui/drawer";
import * as React from "react";
import { useEffect, useState } from "react";

interface ModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    children?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    showConfirm?: boolean;
    showCancel?: boolean;
    confirmVariant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "success" | "error" | "warning" | "info";
    cancelVariant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "success" | "error" | "warning" | "info";
    size?: Size;
    className?: string;
    headerClassName?: string;
    footerClassName?: string;
    loading?: boolean;
    disabled?: boolean;
}

const Modal = ({
    open,
    onOpenChange,
    title,
    description,
    children,
    confirmText = "تأیید",
    cancelText = "لغو",
    onConfirm,
    onCancel,
    showConfirm = true,
    showCancel = true,
    confirmVariant = "primary",
    cancelVariant = "outline",
    size = "medium",
    className,
    headerClassName,
    footerClassName,
    loading = false,
    disabled = false,
}: ModalProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkDevice();
        window.addEventListener("resize", checkDevice);

        return () => window.removeEventListener("resize", checkDevice);
    }, []);

    const handleConfirm = () => {
        if (onConfirm && !loading && !disabled) {
            onConfirm();
        }
    };

    const handleCancel = () => {
        if (onCancel && !loading) {
            onCancel();
        } else {
            onOpenChange(false);
        }
    };

    const sizeClasses = {
        small: "sm:max-w-sm",
        medium: "sm:max-w-lg",
        large: "sm:max-w-4xl",
    };

    const content = (
        <div className="flex flex-col justify-between gap-4">
            {(title || description) && (
                <div className={cn("space-y-2", headerClassName)}>
                    {title && (
                        <h2 className="text-lg font-semibold text-title">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-description mb-2">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {children && (
                <div className="py-2 max-h-[70vh] overflow-auto">
                    {children}
                </div>
            )}

            {(showConfirm || showCancel) && (
                <div className={cn(
                    "flex gap-3 justify-between sm:flex-row sm:justify-end",
                    footerClassName
                )}>
                    {showCancel && (
                        <Button
                            variant={cancelVariant}
                            onClick={handleCancel}
                            disabled={loading}
                            className="flex-1 sm:flex-initial"
                        >
                            {cancelText}
                        </Button>
                    )}
                    {showConfirm && (
                        <Button
                            variant={confirmVariant}
                            onClick={handleConfirm}
                            disabled={disabled}
                            isLoading={loading}
                            className="flex-1 sm:flex-initial"
                        >
                            {confirmText}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent className={cn("p-5", className)}>
                    <DrawerHeader className="p-0">
                        {title && <DrawerTitle className="sr-only">{title}</DrawerTitle>}
                        {description && <DrawerDescription className="sr-only">{description}</DrawerDescription>}
                    </DrawerHeader>
                    {content}
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={cn(sizeClasses[size || "medium"], className)}>
                <DialogHeader className="sr-only">
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                {content}
                <DialogFooter className="sr-only" />
            </DialogContent>
        </Dialog>
    );
};

export { Modal };
export type { ModalProps };