import 'server-only';

import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import type { SessionPayload } from '@/app/auth/definitions';

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

export const encrypt = async (payload: SessionPayload): Promise<string> => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1hr')
    .sign(key);
};

export const decrypt = async (session: string | undefined = ''): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256']
    });
    return payload;
  } catch (error) {
    return null;
  }
};

const createSession = async (userId: string): Promise<void> => {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  });

  redirect('/dashboard');
};

const verifySession = async (): Promise<any> => {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect('/login');
  }

  return { isAuth: true, userId: Number(session.userId) };
};

const updateSession = async (): Promise<void> => {
  const session = cookies().get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/'
  });
};

const deleteSession = (): void => {
  cookies().delete('session');
  redirect('/login');
};

export {
  createSession,
  deleteSession,
  updateSession,
  verifySession
};
