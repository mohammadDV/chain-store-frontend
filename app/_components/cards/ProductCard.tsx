import { createFileUrl, putCommas } from "@/lib/utils";
import { ProductSummary } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

export interface ProductCardProps {
    data: ProductSummary;
}

const ProductCard = ({ data }: ProductCardProps) => {
    return (
        <Link href={`/product/${data.id}`} className="relative">
            <div className="aspect-square p-4 lg:p-8 flex items-center justify-center rounded-xl lg:rounded-2xl bg-surface">
                <Image src={createFileUrl(data.image || "")} width={275} height={275} alt={data.title} />
            </div>
            <h1 className="text-title text-xs lg:text-lg font-semibold lg:font-bold line-clamp-1 mt-2 lg:mt-5">
                {data.title}
            </h1>
            <div className="flex items-center gap-1.5 lg:gap-3 mt-2">
                {data.discount > 0 && (
                    <del className="text-2xs lg:text-sm text-disabled">
                        {putCommas(data.amount)} تومان
                    </del>
                )}
                <p className="text-title text-xs lg:text-base">
                    {putCommas(Math.round(data.amount * (1 - (data.discount || 0) / 100)))} تومان
                </p>
            </div>
        </Link>
    )
}

export default ProductCard
