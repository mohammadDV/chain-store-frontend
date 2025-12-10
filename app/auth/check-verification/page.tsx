import { Suspense } from "react";
import { CheckVerification } from "./_components/CheckVerification";

export default async function CheckVerificationPage() {
    return (
        <Suspense fallback={<></>}>
            <CheckVerification />
        </Suspense>
    )
}