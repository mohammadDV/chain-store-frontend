import { NextRequest, NextResponse } from "next/server";
import { regex } from "./constants/regex";

export function proxy(request: NextRequest) {
    const userAgent = request.headers.get("user-agent") || "";
    const isMobile = regex.mobileDevice.test(userAgent);
    const response = NextResponse.next();
    response.headers.set("x-device", isMobile ? "mobile" : "desktop");
    return response;
}

export const config = {
    matcher: ["/", "/(app|dashboard|.*)"],
};