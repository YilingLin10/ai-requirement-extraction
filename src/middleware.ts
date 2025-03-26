import { privateRoutes } from "./routes"
import authConfig from "./auth.config"
import NextAuth from "next-auth"

const baseUrl = "http://localhost:3000"
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
        return Response.redirect(`${baseUrl}/get-started`);
    }

    if (isPrivateRoute && !isLoggedIn) {
        return Response.redirect(`${baseUrl}/sign-in`);
    }
})

// don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}