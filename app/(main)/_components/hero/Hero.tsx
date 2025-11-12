"use client";

import heroImg from "@/assets/images/hero.jpg";
import { Button } from "@/ui/button";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const Hero = () => {

    const slideData = [
        {
            id: 1,
            title: "به راحتی قله ها را فتح کنید و بالا بروید!",
            description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
            button: "مشاهده محصولات",
        },
        {
            id: 2,
            title: "به راحتی قله ها را فتح کنید و بالا بروید!",
            description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
            button: "مشاهده محصولات",
        },
    ];

    return (
        <section className="container mx-auto relative w-full z-20 rounded-3xl mt-9 lg:h-[460px] overflow-hidden">
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
                speed={700}
                loop={true}
                className="h-full"
            >
                {slideData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0">
                                <Image
                                    src={heroImg}
                                    alt=""
                                    priority={index === 0}
                                    quality={100}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 from-surface/80 lg:bg-linear-to-l lg:from-title/75"></div>
                            </div>

                            <div className="relative container px-20 mx-auto z-10 h-full flex">
                                <div className="flex flex-col justify-center items-start max-w-xl h-full text-white">
                                    <h1 className="text-xl lg:text-4xl leading-8 lg:leading-14 font-semibold lg:font-bold mb-5">
                                        {slide.title}
                                    </h1>
                                    <p className="font-light text-lg mb-7 hidden lg:block">
                                        {slide.description}
                                    </p>
                                    <Link href={"/profile/projects/sender/create"}>
                                        <Button variant="secondary" size="medium">
                                            {slide.button}
                                        </Button>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="hero-pagination absolute left-1/2 -translate-1/2 bottom-7 transform z-30 flex gap-2"></div>
        </section>
    );
};