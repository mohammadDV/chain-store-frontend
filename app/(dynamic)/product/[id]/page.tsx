import Link from "next/link";
import sampleProduct from "@/assets/images/product-sample.png";
import Image from "next/image";
import { Icon } from "@/ui/icon";
import { Button } from "@/ui/button";

export default async function Product() {
    return (
        <>
            <div className="container mx-auto mt-8">
                <p className="text-xs lg:text-sm text-muted">
                    اسپورت ساید / فروشگاه / لوازم ورزشی /
                    <Link href={"/"} className="text-secondary mr-1">
                        کاپشن ورزشی پوما مدل 2340
                    </Link>
                </p>
                <div className="mt-5 flex flex-col lg:flex-row justify-between gap-12">
                    <div className="lg:w-1/2">
                        <div className="aspect-auto p-4 lg:p-12 flex items-center justify-center rounded-2xl lg:rounded-3xl bg-surface">
                            <Image src={sampleProduct} width={460} height={460} alt="product" />
                        </div>
                        <div className="grid lg:grid-cols-3 gap-6 mt-6">
                            {Array.from({ length: 3 }, (_, i) => (
                                <div key={i} className="aspect-square p-4 lg:p-6 flex items-center justify-center rounded-xl lg:rounded-2xl bg-surface">
                                    <Image src={sampleProduct} width={160} height={160} alt="product" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <div className="flex items-center gap-3">
                            <p className="text-description text-sm">
                                دسته بندی:
                                <Link href={"/"} className="text-secondary mr-1">
                                    کفش ورزشی
                                </Link>
                            </p>
                            <div className="w-px h-4 block bg-border"></div>
                            <p className="text-description text-sm">
                                برند:
                                <Link href={"/"} className="text-secondary mr-1">
                                    پوما
                                </Link>
                            </p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <h1 className="text-2xl font-bold text-title">
                                کاپشن ورزشی پوما مدل 2340
                            </h1>
                            <div className="flex items-center justify-center bg-success rounded-full py-1 px-3 text-xs text-white">
                                ضمانت اصل بودن کالا
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-1">
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Icon key={i} icon="solar--star-bold" sizeClass="size-5" className="text-warning" />
                                ))}
                            </div>
                            <p className="text-xs text-description">
                                5  (از 12 نظر ثبت شده)
                            </p>
                        </div>
                        <div className="mt-8 flex items-center gap-2.5">
                            <del className="text-disabled text-lg">
                                12,000,000
                            </del>
                            <div className="bg-secondary py-0.5 px-3 rounded-sm text-white text-sm flex items-center justify-center">
                                12 %
                            </div>
                        </div>
                        <p className="text-secondary text-2xl font-bold mt-2">
                            11,980,000 تومان
                        </p>
                        <div className="mt-8">
                            <p className="text-title font-medium mb-3">
                                ویژگی های این محصول
                            </p>
                            <div className="grid grid-cols-4 gap-3">
                                {Array.from({ length: 4 }, (_, i) => (
                                    <div key={i} className="p-2.5 rounded-lg bg-surface">
                                        <p className="text-xs text-muted">
                                            رنگبندی ها
                                        </p>
                                        <p className="text-title text-xs font-medium mt-1">
                                            طوسی، سفید، مشکی
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-8">
                            <p className="text-title text-sm font-medium mb-2">
                                انتخاب سایز
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                                <div className="size-9 flex items-center justify-center rounded-md bg-surface text-secondary">
                                    S
                                </div>
                                <div className="size-9 flex items-center justify-center rounded-md bg-surface text-secondary">
                                    M
                                </div>
                                <div className="size-9 flex items-center justify-center rounded-md bg-secondary text-white">
                                    L
                                </div>
                                <div className="size-9 flex items-center justify-center rounded-md bg-surface text-secondary">
                                    XL
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="text-title text-sm font-medium mb-2">
                                انتخاب رنگ
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                                <div className="size-9 flex items-center justify-center p-1 rounded-md bg-surface text-secondary">
                                    <div className="bg-white h-full w-full rounded-sm">
                                    </div>
                                </div>
                                <div className="size-9 flex items-center justify-center p-1 rounded-md bg-surface text-secondary">
                                    <div className="bg-[#DBDADA] h-full w-full rounded-sm">
                                    </div>
                                </div>
                                <div className="size-9 flex items-center justify-center p-1 rounded-md bg-surface text-secondary">
                                    <div className="bg-primary h-full w-full rounded-sm">
                                    </div>
                                </div>
                                <div className="size-9 flex items-center justify-center p-1 rounded-md bg-surface text-secondary">
                                    <div className="bg-[#D9C492] h-full w-full rounded-sm">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between gap-5">
                            <Button variant={"primary"} size={"large"} className="flex-1">
                                افزودن به سبد خرید
                            </Button>
                            <div className="bg-surface rounded-full p-1.5 flex items-center justify-between gap-10">
                                <div className="size-11 bg-white rounded-full flex items-center justify-center">
                                    <Icon
                                        icon="lucide--plus"
                                        sizeClass="size-5"
                                        className="text-secondary" />
                                </div>
                                <p className="text-xl font-medium text-title">
                                    1
                                </p>
                                <div className="size-11 bg-white rounded-full flex items-center justify-center">
                                    <Icon
                                        icon="lucide--minus"
                                        sizeClass="size-5"
                                        className="text-secondary" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-description">
                                    افزودن به علاقه مندی
                                </p>
                                <Icon
                                    icon="solar--heart-linear"
                                    sizeClass="size-4"
                                    className="text-description" />
                            </div>
                            <div className="w-px h-4 block bg-border"></div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-description">
                                    اشتراک گذاری
                                </p>
                                <Icon
                                    icon="solar--share-circle-outline"
                                    sizeClass="size-4"
                                    className="text-description" />
                            </div>
                            <div className="w-px h-4 block bg-border"></div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-description">
                                    کپی شناسه محصول
                                </p>
                                <Icon
                                    icon="solar--copy-outline"
                                    sizeClass="size-4"
                                    className="text-description" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}