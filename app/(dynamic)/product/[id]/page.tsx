import { ProductGallery } from "@/app/(dynamic)/_components/productGallery";
import ProductCard from "@/app/_components/cards/ProductCard";
import { Carousel } from "@/app/_components/carousel";
import seven24Icon from "@/assets/images/724.svg";
import avatar from "@/assets/images/avatar.svg";
import barcodeIcon from "@/assets/images/barcode.svg";
import boxIcon from "@/assets/images/box.svg";
import checkIcon from "@/assets/images/check-box.svg";
import truckIcon from "@/assets/images/truck.svg";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { putCommas } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/ui/accordion";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { Progress } from "@/ui/progress";
import Image from "next/image";
import Link from "next/link";
import { TopNavActions } from "../../_components/topNavigation/TopNavActions";
import { getProduct } from "../_api/getProduct";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Product({ params }: ProductPageProps) {
  const isMobile = await isMobileDevice();
  const resolvedParams = await params;

  const productData = await getProduct(resolvedParams.id);

  const productImages = [
    productData.product.image,
    ...productData.product.files.map((file) => file.path),
  ];

  const hasDiscount = (productData.product.discount || 0) > 0;
  const finalAmount = Math.round(
    productData.product.amount * (1 - (productData.product.discount || 0) / 100)
  );

  return (
    <>
      {isMobile && <TopNavActions title={productData.product.title} />}
      <div className="container mx-auto px-4 lg:px-0 mt-6 lg:mt-8">
        <p className="text-xs lg:text-sm text-muted">
          <Link href="/" className="text-secondary mr-1">بوف استور</Link>
          {" / "}
          <Link href="/shop" className="text-secondary mr-1">فروشگاه</Link>
          {productData.product.categories?.[0] && (
            <>
              {" / "}
              <Link
                href={`/shop/${productData.product.categories[0].id}`}
                className="text-secondary mr-1"
              >
                {productData.product.categories[0].title}
              </Link>
            </>
          )}
          {" / "}
          <span className="mr-1">{productData.product.title}</span>
        </p>
        <div className="mt-4 lg:mt-5 flex flex-col lg:flex-row justify-between gap-4 lg:gap-12">
          <ProductGallery images={productImages} />
          <div className="lg:w-1/2">
            <div className="flex items-center justify-between mt-2.5 lg:mt-4">
              <div className="flex items-center gap-3">
                <p className="text-description text-sm">
                  دسته بندی:
                  <Link
                    href={`/shop/${productData.product.categories?.[0]?.id}`}
                    className="text-secondary mr-1"
                  >
                    {productData.product.categories?.[0]?.title}
                  </Link>
                </p>
                <div className="w-px h-4 block bg-border"></div>
                <p className="text-description text-sm">
                  برند:
                  <Link
                    href={`/shop/${productData.product.brand_id}`}
                    className="text-secondary mr-1"
                  >
                    {productData.product.brand_id}
                  </Link>
                </p>
              </div>
              <div className="flex lg:hidden gap-3">
                <Icon
                  icon="solar--heart-linear"
                  sizeClass="size-4.5"
                  className="text-description"
                />
                <Icon
                  icon="solar--share-circle-outline"
                  sizeClass="size-4.5"
                  className="text-description"
                />
                <Icon
                  icon="solar--copy-outline"
                  sizeClass="size-4.5"
                  className="text-description"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-2.5 lg:mt-4">
              <h1 className="text-lg lg:text-2xl font-bold text-title">
                {productData.product.title}
              </h1>
              <div className="flex items-center justify-center bg-success rounded-full py-1 px-3 text-xs text-white">
                ضمانت اصل بودن کالا
              </div>
            </div>
            <div className="mt-3 lg:mt-4 flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon
                    key={i}
                    icon={
                      i < productData.product.rate
                        ? "solar--star-bold"
                        : "solar--star-outline"
                    }
                    sizeClass="size-5"
                    className="text-warning"
                  />
                ))}
              </div>
              <p className="text-xs text-description">
                {productData.product.rate} (از{" "}
                {productData.product.reviews_count} نظر ثبت شده)
              </p>
            </div>
            <div className="mt-6 lg:mt-8">
              {hasDiscount && (
                <div className="flex items-center gap-2.5">
                  <del className="text-disabled lg:text-lg">
                    {putCommas(productData.product.amount)}
                  </del>
                  <div className="bg-secondary py-0.5 px-3 rounded-sm text-white text-sm flex items-center justify-center">
                    {productData.product.discount} %
                  </div>
                </div>
              )}
              <p className="text-secondary text-xl lg:text-2xl font-bold mt-2">
                {putCommas(finalAmount)} تومان
              </p>
            </div>
            <div className="mt-6 lg:mt-8">
              <p className="text-title font-medium mb-3">ویژگی های این محصول</p>
              <div className="flex gap-3 overflow-x-auto px-1 sm:grid sm:grid-cols-4 sm:overflow-visible">
                {Array.from({ length: 4 }, (_, i) => (
                  <div
                    key={i}
                    className="min-w-[140px] p-2.5 rounded-lg bg-surface shrink-0"
                  >
                    <p className="text-xs text-muted">رنگبندی ها</p>
                    <p className="text-title text-xs font-medium mt-1">
                      طوسی، سفید، مشکی
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 lg:mt-8">
              <p className="text-title text-sm font-medium mb-2">انتخاب سایز</p>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="size-9 flex items-center justify-center rounded-md bg-surface text-secondary">
                  S
                </div>
                <div className="size-9 flex items-center justify-center rounded-md bg-surface text-secondary">
                  M
                </div>
                <div className="size-9 flex items-center justify-center rounded-md bg-secondary text-white">
                  L
                </div>
                <div className="size-9 flex items-center justify-center rounded-md bg-surface text-secondary">
                  XL
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-5">
              <p className="text-title text-sm font-medium mb-2">انتخاب رنگ</p>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="size-9 flex items-center justify-center p-1 rounded-md bg-surface text-secondary">
                  <div className="bg-white h-full w-full rounded-sm"></div>
                </div>
                <div className="size-9 flex items-center justify-center p-1 rounded-md bg-surface text-secondary">
                  <div className="bg-[#DBDADA] h-full w-full rounded-sm"></div>
                </div>
                <div className="size-9 flex items-center justify-center p-1 rounded-md bg-surface text-secondary">
                  <div className="bg-primary h-full w-full rounded-sm"></div>
                </div>
                <div className="size-9 flex items-center justify-center p-1 rounded-md bg-surface text-secondary">
                  <div className="bg-[#D9C492] h-full w-full rounded-sm"></div>
                </div>
              </div>
            </div>
            <div className="lg:mt-6 fixed lg:static left-4 right-4 z-20 bottom-2 flex items-center justify-between gap-2 lg:gap-5">
              <Button variant={"primary"} size={"large"} className="flex-1">
                افزودن به سبد خرید
              </Button>
              <div className="bg-surface rounded-full p-1.5 flex items-center justify-between gap-4 lg:gap-10">
                <div className="size-11 bg-white rounded-full flex items-center justify-center">
                  <Icon
                    icon="lucide--plus"
                    sizeClass="size-5"
                    className="text-secondary"
                  />
                </div>
                <p className="text-xl font-medium text-title">1</p>
                <div className="size-11 bg-white rounded-full flex items-center justify-center">
                  <Icon
                    icon="lucide--minus"
                    sizeClass="size-5"
                    className="text-secondary"
                  />
                </div>
              </div>
            </div>
            <div className="hidden mt-8 lg:flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm text-description">افزودن به علاقه مندی</p>
                <Icon
                  icon="solar--heart-linear"
                  sizeClass="size-4"
                  className="text-description"
                />
              </div>
              <div className="w-px h-4 block bg-border"></div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-description">اشتراک گذاری</p>
                <Icon
                  icon="solar--share-circle-outline"
                  sizeClass="size-4"
                  className="text-description"
                />
              </div>
              <div className="w-px h-4 block bg-border"></div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-description">کپی شناسه محصول</p>
                <Icon
                  icon="solar--copy-outline"
                  sizeClass="size-4"
                  className="text-description"
                />
              </div>
            </div>

            <div className="mt-6 lg:mt-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="description">
                  <AccordionTrigger>توضیحات محصول</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-description leading-6">
                      {productData.product.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="specs">
                  <AccordionTrigger>مشخصات کالا</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-muted">جنس</p>
                        <p className="text-xs text-title font-medium">
                          پلی‌استر
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted">وزن</p>
                        <p className="text-xs text-title font-medium">
                          450 گرم
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted">کشور سازنده</p>
                        <p className="text-xs text-title font-medium">ایران</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted">گارانتی</p>
                        <p className="text-xs text-title font-medium">
                          یک‌ساله
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="delivery">
                  <AccordionTrigger>شرایط تحویل و بازگشت کالا</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pr-5 text-sm text-description space-y-2">
                      <li>ارسال ۲۴ تا ۷۲ ساعته در سراسر کشور</li>
                      <li>بازگشت کالا تا ۷ روز در صورت عدم رضایت</li>
                      <li>تعویض سایز رایگان برای یک‌بار</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <div className="hidden border-y py-6 lg:flex items-center justify-around mt-12">
          <div className="flex items-center gap-2.5">
            <Image src={truckIcon} alt="truck icon" width={43} height={43} />
            <div className="flex flex-col gap-1">
              <p className="text-sm text-title font-medium">
                امکان تحویل اکسپرس
              </p>
              <p className="text-xs text-description">سرعت ارسال بالا</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Image src={seven24Icon} alt="truck icon" width={43} height={43} />
            <div className="flex flex-col gap-1">
              <p className="text-sm text-title font-medium">ضمانت بازگشت وجه</p>
              <p className="text-xs text-description">با خیال راحت خرید کنید</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Image src={boxIcon} alt="truck icon" width={43} height={43} />
            <div className="flex flex-col gap-1">
              <p className="text-sm text-title font-medium">بسته بندی مطمئن</p>
              <p className="text-xs text-description">بسته بندی با کیفت</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Image src={barcodeIcon} alt="truck icon" width={43} height={43} />
            <div className="flex flex-col gap-1">
              <p className="text-sm text-title font-medium">
                ضمانت اصل بودن کالا
              </p>
              <p className="text-xs text-description">محصولات با اصالت</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Image src={checkIcon} alt="truck icon" width={43} height={43} />
            <div className="flex flex-col gap-1">
              <p className="text-sm text-title font-medium">خدمات پس از فروش</p>
              <p className="text-xs text-description">فروش پایان کار نیست</p>
            </div>
          </div>
        </div>
        <div className="mt-6 lg:mt-12">
          <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-5">
            نظرات کاربران درباره این محصول
          </h3>
          <div className="flex justify-between gap-12">
            <div className="flex gap-4 overflow-x-auto pb-2 lg:w-2/3 lg:flex-col lg:overflow-visible">
              {productData.reviews.map((review, index) => (
                <div
                  key={index}
                  className="max-w-[260px] lg:max-w-full p-3 lg:p-4 bg-surface rounded-2xl shrink-0"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Image src={avatar} alt="avatar" width={42} height={42} />
                      <p className="text-xs lg:text-sm text-title">
                        کاربر بوف استور
                      </p>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Icon
                            key={i}
                            icon={
                              i < review.rate
                                ? "solar--star-bold"
                                : "solar--star-outline"
                            }
                            sizeClass="size-4"
                            className="text-warning"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-description">12 مهر 1404</p>
                  </div>

                  <p className="text-sm text-description mt-3 leading-6">
                    {review.title}
                  </p>
                </div>
              ))}
            </div>

            <div className="hidden lg:block lg:w-1/3">
              <p className="text-title mb-4">
                نظر شما برای ما بسیار ارزشمند است!
              </p>
              <div className="flex items-center justify-between gap-8">
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center justify-between gap-3 flex-1">
                    <p className="text-title">5</p>
                    <Progress value={75} />
                  </div>
                  <div className="flex items-center justify-between gap-3 flex-1">
                    <p className="text-title">4</p>
                    <Progress value={50} />
                  </div>
                  <div className="flex items-center justify-between gap-3 flex-1">
                    <p className="text-title">3</p>
                    <Progress value={25} />
                  </div>
                  <div className="flex items-center justify-between gap-3 flex-1">
                    <p className="text-title">2</p>
                    <Progress value={10} />
                  </div>
                  <div className="flex items-center justify-between gap-3 flex-1">
                    <p className="text-title">2</p>
                    <Progress value={25} />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-3xl text-secondary font-bold">4.75</p>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Icon
                        key={index}
                        icon="solar--star-bold"
                        sizeClass="size-5"
                        className="text-warning"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-description">از 26 نظر</p>
                </div>
              </div>
              <Button
                variant={"outline"}
                size={"medium"}
                className="w-full mt-8"
              >
                نظر خود را بنویسید
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4 lg:mt-12 -mr-4 lg:mr-0">
          <Carousel
            slides={productData.related_products.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
            desktopSlidesPerView={4}
            mobileSlidesPerView={2.5}
            title="پیشنهادات شگفت انگیز"
          />
        </div>
      </div>
    </>
  );
}
