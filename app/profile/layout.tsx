import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { ProfileSidebar } from "./_components/sidebar";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { getUserData } from "@/lib/getUserDataFromHeaders";
import { MobileHeader } from "../_components/header/MobileHeader";

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
            <div className="mt-4 lg:mt-9 md:flex justify-between items-start mx-auto gap-8 container">
                {!isMobile && <ProfileSidebar />}
                <div className="flex-1">
                    {children}
                </div>
            </div>
            {!isMobile && <Footer />}
        </>
    )
}