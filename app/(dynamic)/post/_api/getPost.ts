import { getFetch } from "@/core/publicService";
import type { Post } from "@/types/post.type";

export async function getPost(id: string): Promise<Post> {
  return getFetch<Post>(`/post/${id}`);
}

