import { estedadFont } from "@/constants/localfont";
import { DEFAULT_DESCRIPTION } from "@/lib/seo/buildMetadata";
import { getSiteUrl } from "@/lib/seo/absoluteUrl";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "../assets/icons/solar.css";
import "../assets/icons/others.css";
import "./globals.css";
import { Toaster } from "@/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "بوف استور | بزرگترین مرجع لوازم ورزشی",
    template: "%s | بوف استور",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    siteName: "بوف استور",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={estedadFont.className}>
        <NextTopLoader color="#FF385C" />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
