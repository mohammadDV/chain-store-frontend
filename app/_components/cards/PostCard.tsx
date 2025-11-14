import Image from "next/image";
import Link from "next/link";
import samplePost from "@/assets/images/sample-post.jpg";

export const PostCard = () => {
    return (
        <Link
            href={`/`}
            className={"group relative block overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer"}
        >
            <div className="w-full h-full">
                <Image
                    src={samplePost}
                    alt={""}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="absolute bottom-0 left-0 w-full h-full bg-linear-to-t from-title/90 to-transparent"></div>

            <span className="absolute top-5 right-5 inline-block bg-secondary text-white text-xs px-3 py-1 rounded-md">
                اخبار و مقالات
            </span>

            <div className="absolute bottom-0 left-0 w-full p-4 lg:p-6 text-white">
                <h3 className="mt-3 text-lg lg:text-xl font-semibold line-clamp-2 text-center">
                    چگونه استایل بهتری داشته باشم؟
                </h3>
                <p className="mt-3 text-sm text-center">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ...
                </p>
            </div>
        </Link>
    );
};