import { getFetch } from "@/core/publicService";
import type { PostsResponse } from "@/types/post.type";

interface GetPostsParams {
  page?: number;
}

export async function getPosts({ page = 1 }: GetPostsParams): Promise<PostsResponse> {
  const searchParams = new URLSearchParams({
    page: page.toString(),
  });

  return getFetch<PostsResponse>(`/posts?${searchParams.toString()}`);
}

