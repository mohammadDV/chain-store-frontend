import LoginForm from "./_components/LoginForm";

export default async function LoginPage() {
    return (
        <>
            <h1 className="text-title text-xl lg:text-3xl font-bold mb-2 lg:mb-4">
                ورود به حساب کاربری
            </h1>
            <p className="text-sm lg:text-base text-muted mb-6">
                از دیدن شما خوشحالم! لطفا با حساب کاربری خود وارد شوید.
            </p>
            <LoginForm />
        </>
    )
}