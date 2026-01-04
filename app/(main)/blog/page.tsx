import samplePost from "@/assets/images/sample-post.jpg";
import { Pagination } from "@/app/_components/pagination";
import { getPosts } from "./_api/getPosts";
import { createFileUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Blog({
    searchParams,
}: {
    searchParams?: { page?: string };
}) {
    const page = Math.max(1, Number(searchParams?.page ?? 1) || 1);
    const postsData = await getPosts({ page });
    const posts = postsData.data ?? [];

    return (
        <>
            <h1 className="text-center text-title text-xl lg:text-3xl font-bold mt-6 lg:mt-14">
                وبلاگ بوف استور
            </h1>
            <div className="lg:max-w-6xl mx-auto mt-4 lg:mt-6 px-4 lg:px-0">
                {posts.length === 0 ? (
                    <p className="text-sm text-description text-center py-10">موردی جهت نمایش وجود ندارد.</p>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
                        {posts.map((post) => (
                            <div key={post.id} className="bg-surface p-4 rounded-3xl">
                                <Image
                                    src={post.image ? createFileUrl(post.image) : samplePost}
                                    alt={post.title}
                                    width={420}
                                    height={220}
                                    className="w-full h-44 object-cover rounded-2xl"
                                />
                                <h3 className="lg:text-lg text-title font-semibold mt-3 line-clamp-1">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-description mt-1.5 leading-6 line-clamp-2">
                                    {post.summary}
                                </p>
                                <Link href={`/post/${post.id}`} className="inline-block mt-3 text-secondary text-sm underline">
                                    مشاهده بیشتر
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                {posts.length > 0 && postsData.total > postsData.per_page && (
                    <div className="mt-10">
                        <Pagination
                            currentPage={postsData.current_page}
                            lastPage={postsData.last_page}
                            links={postsData.links}
                            total={postsData.total}
                            routeUrl="/blog"
                        />
                    </div>
                )}
            </div>
        </>
    )
}
