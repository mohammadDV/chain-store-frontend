"use client";

import Image from "next/image";
import heroImg from "@/assets/images/hero.jpg";

type Card = {
  title: string;
  caption: string;
  image: any;
  spanClass: string;
};

const cards: Card[] = [
  {
    title: "کفش ورزشی",
    caption: "مدل‌های محبوب برای دویدن",
    image: heroImg,
    spanClass: "col-span-2 row-span-2 md:col-span-3 md:row-span-2",
  },
  {
    title: "لباس زنانه",
    caption: "راحت و باکیفیت",
    image: heroImg,
    spanClass: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    title: "لباس مردانه",
    caption: "تی‌شرت و سوییشرت",
    image: heroImg,
    spanClass: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
  },
  {
    title: "کفش بچه‌گانه",
    caption: "سبک و مدرسه‌ای",
    image: heroImg,
    spanClass: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
  },
  {
    title: "ست تمرینی",
    caption: "ترکیب کاربردی باشگاه",
    image: heroImg,
    spanClass: "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
  },
  {
    title: "تجهیزات تناسب اندام",
    caption: "طناب، کش و ابزار",
    image: heroImg,
    spanClass: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
  },
  {
    title: "کفش کلاسیک",
    caption: "استایل روزمره",
    image: heroImg,
    spanClass: "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
  },
  {
    title: "اکسسوری ورزشی",
    caption: "کلاه و کیف ورزشی",
    image: heroImg,
    spanClass: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
  },
];

export const BentoCategory = () => {
  return (
    <section className="container mx-auto mt-12">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[150px]">
        {cards.map((card, idx) => (
          <article
            key={idx}
            className={`relative group overflow-hidden rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105 hover:z-10 ${card.spanClass}`}
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-6 right-6 text-white">
              <h3 className="text-lg md:text-xl font-semibold drop-shadow-sm">{card.title}</h3>
              <p className="text-sm md:text-base drop-shadow-sm">{card.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
