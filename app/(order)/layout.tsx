import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { getUserData } from "@/lib/getUserDataFromHeaders";
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

    return (
        <>
            {!isMobile && <Header userData={userData} />}
            {children}
            {!isMobile && <Footer />}
        </>
    );
}
