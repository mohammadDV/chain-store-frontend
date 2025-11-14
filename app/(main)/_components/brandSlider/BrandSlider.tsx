"use client";

import Image from "next/image";
import newBalance from "@/assets/images/new-balance.png";

export const BrandSlider = () => {
    const brands = Array.from({ length: 16 }, () => newBalance);

    return (
        <div className="relative w-full overflow-hidden mt-6 lg:mt-14 brand-slider">
            <div className="flex animate-marquee">
                {[...brands, ...brands].map((brand, idx) => (
                    <div
                        key={idx}
                        className="mx-1.5 lg:mx-2.5 shrink-0 size-16 lg:size-36 bg-surface flex items-center justify-center rounded-lg lg:rounded-2xl"
                    >
                        <Image
                            src={brand}
                            width={100}
                            height={100}
                            alt="brand"
                            className="w-12 lg:w-24" />
                    </div>
                ))}
            </div>
            <div className="flex absolute top-0 left-full animate-marquee">
                {[...brands, ...brands].map((brand, idx) => (
                    <div
                        key={idx}
                        className="mx-1.5 lg:mx-2.5 shrink-0 size-16 lg:size-36 bg-surface flex items-center justify-center rounded-lg lg:rounded-2xl"
                    >
                        <Image
                            src={brand}
                            width={100}
                            height={100}
                            alt="brand"
                            className="w-12 lg:w-24" />
                    </div>
                ))}
            </div>
        </div>
    );
};
