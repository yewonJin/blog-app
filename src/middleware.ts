import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

import { isVerifiedJWT } from '@/features/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const isValid = await isVerifiedJWT(token);
      if (!isValid) {
        response.cookies.delete('jwt');
        return NextResponse.redirect(new URL('/login', request.url));
      }
      return response;
    } catch (e) {
      console.error('JWT verification error:', e);
      response.cookies.delete('jwt');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/login')) {
    if (!token) return response;

    try {
      const isValid = await isVerifiedJWT(token);
      if (!isValid) {
        response.cookies.delete('jwt');
        return response;
      }
      return NextResponse.redirect(new URL('/', request.url));
    } catch (e) {
      console.error('JWT verification error:', e);
      response.cookies.delete('jwt');
      return response;
    }
  }
}
