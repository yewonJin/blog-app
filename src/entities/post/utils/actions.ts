'use server';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { PutObjectCommand } from '@aws-sdk/client-s3';

import { s3, S3_URL } from '../libs/aws';

const prisma = new PrismaClient();

const createPostSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const createPostAction = async (
  prevState: { message: string },
  formData: FormData,
) => {
  const validatedBody = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!validatedBody.success) {
    return { message: '입력 값이 잘못되었습니다.' };
  }

  try {
    await prisma.post.create({
      data: {
        title: validatedBody.data.title,
        content: JSON.parse(validatedBody.data.content),
      },
    });

    return { message: '포스트 생성 성공' };
  } catch (e) {
    console.error(e);
    return { message: '포스트 생성 실패' };
  }
};

const updatePostSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
});

export const updatePostAction = async (
  prevState: { message: string },
  formData: FormData,
) => {
  const validatedBody = updatePostSchema.safeParse({
    id: Number(formData.get('id')),
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!validatedBody.success) {
    return { message: '입력 값이 잘못되었습니다.' };
  }

  try {
    await prisma.post.update({
      where: {
        id: validatedBody.data.id,
      },
      data: {
        title: validatedBody.data.title,
        content: JSON.parse(validatedBody.data.content),
        updatedAt: new Date(),
      },
    });

    return { message: '포스트 수정 성공' };
  } catch (e) {
    console.error(e);
    return { message: '포스트 수정 실패' };
  }
};

export const uploadImage = async (formData: FormData) => {
  const files = formData.getAll('file') as File[];
  const urls: string[] = [];

  await Promise.all(
    files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const key = `${file.lastModified}-${file.name}`;

      const command = new PutObjectCommand({
        Bucket: process.env.MY_AWS_S3_BUCKET as string,
        Key: key,
        Body: buffer,
        ACL: 'public-read',
        ContentType: file.type,
      });

      await s3.send(command).then(() => urls.push(`${S3_URL}/${key}`));
    }),
  );

  return urls;
};
