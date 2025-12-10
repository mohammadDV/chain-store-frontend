'use client'

import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { StatusCode } from "@/constants/enums";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { cn, createFileUrl } from "@/lib/utils";
import { Loading } from "@/ui/loading";
import { uploadImageAction, UploadResponse } from "./formAction";
import { Icon } from "@/ui/icon";

interface RHFAvatarProps {
    name: string;
    label?: string;
    className?: string;
    defaultValue?: string;
}

export const RHFAvatar: React.FC<RHFAvatarProps> = ({
    name,
    label,
    className,
    defaultValue
}) => {
    const { control } = useFormContext();
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const maxFileSize = 5 * 1024 * 1024;
        if (file.size > maxFileSize) {
            setUploadError("مقدار فایل باید کمتر از 5 مگابایت باشد");
            onChange("");
            if (inputRef.current) {
                inputRef.current.value = "";
            }
            return;
        }

        setIsUploading(true);
        setUploadError("");

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response: UploadResponse = await uploadImageAction(formData);

            if (response.status === StatusCode.Success && response.url) {
                onChange(response.url);
            } else {
                setUploadError(response.message || "مشکل در آپلود فایل");
                onChange("");
            }
        } catch (error) {
            setUploadError("مشکل در آپلود فایل");
            onChange("");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem className="gap-1.5 w-full">
                    {label && <FormLabel className="text-xs text-title">{label}</FormLabel>}
                    <FormControl>
                        <div className={cn("flex items-center gap-5", className)}>
                            <div className="relative">
                                <img
                                    src={(field.value && createFileUrl(field.value)) || defaultValue || null}
                                    width={78}
                                    height={78}
                                    className="size-20 rounded-full object-cover bg-light"
                                />
                                {isUploading ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                                        <Loading variant="primary" type="spinner" size="medium" className="text-white!" />
                                    </div>
                                ) : (
                                    <label
                                        htmlFor={`${name}-input`}
                                        className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 rounded-full">
                                        <Icon icon="solar--pen-outline" sizeClass="size-5 text-white" />
                                    </label>
                                )}
                            </div>
                            {uploadError && (
                                <span className="text-sm text-destructive">{uploadError}</span>
                            )}
                            <input
                                ref={inputRef}
                                id={`${name}-input`}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleChange(e, field.onChange)}
                                disabled={isUploading}
                            />
                        </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                </FormItem>
            )}
        />
    );
};