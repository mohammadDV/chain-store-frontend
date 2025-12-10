import samplePost from "@/assets/images/post-sample.jpg";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import Image from "next/image";
import { TopNavActions } from "../../_components/topNavigation/TopNavActions";

export default async function Post() {
    const isMobile = await isMobileDevice();

    return (
        <>
            {isMobile && <TopNavActions title="محصولات لوازم ورزشی" />}
            <div className="lg:max-w-5xl mx-auto mt-6 lg:mt-10 text-center px-4 lg:px-0">
                <div className="mx-auto inline-block bg-surface px-4 py-1 rounded-full text-sm text-secondary">
                    مقالات آموزشی
                </div>
                <h1 className="text-lg lg:text-3xl font-bold text-center my-3 lg:my-5">
                    انتخاب بهترین لباس ها برای مهمانی در سال 2025
                </h1>
                <div className="flex items-center justify-center gap-3 lg:gap-5">
                    <p className="text-muted text-xs lg:text-base">
                        نویسنده: مدیر سایت
                    </p>
                    <span className="text-border">|</span>
                    <p className="text-muted text-xs lg:text-base">
                        تاریخ: 25 آبان 1404
                    </p>
                    <span className="text-border">|</span>
                    <p className="text-muted text-xs lg:text-base">
                        زمان خواندن: 5 دقیقه
                    </p>
                </div>
                <Image src={samplePost} alt="" width={1024} height={460} className="w-full object-cover h-44 lg:h-[460px] mt-4 lg:mt-8 rounded-2xl lg:rounded-3xl" />
            </div>
            <div className="lg:max-w-3xl mx-auto px-4 lg:px-0 mt-4 lg:mt-9">
                <p className="text-description text-sm lg:text-base leading-7">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                </p>
                <p className="text-description text-sm lg:text-base leading-7 mt-3">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                </p>
                <p className="text-description text-sm lg:text-base leading-7 mt-3">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                </p>
            </div>
        </>
    )
}