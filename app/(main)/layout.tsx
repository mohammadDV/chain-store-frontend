import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import "swiper/css";
import "swiper/css/pagination";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { MobileHeader } from "../_components/header/MobileHeader";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = await isMobileDevice();

    return (
        <>
            {isMobile ? <MobileHeader /> : <Header />}
            {children}
            <Footer />
        </>
    );
}