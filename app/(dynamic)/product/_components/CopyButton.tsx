"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { toast } from "sonner";

interface CopyButtonProps {
  textToCopy?: string;
  className?: string;
  children: ReactNode;
}

export const CopyButton = ({ textToCopy, className, children }: CopyButtonProps) => {
  const handleCopy = async () => {
    const text = textToCopy || window.location.href;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("لینک محصول کپی شد");
    } catch (err) {
      toast.error("کپی لینک با خطا مواجه شد");
      console.error("Copy failed", err);
    }
  };

  return (
    <button onClick={handleCopy} className={cn(className, "cursor-pointer")} type="button">
      {children}
    </button>
  );
};
