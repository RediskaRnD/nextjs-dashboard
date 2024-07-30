import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

import { SessionPayload } from '@/app/auth/definitions';

const KEY = new TextEncoder().encode(process.env.SECRET);

const COOKIE_TEMPLATE = {
  name: 'session',
  algorithm: 'RS256',
  duration: 24 * 60 * 60 * 1000,
  options: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/'
  } as ResponseCookie
};

const encrypt = async (payload: SessionPayload): Promise<string> => new SignJWT(payload)
  .setProtectedHeader({ alg: COOKIE_TEMPLATE.algorithm, contentType: 'text/plain' })
  .setIssuedAt()
  .setExpirationTime('1day')
  .sign(KEY);

const decrypt = async (session = ''): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(session, KEY, { algorithms: [COOKIE_TEMPLATE.algorithm] });
    return payload;
  } catch (error) {
    return null;
  }
};

const createSession = async (userId: string): Promise<void> => {
  const expiresAt = new Date(Date.now() + COOKIE_TEMPLATE.duration);
  const session: SessionPayload = { userId, expiresAt };
  const encrypted = await encrypt(session);
  const options: ResponseCookie = { ...COOKIE_TEMPLATE.options, expires: expiresAt };

  cookies().set(COOKIE_TEMPLATE.name, encrypted, options);
};

const getSession = async (): Promise<SessionPayload | null> => {
  const cookie = cookies().get(COOKIE_TEMPLATE.name)?.value;

  const decrypted = await decrypt(cookie);
  console.log('decrypted', decrypted);
  return decrypted as SessionPayload;
};

export {
  createSession,
  decrypt,
  encrypt,
  getSession
};
