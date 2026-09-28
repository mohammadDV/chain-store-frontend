import samplePost from "@/assets/images/post-sample.jpg";
import { absoluteImageUrl, absoluteUrl, stripHtml } from "@/lib/seo/absoluteUrl";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { Breadcrumbs } from "@/lib/seo/Breadcrumbs";
import { JsonLd } from "@/lib/seo/JsonLd";
import { blogPostingJsonLd, breadcrumbListJsonLd } from "@/lib/seo/schema";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { createFileUrl } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import { TopNavActions } from "../../_components/topNavigation/TopNavActions";
import { getPost } from "../_api/getPost";

interface PostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({
    params,
}: PostPageProps): Promise<Metadata> {
    const { slug } = await params;
    try {
        const post = await getPost(slug);
        const path = `/post/${post.slug || post.id}`;
        return buildMetadata({
            title: post.meta_title || post.title,
            description: post.meta_description || post.summary,
            path,
            image: post.og_image || post.image,
            keywords: post.meta_keywords,
            type: "article",
        });
    } catch {
        return buildMetadata({
            title: "مقاله",
            path: `/post/${slug}`,
        });
    }
}

export default async function Post({ params }: PostPageProps) {
    const isMobile = await isMobileDevice();
    const resolvedParams = await params;
    const postData = await getPost(resolvedParams.slug);
    const postSlug = postData.slug || String(postData.id);

    const breadcrumbItems = [
        { label: "بوف استور", href: "/" },
        { label: "وبلاگ", href: "/blog" },
        { label: postData.title },
    ];

    return (
        <>
            <JsonLd
                data={[
                    blogPostingJsonLd({
                        title: postData.title,
                        description:
                            postData.meta_description ||
                            postData.summary ||
                            stripHtml(postData.content).slice(0, 160),
                        image: absoluteImageUrl(postData.og_image || postData.image),
                        url: absoluteUrl(`/post/${postSlug}`),
                        datePublished: postData.created_at,
                    }),
                    breadcrumbListJsonLd(breadcrumbItems),
                ]}
            />
            {isMobile && <TopNavActions title={"وبلاگ"} />}
            <div className="lg:max-w-5xl mx-auto mt-6 lg:mt-10 text-center px-4 lg:px-0">
                <Breadcrumbs
                    items={breadcrumbItems}
                    className="justify-center mb-4"
                />
                <div className="mx-auto inline-block bg-surface px-4 py-1 rounded-full text-sm text-secondary">
                    {postData.pre_title || "اخبار و مقالات"}
                </div>
                <h1 className="text-lg lg:text-3xl font-bold text-center my-3 lg:my-5">
                    {postData.title}
                </h1>
                <div className="flex items-center justify-center gap-3 lg:gap-5">
                    <p className="text-muted text-xs lg:text-base">
                        بازدید: {postData.view}
                    </p>
                    <span className="text-border">|</span>
                    <p className="text-muted text-xs lg:text-base">
                        تاریخ: {postData.created_at}
                    </p>
                </div>
                <Image
                    src={postData.image ? createFileUrl(postData.image) : samplePost}
                    alt={postData.title}
                    width={1024}
                    height={460}
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="w-full object-cover h-44 lg:h-[460px] mt-4 lg:mt-8 rounded-2xl lg:rounded-3xl"
                />
            </div>
            <div className="lg:max-w-3xl mx-auto px-4 lg:px-0 mt-4 lg:mt-9">
                <div
                    className="text-description text-sm lg:text-base leading-7"
                    dangerouslySetInnerHTML={{ __html: postData.content }}
                />
            </div>
        </>
    );
}
