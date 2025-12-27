import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { TopNavProfile } from "../_components/topNavigation/TopNavProfile";
import { ChangePasswordForm } from "./_components/ChangePasswordForm";

export default async function ChangePasswordPage() {
    const isMobile = await isMobileDevice();

    return (
        <>
            {isMobile && <TopNavProfile title={"تغییر رمز عبور"} />}
            <div className="lg:max-w-xl mx-auto px-4 lg:px-0 mt-8 lg:mt-0">
                <ChangePasswordForm />
            </div>
        </>
    )
}