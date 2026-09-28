import { NextRequest, NextResponse } from "next/server";
import { regex } from "./constants/regex";
import { getApiUrl } from "./configs/global";

type SeoRedirect = {
    from_path: string;
    to_path: string;
    status_code: number;
};

let redirectsCache: { expires: number; items: SeoRedirect[] } | null = null;

async function loadSeoRedirects(): Promise<SeoRedirect[]> {
    const now = Date.now();
    if (redirectsCache && redirectsCache.expires > now) {
        return redirectsCache.items;
    }

    try {
        const res = await fetch(`${getApiUrl()}/seo/redirects`, {
            next: { revalidate: 300 },
        });
        if (!res.ok) {
            return redirectsCache?.items || [];
        }
        const json = await res.json();
        const items = (json?.data || []) as SeoRedirect[];
        redirectsCache = {
            expires: now + 5 * 60 * 1000,
            items,
        };
        return items;
    } catch {
        return redirectsCache?.items || [];
    }
}

export async function proxy(request: NextRequest) {
    const userAgent = request.headers.get("user-agent") || "";
    const isMobile = regex.mobileDevice.test(userAgent);

    const token = request.cookies.get("token")?.value;
    const userData = request.cookies.get("userData")?.value;
    const pathname = request.nextUrl.pathname;

    const redirects = await loadSeoRedirects();
    const matched = redirects.find((item) => item.from_path === pathname);
    if (matched) {
        const url = request.nextUrl.clone();
        url.pathname = matched.to_path;
        return NextResponse.redirect(url, matched.status_code || 301);
    }

    const isProfilePath =
        pathname === "/profile" ||
        pathname.startsWith("/profile/");

    const isAuthPath =
        pathname === "/auth/login" ||
        pathname === "/auth/register";

    const isVerificationPath =
        pathname === "/auth/check-verification";

    const isCompleteRegisterPath =
        pathname === "/auth/complete-register";

    const isCheckoutPath =
        pathname.startsWith("/checkout/");

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
