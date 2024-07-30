import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import { decrypt } from '@/app/lib/session';
import { auth } from '@/auth';

export default auth((req) => {
  console.log(req);
  // req.auth
});

export async function middleware(request: NextRequest): Promise<void> {
  const unprotectedRoutes = ['/login', '/signup'];
  const currentPath = request.nextUrl.pathname;
  const isProtected = !unprotectedRoutes.includes(currentPath);

  if (isProtected) {
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);
  }
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};