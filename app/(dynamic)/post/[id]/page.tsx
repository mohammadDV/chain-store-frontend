import samplePost from "@/assets/images/post-sample.jpg";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { createFileUrl } from "@/lib/utils";
import Image from "next/image";
import { TopNavActions } from "../../_components/topNavigation/TopNavActions";
import { getPost } from "../_api/getPost";

interface PostPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function Post({ params }: PostPageProps) {
    const isMobile = await isMobileDevice();
    const resolvedParams = await params;
    const postData = await getPost(resolvedParams.id);

    return (
        <>
            {isMobile && <TopNavActions title={"وبلاگ"} />}
            <div className="lg:max-w-5xl mx-auto mt-6 lg:mt-10 text-center px-4 lg:px-0">
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
    )
}
