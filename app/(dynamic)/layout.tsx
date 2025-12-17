import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { getUserData } from "@/lib/getUserDataFromHeaders";

export default async function DynamicLayout({
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
            <Footer />
        </>
    );
}
