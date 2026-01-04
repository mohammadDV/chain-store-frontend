import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getUserData } from "@/lib/getUserDataFromHeaders";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { ProfileSidebar } from "./_components/sidebar";
import { BottomNavigation } from "../_components/bottomNavigation";

export default async function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = await isMobileDevice();
    const userData = await getUserData();

    return (
        <>
            {!isMobile && <Header userData={userData} />}
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