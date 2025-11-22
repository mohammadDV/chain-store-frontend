import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";

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
