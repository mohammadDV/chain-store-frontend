'use client'

import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Textarea } from "@/ui/textarea";
import { useFormContext } from "react-hook-form";

interface RHFTextareaProps extends React.ComponentProps<"textarea"> {
    name: string;
    label?: string;
    className?: string;
    disabled?: boolean;
}

export const RHFTextarea: React.FC<RHFTextareaProps> = ({
    name,
    label,
    className,
    disabled,
    ...props
}) => {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="gap-1.5 w-full">
                    {label && (
                        <FormLabel className={cn("text-title text-xs", disabled && "text-disabled")}>
                            {label}
                        </FormLabel>
                    )}
                    <FormControl>
                        <Textarea
                            {...field}
                            {...props}
                            value={field.value ?? ''}
                            className={className}
                        />
                    </FormControl>
                    <FormMessage className="text-xs" />
                </FormItem>
            )}
        />
    );
};