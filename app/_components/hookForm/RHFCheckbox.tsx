'use client'

import { Checkbox } from "@/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import * as React from "react";
import { useFormContext } from "react-hook-form";

interface RHFCheckboxProps {
    id?: string;
    name: string;
    label?: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export const RHFCheckbox: React.FC<RHFCheckboxProps> = ({
    id,
    name,
    label,
    className,
    disabled,
}) => {
    const { control } = useFormContext();
    const inputId = id ?? name;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <div className="flex items-start gap-2">
                        <FormControl>
                            <Checkbox
                                id={inputId}
                                checked={field.value === true}
                                onCheckedChange={(checked) => {
                                    field.onChange(checked === true);
                                }}
                                disabled={disabled}
                                className="mt-0.5"
                            />
                        </FormControl>
                        {label ? (
                            <FormLabel htmlFor={inputId} className="text-xs text-description cursor-pointer leading-5">
                                {label}
                            </FormLabel>
                        ) : null}
                    </div>
                    <FormMessage className="text-xs" />
                </FormItem>
            )}
        />
    );
};
