import sampleProduct from "@/assets/images/product-sample.png";
import Image from "next/image";
import Link from "next/link";

const ProductCard = () => {
    return (
        <Link href={"/"}>
            <div className="w-full h-full aspect-square p-4 lg:p-8 flex items-center justify-center rounded-xl lg:rounded-2xl bg-surface">
                <Image src={sampleProduct} width={275} height={275} alt="product" />
            </div>
            <h1 className="text-title text-xs lg:text-lg font-semibold lg:font-bold line-clamp-1 mt-2 lg:mt-5">
                کتونی آدیداس مدل زدایکس
            </h1>
            <div className="flex items-center gap-1.5 lg:gap-3 mt-2">
                <del className="text-2xs lg:text-sm text-disabled">
                    12,000,000
                </del>
                <p className="text-title text-xs lg:text-base">
                    11,980,000 تومان
                </p>
            </div>
        </Link>
    )
}

export default ProductCard