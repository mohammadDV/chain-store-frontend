"use client";

import { createFileUrl } from "@/lib/utils";
import { Brand } from "@/types/brand.type";
import Image from "next/image";
import Link from "next/link";

interface BrandSliderProps {
    brandsData?: Brand[],
    isMobile?: boolean;
}

export const BrandSlider = ({ brandsData, isMobile }: BrandSliderProps) => {
    return (
        brandsData && (
            ((isMobile && brandsData?.length > 4) || (!isMobile && brandsData?.length > 8))
                ? <div className="relative w-full overflow-hidden mt-6 lg:mt-14 brand-slider">
                    <div className="flex animate-marquee">
                        {[...brandsData, ...brandsData].map((brand, index) => (
                            <Link
                                href={`/brand/${brand.id}`}
                                key={index}
                                className="mx-1.5 lg:mx-2.5 shrink-0 size-16 lg:size-36 bg-surface flex items-center justify-center rounded-lg lg:rounded-2xl"
                            >
                                <Image
                                    src={createFileUrl(brand.logo || "")}
                                    width={100}
                                    height={100}
                                    alt="brand"
                                    className="w-12 lg:w-24" />
                            </Link>
                        ))}
                    </div>
                    <div className="flex absolute top-0 left-full animate-marquee">
                        {[...brandsData, ...brandsData].map((brand, index) => (
                            <Link
                                href={`/brand/${brand.id}`}
                                key={index}
                                className="mx-1.5 lg:mx-2.5 shrink-0 size-16 lg:size-36 bg-surface flex items-center justify-center rounded-lg lg:rounded-2xl"
                            >
                                <Image
                                    src={createFileUrl(brand.logo || "")}
                                    width={100}
                                    height={100}
                                    alt="brand"
                                    className="w-12 lg:w-24" />
                            </Link>
                        ))}
                    </div>
                </div>
                : <div className="relative container mx-auto mt-6 lg:mt-14 px-4 lg:px-0">
                    <div className="flex items-center justify-center">
                        {brandsData.map((brand) => (
                            <Link
                                href={`/brand/${brand.id}`}
                                key={brand.id}
                                className="mx-1.5 lg:mx-2.5 shrink-0 size-16 lg:size-36 bg-surface flex items-center justify-center rounded-lg lg:rounded-2xl"
                            >
                                <Image
                                    src={createFileUrl(brand.logo || "")}
                                    width={100}
                                    height={100}
                                    alt="brand"
                                    className="w-12 lg:w-24" />
                            </Link>
                        ))}
                    </div>
                </div>
        )
    );
};
