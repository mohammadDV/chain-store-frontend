import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { TopNavProfile } from "../_components/topNavigation/TopNavProfile";
import { getUserAccount } from "./_api/getUserAccount";
import { AccountForm } from "./_components/AccountForm";

export default async function AccountPage() {
    const isMobile = await isMobileDevice();
    const userAccountData = await getUserAccount();

    return (
        <>
            {isMobile && <TopNavProfile title={"ویرایش پروفایل"} />}
            <div className="lg:max-w-xl mx-auto px-4 lg:px-0 mt-8 lg:mt-0">
                <AccountForm accountData={userAccountData?.user || {}} />
            </div>
        </>
    )
}