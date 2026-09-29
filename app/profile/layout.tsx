import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getUserData } from "@/lib/getUserDataFromHeaders";
import type { Metadata } from "next";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { ProfileSidebar } from "./_components/sidebar";
import { BottomNavigation } from "../_components/bottomNavigation";
import { getPagesNav } from "@/lib/pages/getPage";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default async function ProfileLayout({
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
            <div className="lg:mt-9 md:flex justify-between items-start mx-auto gap-8 container">
                {!isMobile && <ProfileSidebar userData={userData} />}
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>
            {!isMobile && <Footer />}
            {isMobile && <BottomNavigation />}
        </>
    )
}
