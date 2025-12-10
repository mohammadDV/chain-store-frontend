import { RegisterForm } from "./_components/RegisterForm";

export default async function RegisterPage() {
    return (
        <>
            <h1 className="text-title text-xl lg:text-3xl font-bold mb-2 lg:mb-4">
                ثبت نام در وبسایت
            </h1>
            <p className="text-sm lg:text-base text-muted mb-6">
                از دیدن شما خوشحالم! لطفا با حساب کاربری خود ثبت نام کنید.
            </p>
            <RegisterForm />
        </>
    )
}