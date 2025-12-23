import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { TopNavProfile } from "../_components/topNavigation/TopNavProfile";
import { Badge } from "@/ui/badge";
import { Icon } from "@/ui/icon";
import { Pagination } from "@/app/_components/pagination";
import Link from "next/link";
import { createFileUrl, putCommas } from "@/lib/utils";
import Image from "next/image";
import { getMyReviews } from "./_api/getMyReviews";
import type { MyReview } from "@/types/review.type";

const getStatusVariant = (status: MyReview["status"]) => {
    if (status === "approved") return "success";
    if (status === "cancelled") return "error";
    return "warning";
};

const getStatusLabel = (status: MyReview["status"]) => {
    if (status === "approved") return "تایید شده";
    if (status === "cancelled") return "رد شده";
    return "در حال بررسی...";
};

export default async function ReviewsPage({
    searchParams,
}: {
    searchParams?: { page?: string };
}) {
    const isMobile = await isMobileDevice();
    const page = Math.max(1, Number(searchParams?.page ?? 1) || 1);
    const reviewsData = await getMyReviews({ page });
    const reviews = reviewsData.data ?? [];

    return (
        <>
            {isMobile && <TopNavProfile title="نظرات من" />}

            <div className="p-2 border border-border rounded-xl mx-4 lg:mx-0 mt-3 lg:mt-0">
                <div className="bg-surface px-3 py-2 rounded-lg flex items-center justify-between">
                    <p className="text-title font-medium">نظرات من</p>
                </div>
                {reviews.length === 0 ? (
                    <p className="text-sm text-description text-center py-8">موردی جهت نمایش وجود ندارد.</p>
                ) : (
                    <div className="mt-2 flex flex-col gap-2">
                        {reviews.map((review) => {
                            const productTitle = review.product?.title ?? `محصول شماره ${review.product_id}`;
                            const rawAmount = review.product?.amount || "";
                            const parsedAmount = typeof rawAmount === "string"
                                ? Number(rawAmount.replace(/,/g, ""))
                                : typeof rawAmount === "number"
                                    ? rawAmount
                                    : null;
                            const productAmount = Number.isFinite(parsedAmount as number)
                                ? `${putCommas(parsedAmount as number)} تومان`
                                : null;
                            const productImage = review.product?.image;

                            return (
                                <div key={review.id} className="bg-surface p-3 rounded-xl">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            {productImage ? (
                                                <Image
                                                    src={createFileUrl(productImage)}
                                                    alt={productTitle}
                                                    width={64}
                                                    height={64}
                                                    className="size-16 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="size-16 rounded-lg bg-border flex items-center justify-center">
                                                    <Icon icon="solar--box-minimalistic-linear" sizeClass="size-7" className="text-description" />
                                                </div>
                                            )}
                                            <div className="flex flex-col gap-2.5">
                                                <Link href={`/product/${review.product_id}`} className="text-sm text-title line-clamp-1">
                                                    {productTitle}
                                                </Link>
                                                {productAmount && (
                                                    <p className="text-xs text-description">
                                                        {productAmount}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end gap-4">
                                            <Badge variant={getStatusVariant(review.status)}>
                                                {getStatusLabel(review.status)}
                                            </Badge>
                                            {/* <div className="size-9 border border-border rounded-md flex items-center justify-center opacity-50">
                                                <Icon icon="solar--trash-bin-trash-bold" sizeClass="size-5" className="text-secondary" />
                                            </div> */}
                                        </div>
                                    </div>
                                    <hr className="mt-3 mb-4 border-t border-border" />
                                    <div className="flex items-center justify-between gap-4 mb-1">
                                        <p className="text-sm text-title flex-1">
                                            {review.comment}
                                        </p>
                                        <div className="flex items-center gap-0.5 shrink-0">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <Icon
                                                    key={i}
                                                    icon={i < review.rate ? "solar--star-bold" : "solar--star-outline"}
                                                    sizeClass="size-5"
                                                    className="text-warning"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {reviews.length > 0 && reviewsData.total > reviewsData.per_page && (
                    <div className="mt-8">
                        <Pagination
                            currentPage={reviewsData.current_page}
                            lastPage={reviewsData.last_page}
                            links={reviewsData.links}
                            total={reviewsData.total}
                            routeUrl="/profile/reviews"
                        />
                    </div>
                )}
            </div>
        </>
    )
}
