import * as jose from 'jose';

const JWT_EXPIRATION = '1d'; // 토큰 만료 시간 설정

export const isVerifiedJWT = async (token: string): Promise<boolean> => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY is not defined');
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const { payload } = await jose.jwtVerify(token, secret);
    return Boolean(payload);
  } catch (e) {
    console.error('JWT verification failed:', e);
    return false;
  }
};

export const signJWT = async () => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  const alg = 'HS256';

  return new jose.SignJWT()
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(secret);
};
