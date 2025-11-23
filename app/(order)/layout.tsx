import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";

export default async function OrderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = await isMobileDevice();

    return (
        <>
            {!isMobile && <Header />}
            {children}
            {!isMobile && <Footer />}
        </>
    );
}
