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
    if (!brandsData?.length) {
        return null;
    }

    const useMarquee =
        (isMobile && brandsData.length > 4) || (!isMobile && brandsData.length > 8);

    if (useMarquee) {
        return (
            <div className="relative h-full w-full overflow-hidden brand-slider">
                <div className="flex h-full items-center animate-marquee">
                    {[...brandsData, ...brandsData].map((brand, index) => (
                        <Link
                            href={`/brand/${brand.slug || brand.id}`}
                            key={`a-${brand.id}-${index}`}
                            className="mx-1.5 lg:mx-2.5 shrink-0 size-16 lg:size-36 bg-surface flex items-center justify-center rounded-lg lg:rounded-2xl"
                        >
                            <Image
                                src={createFileUrl(brand.logo || "")}
                                width={100}
                                height={100}
                                alt={brand.title}
                                className="w-12 lg:w-24" />
                        </Link>
                    ))}
                </div>
                <div className="flex absolute inset-y-0 left-full items-center animate-marquee">
                    {[...brandsData, ...brandsData].map((brand, index) => (
                        <Link
                            href={`/brand/${brand.slug || brand.id}`}
                            key={`b-${brand.id}-${index}`}
                            className="mx-1.5 lg:mx-2.5 shrink-0 size-16 lg:size-36 bg-surface flex items-center justify-center rounded-lg lg:rounded-2xl"
                        >
                            <Image
                                src={createFileUrl(brand.logo || "")}
                                width={100}
                                height={100}
                                alt={brand.title}
                                className="w-12 lg:w-24" />
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full items-center justify-center">
            {brandsData.map((brand) => (
                <Link
                    href={`/brand/${brand.slug || brand.id}`}
                    key={brand.id}
                    className="mx-1.5 lg:mx-2.5 shrink-0 size-16 lg:size-36 bg-surface flex items-center justify-center rounded-lg lg:rounded-2xl"
                >
                    <Image
                        src={createFileUrl(brand.logo || "")}
                        width={100}
                        height={100}
                        alt={brand.title}
                        className="w-12 lg:w-24" />
                </Link>
            ))}
        </div>
    );
};
