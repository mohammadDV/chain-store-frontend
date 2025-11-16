"use client";

import Image from "next/image";
import jacket from "@/assets/images/jacket.jpg";
import hiking from "@/assets/images/hiking.jpg";
import sneakers from "@/assets/images/sneakers.jpg";
import smartwatch from "@/assets/images/smartwatch.jpg";
import swim from "@/assets/images/swim.jpg";
import { cn } from "@/lib/utils";

type Card = {
  title: string;
  caption: string;
  image: any;
  spanClass: string;
};

const cards: Card[] = [
  {
    title: "انواع کاپشن",
    caption: "+200 محصول",
    image: jacket,
    spanClass: "col-span-2 row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    title: "تجهیزات و لوازم کمپینگ",
    caption: "+200 محصول",
    image: hiking,
    spanClass: "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
  },
  {
    title: "کفش ورزشی",
    caption: "+200 محصول",
    image: sneakers,
    spanClass: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
  },
  {
    title: "ساعت هوشمند",
    caption: "+200 محصول",
    image: smartwatch,
    spanClass: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
  },
  {
    title: "لوازم شنا",
    caption: "+200 محصول",
    image: swim,
    spanClass: "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
  },
];

export const BentoCategory = () => {
  return (
    <section className="container mx-auto mt-14" dir="rtl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 auto-rows-[140px] md:auto-rows-[260px]">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={cn("relative group overflow-hidden rounded-3xl shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:z-10", card.spanClass)}
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-6 right-6 text-white">
              <h3 className="text-lg md:text-xl font-semibold drop-shadow-sm">{card.title}</h3>
              <p className="text-xs md:text-sm drop-shadow-sm mt-1">{card.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
