"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Button } from "@/ui/button";
import * as React from "react";
import { cn } from "@/lib/utils";

type BrandHeroItem = {
    id: number;
    image: StaticImageData;
    title: string;
    description: string;
    button: string;
    href: string;
};

interface BrandHeroGridProps {
    items: BrandHeroItem[];
}

export const BrandHeroGrid: React.FC<BrandHeroGridProps> = ({ items }) => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <section className="container mx-auto relative w-full z-20 mt-6 lg:mt-8 h-[260px] lg:h-[460px] px-4 lg:px-0 overflow-hidden">
            <div className={cn("flex h-full gap-2 lg:gap-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory")}>
                {items.slice(0, 4).map((item, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                        <article
                            key={item.id}
                            onClick={() => setActiveIndex(idx)}
                            className={cn(
                                "relative overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer transition-all duration-500 ease-in-out shrink-0 snap-start",
                                isActive ? "md:flex-1 basis-3/4" : "md:basis-1/7 basis-1/4"
                            )}
                            aria-current={isActive}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                quality={100}
                                fill
                                className={cn(
                                    "object-cover object-center transition-transform duration-500",
                                    isActive ? "scale-100" : "scale-[1.02]"
                                )}
                                priority={idx === 0}
                            />
                            <div
                                className={cn(
                                    "absolute inset-0",
                                    isActive
                                        ? "from-title/90 bg-linear-to-t lg:bg-linear-to-l lg:from-title/75"
                                        : "bg-black/20"
                                )}
                            ></div>

                            <div className="relative z-10 h-full">
                                <div className={cn("container h-full mx-auto px-4 lg:px-8 flex items-end pb-4 lg:pb-8")}>
                                    <div className={cn("text-white transition-opacity duration-500", isActive ? "opacity-100" : "opacity-0")}>
                                        <h1 className="text-lg lg:text-4xl leading-8 lg:leading-14 font-semibold lg:font-bold mb-1 lg:mb-4">
                                            {item.title}
                                        </h1>
                                        <p className="font-light text-xs lg:text-lg lg:mb-6 mb-4">
                                            {item.description}
                                        </p>
                                        <Link href={item.href}>
                                            <Button variant="secondary" size={"medium"}>
                                                {item.button}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};