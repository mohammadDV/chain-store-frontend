"use client";

import { resolveSiteLink } from "@/lib/resolveSiteLink";
import { createFileUrl } from "@/lib/utils";
import { BrandBanner } from "@/types/brand.type";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface HeroProps {
    bannersData?: BrandBanner[];
}

export const Hero = ({ bannersData }: HeroProps) => {
    return (
        <section className="container mx-auto relative w-full z-20 mt-6 lg:mt-9 h-[260px] lg:h-[460px] px-4 lg:px-0 overflow-hidden">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{
                    clickable: true,
                    el: ".hero-pagination",
                    bulletClass: "hero-pagination-bullet",
                    bulletActiveClass: "hero-pagination-bullet-active",
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                speed={1000}
                loop={true}
                className="h-full rounded-2xl lg:rounded-3xl"
            >
                {bannersData?.map((slide, index) => {
                    const image = (
                        <Image
                            src={createFileUrl(slide.image || "")}
                            alt={slide.title || "بنر بوف استور"}
                            priority={index === 0}
                            quality={100}
                            width={1280}
                            height={460}
                            sizes="(max-width: 1024px) 100vw, 1280px"
                            className="w-full h-full object-cover"
                        />
                    );

                    const resolvedLink = resolveSiteLink(slide.link);

                    return (
                        <SwiperSlide key={slide.id}>
                            <div className="relative w-full h-full">
                                {resolvedLink ? (
                                    <Link
                                        href={resolvedLink.href}
                                        {...(resolvedLink.isExternal
                                            ? {
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                            }
                                            : {})}
                                        className="absolute inset-0 block"
                                        aria-label={slide.title || "بنر بوف استور"}
                                    >
                                        {image}
                                    </Link>
                                ) : (
                                    <div className="absolute inset-0">{image}</div>
                                )}
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <div className="hero-pagination absolute left-8! lg:left-1/2 lg:-translate-1/2 bottom-4! lg:bottom-7 transform z-30 flex justify-end lg:justify-start gap-2"></div>
        </section>
    );
};
