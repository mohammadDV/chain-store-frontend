import { NextRequest, NextResponse } from "next/server";
import { regex } from "./constants/regex";

export function proxy(request: NextRequest) {
    const userAgent = request.headers.get("user-agent") || "";
    const isMobile = regex.mobileDevice.test(userAgent);

    const token = request.cookies.get("token")?.value;
    const userData = request.cookies.get("userData")?.value;

    const isProfilePath =
        request.nextUrl.pathname === "/profile" ||
        request.nextUrl.pathname.startsWith("/profile/");

    const isAuthPath =
        request.nextUrl.pathname === "/auth/login" ||
        request.nextUrl.pathname === "/auth/register";

    const isVerificationPath =
        request.nextUrl.pathname === "/auth/check-verification";

    const isCompleteRegisterPath =
        request.nextUrl.pathname === "/auth/complete-register";

    const isCheckoutPath =
        request.nextUrl.pathname.startsWith("/checkout/");

    if (isAuthPath && token) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    if ((isCompleteRegisterPath || isVerificationPath) && !token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (isCheckoutPath && !token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (isProfilePath) {
        if (!token) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        if (token && !userData) {
            return NextResponse.redirect(
                new URL("/auth/check-verification", request.url)
            );
        }

        if (userData) {
            try {
                const parsedUserData = JSON.parse(userData);
                if (typeof parsedUserData !== "object" || parsedUserData === null) {
                    return NextResponse.redirect(
                        new URL("/auth/check-verification", request.url)
                    );
                }
                if (!parsedUserData?.verify_email) {
                    return NextResponse.redirect(
                        new URL("/auth/check-verification", request.url)
                    );
                }
                if (!parsedUserData?.verify_access) {
                    return NextResponse.redirect(
                        new URL("/auth/complete-register", request.url)
                    );
                }
            } catch (error) {
                return NextResponse.redirect(
                    new URL("/auth/check-verification", request.url)
                );
            }
        }
    }

    const response = NextResponse.next();
    response.headers.set("x-device", isMobile ? "mobile" : "desktop");
    response.headers.set("userData", encodeURIComponent(userData || "") || "");
    return response;
}

export const config = {
    matcher: ["/", "/(app|dashboard|.*)"],
};