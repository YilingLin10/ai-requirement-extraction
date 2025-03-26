import { privateRoutes } from "./routes"
import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { env } from "process"

const { auth } = NextAuth(authConfig)
export default auth(async (req) => {
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;
    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
    const isAuthRoute = nextUrl.pathname.includes("/sign-in") || nextUrl.pathname.includes("/sign-up");
    const isApiRoute = nextUrl.pathname.includes("/api");
    if (isApiRoute || (!isLoggedIn && isAuthRoute)) {
        return;
    }
    
    if (isLoggedIn && isAuthRoute) {
        return Response.redirect(`${env.BASE_URL}/get-started`);
    }

    if (isPrivateRoute && !isLoggedIn) {
        return Response.redirect(`${env.BASE_URL}/sign-in`);
    }
})

// don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}