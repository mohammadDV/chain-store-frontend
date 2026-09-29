import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import "swiper/css";
import "swiper/css/pagination";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { MobileHeader } from "../_components/header/MobileHeader";
import { getUserData } from "@/lib/getUserDataFromHeaders";
import { BottomNavigation } from "../_components/bottomNavigation";
import { getPagesNav } from "@/lib/pages/getPage";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = await isMobileDevice();
    const userData = await getUserData();
    const menuPages = await getPagesNav();

    return (
        <>
            {isMobile ? <MobileHeader /> : <Header userData={userData} menuPages={menuPages} />}
            {children}
            <Footer />
            {isMobile && <BottomNavigation />}
        </>
    );
}
