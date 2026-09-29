import Link from "next/link";
import { getPagesNav, pageHref } from "@/lib/pages/getPage";
import {
  categoryHref,
  getFooterCategories,
} from "@/lib/categories/getFooterCategories";

const fixedPageLinks = [
  { id: "shop", title: "فروشگاه", link: "/shop" },
  { id: "blog", title: "وبلاگ", link: "/blog" },
  { id: "contact", title: "تماس با ما", link: "/contact" },
];

export const Footer = async () => {
  const [pages, categoryColumns] = await Promise.all([
    getPagesNav(),
    getFooterCategories(),
  ]);

  const pageLinks = [
    ...fixedPageLinks,
    ...pages.map((page) => ({
      id: page.slug,
      title: page.title,
      link: pageHref(page.slug),
    })),
  ];

  return (
    <footer className="mt-10 lg:mt-20 mb-4 lg:mb-8 px-4 lg:px-0">
      <div className="container mx-auto bg-primary p-6 lg:p-14 rounded-2xl lg:rounded-3xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-20">
        <div>
          <h4 className="mb-2.5 lg:mb-3.5 text-xs lg:text-lg font-semibold lg:font-bold text-white">
            دسترسی سریع
          </h4>
          <div className="flex flex-col gap-2 lg:gap-3">
            {pageLinks.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="text-2xs lg:text-base text-white font-light"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {categoryColumns.map((column) => (
          <div key={column.slug || column.title}>
            <h4 className="mb-2.5 lg:mb-3.5 text-xs lg:text-lg font-semibold lg:font-bold text-white">
              {column.slug ? (
                <Link href={categoryHref(column.slug)} className="hover:opacity-90">
                  {column.title}
                </Link>
              ) : (
                column.title
              )}
            </h4>
            <div className="flex flex-col gap-2 lg:gap-3">
              {column.links.map((link) => (
                <Link
                  key={`${column.slug}-${link.slug || link.title}`}
                  href={categoryHref(link.slug)}
                  className="text-2xs lg:text-base text-white font-light"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h4 className="mb-2.5 lg:mb-3.5 text-xs lg:text-lg font-semibold lg:font-bold text-white">
            نماد های اعتماد
          </h4>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="bg-surface px-3 lg:px-6 py-3 lg:py-5 mx-8 lg:mx-12 rounded-b-2xl flex flex-col lg:flex-row items-center justify-between">
          <p className="text-title text-center text-xs lg:text-base">
            تمامی حقوق این سایت متعلق به اسپورت ساید می‌باشد.
          </p>
          <p className="text-title text-center text-xs lg:text-base mt-2.5 lg:mt-0">
            ساخته شده با  ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};
