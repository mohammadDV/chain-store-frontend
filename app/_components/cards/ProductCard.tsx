import sampleProduct from "@/assets/images/product-sample.png";
import Image from "next/image";
import Link from "next/link";

const ProductCard = () => {
    return (
        <Link href={"/"}>
            <div className="w-full h-full aspect-square p-8 flex items-center justify-center rounded-2xl bg-surface">
                <Image src={sampleProduct} width={275} height={275} alt="product" />
            </div>
            <h1 className="text-title text-lg font-bold line-clamp-1 mt-5">
                کتونی آدیداس مدل زدایکس
            </h1>
            <div className="flex items-center gap-3 mt-2">
                <del className="text-sm text-disabled">
                    12,000,000 تومان
                </del>
                <p className="text-title">
                    11,980,000 تومان
                </p>
            </div>
        </Link>
    )
}

export default ProductCard