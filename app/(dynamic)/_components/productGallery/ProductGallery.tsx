"use client";

import * as React from "react";
import Image, { type StaticImageData } from "next/image";
import { cn, createFileUrl } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Icon } from "@/ui/icon";

interface ProductGalleryProps {
    images: string[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
    const slides = images && images.length > 0 ? images : [];

    return (
        <div className="lg:w-1/2">
            <div className={cn("relative aspect-auto p-4 lg:p-12 flex items-center justify-center rounded-2xl lg:rounded-3xl bg-surface")}>
                <div className="w-full">
                    <Swiper
                        modules={[Navigation]}
                        navigation={{ nextEl: ".gallery-next", prevEl: ".gallery-prev" }}
                        className="w-full"
                    >
                        {slides.map((img, idx) => (
                            <SwiperSlide key={idx} className="flex items-center justify-center">
                                <Image src={createFileUrl(img)} width={460} height={460} alt="product" className="object-contain mx-auto" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <button
                        className={"gallery-prev absolute cursor-pointer left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-md size-8 lg:size-10 flex items-center justify-center shadow"}
                        aria-label="previous"
                    >
                        <Icon icon="solar--alt-arrow-left-outline" className="text-secondary" />
                    </button>
                    <button
                        className={"gallery-next absolute cursor-pointer right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-md size-8 lg:size-10 flex items-center justify-center shadow"}
                        aria-label="next"
                    >
                        <Icon icon="solar--alt-arrow-right-outline" className="text-secondary" />
                    </button>
                </div>
            </div>

            <div className={cn("lg:grid-cols-3 gap-6 mt-6 hidden lg:grid")}>
                {slides.slice(0, 3).map((img, idx) => (
                    <div key={idx} className="aspect-square p-4 lg:p-6 flex items-center justify-center rounded-xl lg:rounded-2xl bg-surface">
                        <Image src={createFileUrl(img)} width={160} height={160} alt="product" />
                    </div>
                ))}
            </div>
        </div>
    );
};

