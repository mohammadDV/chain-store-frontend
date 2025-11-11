import { estedadFont } from "@/constants/localfont";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata: Metadata = {
  title: "بوف استور | بزرگترین مرجع لوازم ورزشی",
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
      </body>
    </html>
  );
}
