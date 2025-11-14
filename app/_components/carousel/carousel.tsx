"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@/ui/icon";
import Link from "next/link";
import { JSX, useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface CarouselProps {
  title?: string;
  slides: Array<JSX.Element>;
  seeMoreLink?: string;
  disableNavigation?: boolean;
  desktopSlidesPerView?: number;
  mobileSlidesPerView?: number;
  titleColor?: string;
}

export const Carousel = ({
  title,
  slides,
  disableNavigation,
  seeMoreLink,
  desktopSlidesPerView,
  mobileSlidesPerView,
  titleColor
}: CarouselProps) => {
  const swiperRef = useRef<SwiperType>(null);

  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section className="pr-4 lg:px-0">
      <div className="flex items-center justify-between mb-4 lg:mb-6 pl-4 lg:pl-0">
        <div className="flex items-center gap-2.5 lg:gap-4">
          <h2 className={cn("text-lg lg:text-2xl font-bold", titleColor || "text-title")}>{title}</h2>
          {seeMoreLink && (
            <Link
              href={seeMoreLink}
              className="text-secondary underline"
            >
              مشاهده بیشتر
            </Link>
          )}
        </div>
        <div className="flex items-center justify-end gap-4">
          {(!disableNavigation && slides?.length > (desktopSlidesPerView || 4)) && (
            <div className="hidden lg:flex items-center gap-2.5">
              <button
                onClick={handlePrevSlide}
                className="flex items-center justify-center size-12 rounded-lg bg-surface cursor-pointer"
              >
                <Icon
                  icon="solar--alt-arrow-right-outline"
                  sizeClass="size-7"
                  className="text-secondary"
                />
              </button>
              <button
                onClick={handleNextSlide}
                className="flex items-center justify-center size-12 rounded-lg bg-surface cursor-pointer"
              >
                <Icon
                  icon="solar--alt-arrow-left-outline"
                  sizeClass="size-7"
                  className="text-secondary"
                />
              </button>
            </div>
          )}
        </div>
      </div>
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={mobileSlidesPerView || 1.6}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: desktopSlidesPerView || 4,
            spaceBetween: 32,
          },
        }}
        className="products-swiper"
      >
        {slides.map((component) => (
          <SwiperSlide key={component.key}>{component}</SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
