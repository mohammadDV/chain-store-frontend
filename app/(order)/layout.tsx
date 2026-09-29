import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { getUserData } from "@/lib/getUserDataFromHeaders";
import { getPagesNav } from "@/lib/pages/getPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default async function OrderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = await isMobileDevice();
    const userData = await getUserData();
    const menuPages = await getPagesNav();

    return (
        <>
            {!isMobile && <Header userData={userData} menuPages={menuPages} />}
            {children}
            {!isMobile && <Footer />}
        </>
    );
}
