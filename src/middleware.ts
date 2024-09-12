import { clerkMiddleware } from "@clerk/nextjs/server";
import { createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard", "/product"]);
const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up", "/"]);

const isPublicApiRoute = createRouteMatcher(["/api/webhook/clerk"])

export default clerkMiddleware((auth, req: NextRequest) => {
    const { userId } = auth();

    if (!userId && isProtectedRoute(req)) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if (userId && isPublicRoute(req)) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
