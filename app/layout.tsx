import { estedadFont } from "@/constants/localfont";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "../assets/icons/solar.css";
import "../assets/icons/others.css";
import "./globals.css";
import { Toaster } from "@/ui/sonner";

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
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
