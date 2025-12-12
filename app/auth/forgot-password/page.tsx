import { ForgotPasswordForm } from "./_components/ForgotPasswordForm";

export default async function ForgotPasswordPage() {
  return (
    <>
      <h1 className="text-title text-xl lg:text-3xl font-bold mb-2 lg:mb-4">
        فراموشی رمز عبور
      </h1>
      <p className="text-sm lg:text-base text-muted mb-6">
        برای بازیابی رمز عبور، ایمیل خود را وارد کنید.
      </p>
      <ForgotPasswordForm />
    </>
  );
}
