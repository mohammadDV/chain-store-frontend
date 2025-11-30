import { createFileUrl } from "@/lib/utils";
import { Post } from "@/types/post.type";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
    data: Post
}

export const PostCard = ({ data }: PostCardProps) => {
    return (
        <Link
            href={`/post/${data.id}`}
            className="group relative block overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer aspect-3/2"
        >
            <div className="w-full h-full">
                <Image
                    src={createFileUrl(data.image || "")}
                    alt={""}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="absolute bottom-0 left-0 w-full h-full bg-linear-to-t from-title/90 to-transparent"></div>

            <span className="absolute top-3 lg:top-5 right-3 lg:right-5 inline-block bg-secondary text-white text-2xs lg:text-xs px-2 lg:px-3 py-0.5 lg:py-1 rounded-sm lg:rounded-md">
                اخبار و مقالات
            </span>

            <div className="absolute bottom-0 left-0 w-full p-3 lg:p-6 text-white">
                <h3 className="mt-3 text-sm lg:text-xl font-semibold line-clamp-2 text-center">
                    {data.title}
                </h3>
                <p className="mt-1 lg:mt-2 text-2xs lg:text-sm text-center line-clamp-1 leading-6">
                    {data.summary}
                </p>
            </div>
        </Link>
    );
};