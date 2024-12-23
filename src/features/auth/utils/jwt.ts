import * as jose from 'jose';

export const isVerifiedJWT = async (token: string) => {
  const verified = await jose.jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET_KEY),
  );

  return verified.payload ? true : false;
};

export const signJWT = async () => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  const alg = 'HS256';

  return new jose.SignJWT().setProtectedHeader({ alg }).sign(secret);
};
