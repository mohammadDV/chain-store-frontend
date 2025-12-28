"use client";

import { createFileUrl, isEmpty, putCommas } from "@/lib/utils";
import { FavoriteStatus, StatusCode } from "@/constants/enums";
import { getUserDataAction } from "@/lib/getUserData";
import { ProductSummary } from "@/types/product";
import type { UserData } from "@/types/user.type";
import { Badge } from "@/ui/badge";
import { Icon } from "@/ui/icon";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { toast } from "sonner";
import { addProductToFavoriteAction } from "@/app/(dynamic)/product/_api/addToFavoriteAction";

export interface ProductCardProps {
    data: ProductSummary;
}

const ProductCard = ({ data }: ProductCardProps) => {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [favoriteStatus, setFavoriteStatus] = useState<FavoriteStatus>(
        data.is_favorite ? FavoriteStatus.Added : FavoriteStatus.Removed
    );

    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await getUserDataAction();
                setUserData((res ?? null) as UserData | null);
            } catch {
                setUserData(null);
            }
        };

        getUserData();
    }, []);

    const isFavorited = favoriteStatus === FavoriteStatus.Added;

    const addToFavoriteHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLoading) return;

        if (!isEmpty(userData)) {
            setIsLoading(true);
            try {
                const res = await addProductToFavoriteAction(data.id);
                if (res.status !== StatusCode.Success) {
                    toast.error(res.message || "خطایی رخ داد");
                    return;
                }
                setFavoriteStatus(res.favorite);
                router.refresh();
            } catch {
                toast.error("خطایی رخ داد");
            } finally {
                setIsLoading(false);
            }
        } else {
            router.push("/auth/login");
        }
    };

    const isFree = data.amount === 0;

    return (
        <Link href={`/product/${data.id}`} className="relative">
            {data.discount > 0 && (
                <Badge variant="secondary" className="absolute top-0 right-0 lg:top-4 lg:right-4">{data.discount}%</Badge>
            )}
            <div className="hidden lg:block absolute left-4 top-4">
                <Icon
                    icon={isFavorited ? "solar--heart-bold" : "solar--heart-linear"}
                    sizeClass="size-6"
                    className="text-primary"
                    onClick={addToFavoriteHandler}
                />
            </div>
            <Image
                src={createFileUrl(data.image || "")}
                width={275}
                height={275}
                alt={data.title}
                className="rounded-xl lg:rounded-2xl w-full aspect-square" />
            <h1 className="text-title text-xs lg:text-lg font-semibold lg:font-bold line-clamp-1 mt-2 lg:mt-4">
                {data.title}
            </h1>
            <div className="flex items-center gap-1.5 lg:gap-3 mt-2">
                {!isFree && data.discount > 0 && (
                    <del className="text-2xs lg:text-sm text-disabled">
                        {putCommas(
                            Math.round(
                                data.amount / Math.max(1e-9, 1 - (data.discount || 0) / 100)
                            )
                        )}
                    </del>
                )}
                <p className="text-title text-xs lg:text-base">
                    {isFree ? "رایگان" : `${putCommas(data.amount)} تومان`}
                </p>
            </div>
        </Link>
    )
}

export default ProductCard;
