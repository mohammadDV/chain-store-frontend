import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import "swiper/css";
import "swiper/css/pagination";

export default async function DynamicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = await isMobileDevice();

    return (
        <>
            {!isMobile && <Header />}
            {children}
            <Footer />
        </>
    );
}