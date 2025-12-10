import { CompleteRegister } from "./_components/CompleteRegister";

export default async function LoginPage() {
    return (
        <>
            <h1 className="text-title text-xl lg:text-3xl font-bold mb-2 lg:mb-4">
                تکمیل پروفایل
            </h1>
            <p className="text-sm lg:text-base text-muted mb-6">
                لطفا پروفایل خود را تکمیل نمایید.
            </p>
            <CompleteRegister />
        </>
    )
}