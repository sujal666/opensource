import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)',  '/sign-up(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
    if (req.nextUrl.pathname.startsWith('/api')) {
      console.log('Middleware: auth.userId for API route =', (await auth()).userId);
    }
  }

  // Redirect authenticated users from public routes to /home
  // if (auth.userId && isPublicRoute(req) && req.nextUrl.pathname !== '/home') {
  //   return auth().redirectToHome();
  // }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}