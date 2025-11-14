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
        <footer className="mt-20 mb-8">
            <div className="container mx-auto bg-primary p-14 rounded-3xl grid lg:grid-cols-5 gap-20">
                <div>
                    <h4 className="mb-3.5 text-lg font-bold text-white">
                        دسترسی سریع
                    </h4>
                    <div className="flex flex-col gap-3">
                        {fastAccess?.map(item => (
                            <Link key={item.id} href={item.link} className="text-white font-light">
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="mb-3.5 text-lg font-bold text-white">
                        دسترسی سریع
                    </h4>
                    <div className="flex flex-col gap-3">
                        {fastAccess?.map(item => (
                            <Link key={item.id} href={item.link} className="text-white font-light">
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="mb-3.5 text-lg font-bold text-white">
                        دسترسی سریع
                    </h4>
                    <div className="flex flex-col gap-3">
                        {fastAccess?.map(item => (
                            <Link key={item.id} href={item.link} className="text-white font-light">
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="mb-3.5 text-lg font-bold text-white">
                        دسترسی سریع
                    </h4>
                    <div className="flex flex-col gap-3">
                        {fastAccess?.map(item => (
                            <Link key={item.id} href={item.link} className="text-white font-light">
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="mb-3.5 text-lg font-bold text-white">
                        نماد های اعتماد
                    </h4>
                    <Image src={enamad} alt="" width={149} height={149} className="mt-5" />
                </div>
            </div>
            <div className="container mx-auto">
                <div className="bg-surface px-6 py-5 mx-12 rounded-b-2xl flex items-center justify-between">
                    <p className="text-title">
                        تمامی حقوق این سایت متعلق به اسپورت ساید می‌باشد.
                    </p>
                    <p className="text-title">
                        ساخته شده با  ❤️
                    </p>
                </div>
            </div>
        </footer>
    )
}