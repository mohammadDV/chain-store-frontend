import jacket from "@/assets/images/jacket.jpg";
import hiking from "@/assets/images/hiking.jpg";
import sneakers from "@/assets/images/sneakers.jpg";
import smartwatch from "@/assets/images/smartwatch.jpg";
import swim from "@/assets/images/swim.jpg";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Carousel } from "@/app/_components/carousel";
import Image from "next/image";
import ProductCard from "@/app/_components/cards/ProductCard";

const categories = [
    {
        id: 1,
        image: jacket,
        title: "انواع کاپشن"
    },
    {
        id: 2,
        image: hiking,
        title: "تجهیزات و لوازم کمپینگ"
    },
    {
        id: 3,
        image: sneakers,
        title: "کفش ورزشی"
    },
    {
        id: 4,
        image: smartwatch,
        title: "ساعت هوشمند"
    },
    {
        id: 5,
        image: swim,
        title: "لوازم شنا"
    },
]

export default async function Brand() {
    const isMobile = await isMobileDevice();

    return (
        <>
            <div className="container mx-auto mt-14">
                {isMobile
                    ? <Carousel
                        slides={categories?.map(cat => (
                            <div key={cat.id} className="flex flex-col gap-2 items-center w-20">
                                <Image src={cat.image} alt="" width={84} height={84} className="rounded-full object-cover size-20" />
                                <h3 className="text-center text-title text-xs">
                                    {cat.title}
                                </h3>
                            </div>
                        ))}
                        desktopSlidesPerView={6}
                        mobileSlidesPerView={3.5} />
                    : <div className="flex items-start justify-center mt-4 lg:mt-6 gap-5 flex-wrap">
                        {categories?.map(cat => (
                            <div key={cat.id} className="flex flex-col gap-2 items-center max-w-24">
                                <Image src={cat.image} alt="" width={84} height={84} className="rounded-full object-cover size-20" />
                                <h3 className="text-center text-title text-sm ">
                                    {cat.title}
                                </h3>
                            </div>
                        ))}
                    </div>}
            </div>
            <div className="mt-6 lg:mt-14 container mx-auto">
                <Carousel
                    slides={Array.from({ length: 6 }, (_, i) => <ProductCard key={i} />)}
                    desktopSlidesPerView={4.5}
                    mobileSlidesPerView={2.5}
                    seeMoreLink="مشاهده همه"
                    title="محبوب ترین های این هفته" />
            </div>
            <div className="container lg:mx-auto mt-6 lg:mt-14 pt-4 lg:pt-8 lg:px-8 relative">
                <div className="bg-primary h-40 lg:h-80 rounded-xl lg:rounded-3xl absolute top-0 left-0 right-0 -z-10"></div>
                <Carousel
                    slides={Array.from({ length: 6 }, (_, i) => <ProductCard key={i} />)}
                    desktopSlidesPerView={4}
                    mobileSlidesPerView={2.5}
                    seeMoreLink="مشاهده همه"
                    titleColor="text-white"
                    title="پیشنهادات شگفت انگیز" />
            </div>
            <div className="mt-6 lg:mt-14 container mx-auto">
                <Carousel
                    slides={Array.from({ length: 6 }, (_, i) => <ProductCard key={i} />)}
                    desktopSlidesPerView={4.5}
                    mobileSlidesPerView={2.5}
                    seeMoreLink="مشاهده همه"
                    title="جدید ترین محصولات ما" />
            </div>
        </>
    )
}