import samplePost from "@/assets/images/post-sample.jpg";
import Image from "next/image";

export default async function About() {
    return (
        <div className="max-w-5xl mx-auto mt-8 lg:mt-16 px-4 lg:px-0">
            <h1 className="text-lg lg:text-3xl font-bold text-title text-center">
                درباره فروشگاه بوف استور
            </h1>

            <div className="mt-6 lg:mt-10 flex justify-center">
                <Image
                    src={samplePost}
                    alt="Boof Store"
                    className="w-full rounded-xl object-cover"
                />
            </div>

            <p className="mt-6 text-sm lg:text-base text-description">
                به فروشگاه بوف استور خوش آمدید؛ جایی که اصالت، کیفیت و قیمت منصفانه در کنار هم قرار می‌گیرند. ما یک شرکت فعال در حوزه تأمین و فروش کالاهای ورزشی و تخصصی هستیم که محصولات 100٪ اورجینال را به‌صورت مستقیم از کشورهای ترکیه و امارات وارد می‌کنیم تا تجربه‌ای مطمئن و حرفه‌ای از خرید را برای شما فراهم کنیم.
            </p>

            <h2 className="mt-6 font-bold text-title text-base lg:text-xl">
                خرید آسان و بدون دغدغه
            </h2>
            <p className="mt-2 text-sm lg:text-base text-description">
                در بوف استور، ساده‌سازی فرایند خرید اولویت ماست. وب‌سایت ما به‌گونه‌ای طراحی شده که با چند کلیک بتوانید محصول موردنظر خود را پیدا و سفارش دهید. توضیحات شفاف، تصاویر باکیفیت و دسته‌بندی‌های دقیق به شما کمک می‌کند با اطمینان انتخاب کنید.
            </p>
            <p className="mt-2 text-sm lg:text-base text-description">
                تیم پشتیبانی بوف استور نیز همواره آماده پاسخگویی است. اگر برای انتخاب محصول نیاز به راهنمایی دارید یا پرسشی دارید، با ما در تماس باشید تا با دقت و مسئولیت‌پذیری راهنمایی‌تان کنیم.
            </p>

            <h2 className="mt-6 font-bold text-title text-base lg:text-xl">
                تحویل راحت و مطمئن
            </h2>
            <p className="mt-2 text-sm lg:text-base text-description">
                ارسال سریع و مطمئن یکی از تعهدات اصلی بوف استور است. پس از ثبت سفارش، کالاها با دقت بسته‌بندی شده و از طریق سیستم حمل‌ونقل امن ارسال می‌شوند تا در کوتاه‌ترین زمان ممکن به دست شما برسند.
            </p>

            <h2 className="mt-6 font-bold text-title text-base lg:text-xl">
                قیمت مناسب، کیفیت تضمین‌شده
            </h2>
            <p className="mt-2 text-sm lg:text-base text-description">
                ما با واردات مستقیم کالا از ترکیه و امارات، هزینه‌های واسطه‌ای را حذف کرده‌ایم تا محصولات اورجینال را با قیمت‌های رقابتی در اختیار شما قرار دهیم. هدف ما دسترسی آسان‌تر به کالاهای باکیفیت و واقعی است.
            </p>

            <h2 className="mt-6 font-bold text-title text-base lg:text-xl">
                محصولات 100٪ اورجینال
            </h2>
            <p className="mt-2 text-sm lg:text-base text-description">
                تمامی کالاهای موجود در بوف استور اصل و دارای تضمین اصالت هستند. ما به اهمیت اعتماد شما واقفیم و به همین دلیل فقط محصولاتی را عرضه می‌کنیم که از منابع معتبر و رسمی تأمین شده‌اند.
            </p>

            <h2 className="mt-6 font-bold text-title text-base lg:text-xl">
                تنوع کامل برای نیازهای مختلف
            </h2>
            <p className="mt-2 text-sm lg:text-base text-description">
                در بوف استور، مجموعه‌ای متنوع از پوشاک، کفش و تجهیزات ورزشی برای سطوح مختلف — از مبتدی تا حرفه‌ای — ارائه می‌شود. فرقی نمی‌کند علاقه‌مند به دوچرخه‌سواری، کوهنوردی، شنا، فوتبال یا سایر رشته‌ها باشید؛ محصولات ما برای پاسخ‌گویی به نیاز شما انتخاب شده‌اند.
            </p>

            <h2 className="mt-6 font-bold text-title text-base lg:text-xl">
                تجربه خرید مطمئن و لذت‌بخش
            </h2>
            <p className="mt-2 text-sm lg:text-base text-description">
                ما در بوف استور باور داریم خرید فقط یک معامله نیست، بلکه یک تجربه است. از لحظه ورود به سایت تا دریافت سفارش، تلاش می‌کنیم تجربه‌ای شفاف، سریع و بدون استرس برای شما بسازیم.
            </p>

            <h2 className="mt-6 font-bold text-title text-base lg:text-xl">
                چرا بوف استور؟
            </h2>
            <ul className="mt-2 text-sm lg:text-base text-description list-disc pr-5 space-y-1">
                <li>واردات مستقیم از ترکیه و امارات</li>
                <li>تضمین اصالت تمامی کالاها</li>
                <li>قیمت‌های منصفانه و رقابتی</li>
                <li>خرید آسان و سریع</li>
                <li>ارسال امن و به‌موقع</li>
                <li>پشتیبانی پاسخ‌گو و حرفه‌ای</li>
                <li>تنوع بالای محصولات</li>
            </ul>

            <h2 className="mt-6 font-bold text-title text-base lg:text-xl">
                مأموریت ما
            </h2>
            <p className="mt-2 text-sm lg:text-base text-description">
                مأموریت بوف استور ارائه کالاهای اورجینال با خدمات قابل‌اعتماد است تا به شما در داشتن سبک زندگی فعال‌تر و سالم‌تر کمک کنیم.
            </p>

            <h2 className="mt-6 font-bold text-title text-base lg:text-xl">
                چشم‌انداز ما
            </h2>
            <p className="mt-2 text-sm lg:text-base text-description">
                چشم‌انداز ما تبدیل شدن به یکی از انتخاب‌های اصلی و قابل‌اعتماد شما برای خرید کالاهای ورزشی و تخصصی در ایران است؛ با تمرکز بر کیفیت، صداقت و رضایت مشتری.
            </p>

            <p className="mt-6 text-sm lg:text-base text-description font-medium">
                بوف استور | خرید مطمئن، کالای اورجینال
            </p>
            <p className="mt-2 text-sm lg:text-base text-description">
                از اعتماد و همراهی شما سپاسگزاریم. بوف استور همواره کنار شماست.
            </p>
        </div>
    )
}
