import { getFetch } from "@/core/publicService";
import type { Post } from "@/types/post.type";

export async function getPost(slug: string): Promise<Post> {
  return getFetch<Post>(`/post/${slug}`, { revalidate: 3600 });
}

