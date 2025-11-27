import samplePost from "@/assets/images/sample-post.jpg";
import Image from "next/image";
import Link from "next/link";

export default async function Blog() {
    return (
        <>
            <h1 className="text-center text-title text-xl lg:text-3xl font-bold mt-6 lg:mt-14">
                وبلاگ بوف استور
            </h1>
            <div className="lg:max-w-6xl mx-auto mt-4 lg:mt-6 px-4 lg:px-0">
                <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
                    {Array.from({ length: 9 }, (_, i) => (
                        <div key={i} className="bg-surface p-4 rounded-3xl">
                            <Image src={samplePost} alt={`post ${i}`} className="w-full h-44 object-cover rounded-2xl" />
                            <h3 className="lg:text-lg text-title font-semibold mt-3 line-clamp-1">
                                انتخاب بهترین لباس ها برای مهمانی در سال 2025
                            </h3>
                            <p className="text-sm text-description mt-1.5 leading-6 line-clamp-2">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است...
                            </p>
                            <Link href={"/"} className="inline-block mt-3 text-secondary text-sm underline">
                                مشاهده بیشتر
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}