import Link from "next/link";
import jacket from "@/assets/images/jacket.jpg";
import hiking from "@/assets/images/hiking.jpg";
import sneakers from "@/assets/images/sneakers.jpg";
import smartwatch from "@/assets/images/smartwatch.jpg";
import swim from "@/assets/images/swim.jpg";
import Image from "next/image";
import ProductCard from "@/app/_components/cards/ProductCard";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { TopNavActions } from "../_components/topNavigation/TopNavActions";
import { Carousel } from "@/app/_components/carousel";

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

export default async function Shop() {
    const isMobile = await isMobileDevice();

    return (
        <>
            {isMobile && <TopNavActions title="محصولات لوازم ورزشی" />}
            <div className="container mx-auto px-4 lg:px-0">
                <div className="bg-surface py-3 lg:py-6 rounded-2xl mt-4 lg:mt-8">
                    {!isMobile && <h1 className="text-2xl font-bold text-title text-center">
                        محصولات لوازم ورزشی
                    </h1>}
                    <p className="lg:text-center text-xs lg:text-sm lg:mt-3 text-muted mr-3 lg:mr-0">
                        اسپورت ساید / فروشگاه /
                        <Link href={"/"} className="text-secondary mr-1">
                            لوازم ورزشی
                        </Link>
                    </p>
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
            </div>
            <div className="container mx-auto px-4 lg:px-0 mt-6 lg:mt-8 flex flex-col lg:flex-row justify-between gap-4 lg:gap-10">
                <div className="w-80">
                    <div className="flex items-center justify-between">
                        <h4 className="text-lg text-title font-medium">
                            فیلتر محصولات
                        </h4>
                        <div className="text-sm text-secondary">
                            حذف فیلتر ها
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        {Array.from({ length: 9 }, (_, i) => <ProductCard key={i} />)}
                    </div>
                </div>
            </div>
        </>
    )
}