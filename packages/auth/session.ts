"use server";

import { cookies } from 'next/headers'
import { AUTH_KEY, DOMAIN, MAX_DAYS, UserAuthPayload } from './constants';
import { signJwt, verifyJwt } from './jwt';

export async function createSession(authDt: UserAuthPayload) {
    const expiresAt = new Date(Date.now() + MAX_DAYS)
    const session = signJwt(authDt)
    const cookieStore = await cookies()

    cookieStore.set(AUTH_KEY, session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
        domain: DOMAIN,
    });

    return session;
}

export async function removeSession() {
    const cookieStore = await cookies();

    cookieStore.set(AUTH_KEY, "", {
        httpOnly: true,
        secure: true,
        expires: 0,
        sameSite: 'lax',
        path: '/',
        domain: DOMAIN,
    });
}

export async function getAuth(): Promise<UserAuthPayload | null> {
//   const token = (await cookies()).get(AUTH_KEY)?.value;
  return null;
//   return token ? verifyJwt(token) : null;
}