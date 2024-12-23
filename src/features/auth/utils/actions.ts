'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { signJWT } from './jwt';

const loginSchema = z.object({
  id: z.string(),
  password: z.string(),
});

export const loginAction = async (
  prevState: { message: string },
  formData: FormData,
) => {
  const validatedBody = loginSchema.safeParse({
    id: formData.get('id'),
    password: formData.get('password'),
  });

  if (!validatedBody.success) {
    return { message: '입력 값이 잘못되었습니다.' };
  }

  if (
    validatedBody.data.id !== process.env.ADMIN_ID ||
    validatedBody.data.password !== process.env.ADMIN_PASSWORD
  ) {
    return { message: '아이디 혹은 비밀번호가 일치하지 않습니다.' };
  }

  const jwt = await signJWT();
  (await cookies()).set('jwt', jwt, { sameSite: true, maxAge: 3600 });

  redirect('/');
};
