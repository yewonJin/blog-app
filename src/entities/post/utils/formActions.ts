'use server';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { redirect } from 'next/navigation';

import { PostFormState } from '../models/postTypes';
import { POST_MESSAGE } from '../configs/messages';
import { addDashes } from '@/shared/utils';

const prisma = new PrismaClient();

const createPostSchema = z.object({
  title: z.string().trim().min(1, POST_MESSAGE.ERROR.TITLE_REQUIRED),
  content: z.string().trim().min(1, POST_MESSAGE.ERROR.CONTENT_REQUIRED),
  categoryId: z.string().trim().min(1, POST_MESSAGE.ERROR.CATEGORY_REQUIRED),
});

export const createPostAction = async (
  prevState: PostFormState,
  formData: FormData,
) => {
  const validatedBody = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    categoryId: formData.get('categoryId'),
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
        categoryId: Number(validatedBody.data.categoryId),
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
  title: z.string().min(1, POST_MESSAGE.ERROR.TITLE_REQUIRED),
  categoryId: z.string().min(1, POST_MESSAGE.ERROR.CATEGORY_REQUIRED),
  content: z.string().min(1, POST_MESSAGE.ERROR.CONTENT_REQUIRED),
});

export const updatePostAction = async (
  prevState: { message: string },
  formData: FormData,
) => {
  const validatedBody = updatePostSchema.safeParse({
    id: Number(formData.get('id')),
    title: formData.get('title'),
    categoryId: formData.get('categoryId'),
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
        categoryId: Number(validatedBody.data.categoryId),
        updatedAt: new Date(),
      },
    });
  } catch (e) {
    console.log(e);
    return { message: POST_MESSAGE.ERROR.UPDATE_FAILED, formData };
  }

  redirect(`/post/${addDashes(encodeURI(validatedBody.data.title))}`);
};
