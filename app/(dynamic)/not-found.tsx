import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 lg:py-32 text-center">
      <p className="text-secondary text-6xl lg:text-8xl font-bold">404</p>
      <h1 className="text-xl lg:text-3xl font-bold text-title mt-4">
        صفحه مورد نظر یافت نشد
      </h1>
      <p className="mt-3 text-sm lg:text-base text-description">
        این صفحه وجود ندارد یا دیگر در دسترس نیست.
      </p>
      <Link
        href="/shop"
        className="inline-flex items-center justify-center mt-8 bg-secondary text-white rounded-full px-6 py-[11px]"
      >
        بازگشت به فروشگاه
      </Link>
    </div>
  );
}
