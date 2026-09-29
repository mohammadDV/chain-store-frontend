import { buildMetadata } from "@/lib/seo/buildMetadata";
import { createFileUrl } from "@/lib/utils";
import { getPage } from "@/lib/pages/getPage";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    return buildMetadata({
      title: "صفحه",
      path: `/pages/${slug}`,
    });
  }

  return buildMetadata({
    title: page.meta_title || page.title,
    description: page.meta_description || undefined,
    path: `/pages/${page.slug}`,
    image: page.image || undefined,
  });
}

export default async function CmsPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 lg:mt-16 px-4 lg:px-0">
      <h1 className="text-lg lg:text-3xl font-bold text-title text-center">
        {page.title}
      </h1>

      {page.image ? (
        <div className="mt-6 lg:mt-10 flex justify-center">
          <Image
            src={createFileUrl(page.image)}
            alt={page.title}
            width={1024}
            height={460}
            className="w-full rounded-xl object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      ) : null}

      {page.content ? (
        <div
          className="mt-6 text-sm lg:text-base text-description leading-7 [&_h2]:mt-6 [&_h2]:font-bold [&_h2]:text-title [&_h2]:text-base [&_h2]:lg:text-xl [&_ul]:list-disc [&_ul]:pr-5 [&_ul]:space-y-1 [&_a]:text-secondary"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      ) : null}
    </div>
  );
}
