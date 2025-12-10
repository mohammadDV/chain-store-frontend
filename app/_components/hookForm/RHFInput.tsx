'use client'

import { cn, convertPersianToEnglish } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { useFormContext } from "react-hook-form";

interface RHFInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    className?: string;
    trailingLabel?: string;
    convertPersianNumbers?: boolean;
}

export const RHFInput: React.FC<RHFInputProps> = ({
    name,
    label,
    className,
    trailingLabel,
    convertPersianNumbers = false,
    ...props
}) => {
    const { control } = useFormContext();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (...event: any[]) => void
    ) => {
        let inputValue = e.target.value;

        if (convertPersianNumbers) {
            inputValue = convertPersianToEnglish(inputValue);
        }

        onChange(inputValue);
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem className="gap-1.5 w-full">
                    {label && (
                        <FormLabel className={cn("text-title text-xs", props.disabled && "text-disabled")}>
                            {label}
                        </FormLabel>
                    )}
                    <FormControl>
                        <div className="relative">
                            <Input
                                {...field}
                                {...props}
                                value={field.value ?? ''}
                                onChange={convertPersianNumbers ? (e) => handleInputChange(e, field.onChange) : field.onChange}
                                className={className}
                                aria-invalid={!!fieldState.error}
                            />
                            {trailingLabel && (
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted pointer-events-none">
                                    {trailingLabel}
                                </div>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                </FormItem>
            )}
        />
    );
};