import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body: { secret?: string; tags?: string[] };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || body.secret !== secret) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const tags = Array.isArray(body.tags)
    ? body.tags.filter((tag): tag is string => typeof tag === "string" && tag.length > 0)
    : [];

  if (tags.length === 0) {
    return NextResponse.json({ message: "No tags" }, { status: 400 });
  }

  for (const tag of tags) {
    revalidateTag(tag, { expire: 0 });
  }

  return NextResponse.json({ revalidated: true, tags });
}
