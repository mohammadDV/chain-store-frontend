"use client";

import { FavoriteStatus, StatusCode } from "@/constants/enums";
import { cn, isEmpty } from "@/lib/utils";
import type { UserData } from "@/types/user.type";
import { Icon } from "@/ui/icon";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { addProductToFavoriteAction } from "../_api/addToFavoriteAction";

export interface AddToFavoritesProps {
  id: number;
  userData?: UserData | null;
  isFavorite?: boolean;
}

export const AddToFavorites = ({ id, userData, isFavorite }: AddToFavoritesProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favoriteStatus, setFavoriteStatus] = useState<FavoriteStatus>(
    isFavorite ? FavoriteStatus.Added : FavoriteStatus.Removed
  );

  const isFavorited = favoriteStatus === FavoriteStatus.Added;

  const addToFavoriteHandler = async () => {
    if (!isEmpty(userData)) {
      setIsLoading(true);
      try {
        const res = await addProductToFavoriteAction(id);
        if (res.status !== StatusCode.Success) {
          toast.error(res.message || "خطایی رخ داد");
          return;
        }
        setFavoriteStatus(res.favorite);
      } catch {
        toast.error("خطایی رخ داد");
      } finally {
        setIsLoading(false);
      }
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <button
      type="button"
      onClick={addToFavoriteHandler}
      disabled={isLoading}
      className={"flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition-colors"}>
      <p className={cn("text-sm", isFavorited ? "text-secondary" : "text-description")}>
        {isFavorited ? "حذف از علاقه مندی" : "افزودن به علاقه مندی"}
      </p>
      <Icon
        icon="solar--heart-linear"
        sizeClass="size-4"
        className={cn(isFavorited ? "text-secondary" : "text-description")}
      />
    </button>
  );
};

