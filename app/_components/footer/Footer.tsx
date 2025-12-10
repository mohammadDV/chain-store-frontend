import Link from "next/link"
import enamad from "@/assets/images/enamad.png";
import Image from "next/image";

const fastAccess = [
    {
        id: 1,
        title: "صفحه اصلی",
        link: "/"
    },
    {
        id: 2,
        title: "پرفروش ترین ها",
        link: "/"
    },
    {
        id: 3,
        title: "درباره ما",
        link: "/"
    },
    {
        id: 4,
        title: "تماس با ما",
        link: "/"
    },
    {
        id: 5,
        title: "سوالات متداول",
        link: "/"
    },
]

export const Footer = () => {
    return (
        <footer className="mt-10 lg:mt-20 mb-4 lg:mb-8 px-4 lg:px-0">
            <div className="container mx-auto bg-primary p-6 lg:p-14 rounded-2xl lg:rounded-3xl grid grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-20">
                <div>
                    <h4 className="mb-2.5 lg:mb-3.5 text-xs lg:text-lg font-semibold lg:font-bold text-white">
                        دسترسی سریع
                    </h4>
                    <div className="flex flex-col gap-2 lg:gap-3">
                        {fastAccess?.map(item => (
                            <Link key={item.id} href={item.link} className="text-2xs lg:text-base text-white font-light">
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="mb-2.5 lg:mb-3.5 text-xs lg:text-lg font-semibold lg:font-bold text-white">
                        دسترسی سریع
                    </h4>
                    <div className="flex flex-col gap-2 lg:gap-3">
                        {fastAccess?.map(item => (
                            <Link key={item.id} href={item.link} className="text-2xs lg:text-base text-white font-light">
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="mb-2.5 lg:mb-3.5 text-xs lg:text-lg font-semibold lg:font-bold text-white">
                        دسترسی سریع
                    </h4>
                    <div className="flex flex-col gap-2 lg:gap-3">
                        {fastAccess?.map(item => (
                            <Link key={item.id} href={item.link} className="text-2xs lg:text-base text-white font-light">
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="mb-2.5 lg:mb-3.5 text-xs lg:text-lg font-semibold lg:font-bold text-white">
                        دسترسی سریع
                    </h4>
                    <div className="flex flex-col gap-2 lg:gap-3">
                        {fastAccess?.map(item => (
                            <Link key={item.id} href={item.link} className="text-2xs lg:text-base text-white font-light">
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="mb-2.5 lg:mb-3.5 text-xs lg:text-lg font-semibold lg:font-bold text-white">
                        نماد های اعتماد
                    </h4>
                    <Image src={enamad} alt="" width={149} height={149} className="mt-5" />
                </div>
            </div>
            <div className="container mx-auto">
                <div className="bg-surface px-3 lg:px-6 py-3 lg:py-5 mx-8 lg:mx-12 rounded-b-2xl flex flex-col lg:flex-row items-center justify-between">
                    <p className="text-title text-center text-xs lg:text-base">
                        تمامی حقوق این سایت متعلق به اسپورت ساید می‌باشد.
                    </p>
                    <p className="text-title text-center text-xs lg:text-base mt-2.5 lg:mt-0">
                        ساخته شده با  ❤️
                    </p>
                </div>
            </div>
        </footer>
    )
}