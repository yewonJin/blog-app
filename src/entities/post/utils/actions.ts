'use server';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { redirect } from 'next/navigation';

import { s3, S3_URL } from './aws';
import { PostFormState } from '../models/postTypes';
import { POST_MESSAGE } from '../configs/messages';
import { addDashes } from '@/shared/utils';

const prisma = new PrismaClient();

const createPostSchema = z.object({
  title: z.string().nonempty(POST_MESSAGE.ERROR.TITLE_REQUIRED),
  content: z.string().nonempty(POST_MESSAGE.ERROR.CONTENT_REQUIRED),
});

export const createPostAction = async (
  prevState: PostFormState,
  formData: FormData,
) => {
  const validatedBody = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!validatedBody.success) {
    return {
      message: validatedBody.error.errors[0].message,
      formData,
    };
  }

  try {
    await prisma.post.create({
      data: {
        title: validatedBody.data.title,
        content: JSON.parse(validatedBody.data.content),
      },
    });
  } catch (e) {
    console.log(e);
    return { message: POST_MESSAGE.ERROR.CREATE_FAILED, formData };
  }

  redirect(`/post/${addDashes(encodeURI(validatedBody.data.title))}`);
};

const updatePostSchema = z.object({
  id: z.number(),
  title: z.string().nonempty(POST_MESSAGE.ERROR.TITLE_REQUIRED),
  content: z.string().nonempty(POST_MESSAGE.ERROR.CONTENT_REQUIRED),
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
    return {
      message: validatedBody.error.errors[0].message,
      formData,
    };
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
  } catch (e) {
    console.log(e);
    return { message: POST_MESSAGE.ERROR.UPDATE_FAILED, formData };
  }

  redirect(`/post/${addDashes(encodeURI(validatedBody.data.title))}`);
};

export const uploadImage = async (formData: FormData, fileName?: string) => {
  const files = formData.getAll('file') as File[];
  const urls: string[] = [];

  await Promise.all(
    files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const key = fileName || `${file.lastModified}-${file.name}`;

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
