"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Loading } from "./loading";

const buttonVariants = cva(
  "inline-flex items-center border justify-center gap-1.5 whitespace-nowrap rounded-full cursor-pointer text-base transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-primary aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-primary border-primary text-white hover:bg-primary/90",
        secondary:
          "bg-secondary border-secondary text-white hover:bg-secondary/90",
        outline: "border border-secondary bg-transparent text-secondary",
        ghost: "bg-surface border border-surface text-secondary",
        link: "text-secondary border-none",
        white:
          "bg-white border-white text-title hover:bg-white/90",
        error: "bg-error border-error text-on-error hover:bg-error/90",
        success:
          "bg-success border-success text-on-success hover:bg-success/90",
        warning:
          "bg-warning border-warning text-on-warning hover:bg-warning/90",
        info:
          "bg-information border-info text-on-info hover:bg-info/90",
      },
      size: {
        medium: "px-5 py-[11px] has-[>svg]:px-4",
        small:
          "text-xs py-[11px] gap-1.5 px-4 has-[>svg]:px-3",
        large: "text-lg py-[13px] px-6 has-[>svg]:px-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

function Button({
  className,
  variant,
  size,
  isLoading,
  disabled,
  children,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading || disabled}
      {...props}
    >
      {children}
      {isLoading && <Loading type="spinner" size={size} />}
    </Comp>
  );
}

export { Button, buttonVariants };