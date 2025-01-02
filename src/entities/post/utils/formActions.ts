'use server';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { PostFormState } from '../models/postTypes';
import { POST_MESSAGE } from '../configs/messages';

const prisma = new PrismaClient();

const slugRegex = /^[a-z0-9가-힣]+(?:-[a-z0-9가-힣]+)*$/;

const createPostSchema = z.object({
  title: z.string().trim().min(1, POST_MESSAGE.ERROR.TITLE_REQUIRED),
  content: z.string().trim().min(1, POST_MESSAGE.ERROR.CONTENT_REQUIRED),
  categoryId: z.string().trim().min(1, POST_MESSAGE.ERROR.CATEGORY_REQUIRED),
  preview: z.string(),
  slug: z
    .string()
    .min(3, POST_MESSAGE.ERROR.SLUG_MIN_LENGTH)
    .max(30, POST_MESSAGE.ERROR.SLUG_MAX_LENGTH)
    .regex(slugRegex, POST_MESSAGE.ERROR.SLUG_INVALID_FORMAT),
});

export const createPostAction = async (
  prevState: PostFormState,
  formData: FormData,
) => {
  const validatedBody = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    categoryId: formData.get('categoryId'),
    preview: formData.get('preview'),
    slug: formData.get('slug'),
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
        slug: validatedBody.data.slug,
        preview: validatedBody.data.preview,
      },
    });
  } catch (e) {
    console.log(e);
    return { message: POST_MESSAGE.ERROR.CREATE_FAILED, formData };
  }

  revalidatePath('/post', 'page');
  redirect(`/post/${encodeURIComponent(validatedBody.data.slug)}`);
};

const updatePostSchema = z.object({
  id: z.number(),
  title: z.string().min(1, POST_MESSAGE.ERROR.TITLE_REQUIRED),
  categoryId: z.string().min(1, POST_MESSAGE.ERROR.CATEGORY_REQUIRED),
  content: z.string().min(1, POST_MESSAGE.ERROR.CONTENT_REQUIRED),
  preview: z.string(),
  slug: z
    .string()
    .min(3, POST_MESSAGE.ERROR.SLUG_MIN_LENGTH)
    .max(30, POST_MESSAGE.ERROR.SLUG_MAX_LENGTH)
    .regex(slugRegex, POST_MESSAGE.ERROR.SLUG_INVALID_FORMAT),
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
    preview: formData.get('preview'),
    slug: formData.get('slug'),
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
        preview: validatedBody.data.preview,
        slug: validatedBody.data.slug,
      },
    });
  } catch (e) {
    console.log(e);
    return { message: POST_MESSAGE.ERROR.UPDATE_FAILED, formData };
  }

  revalidatePath('/post', 'page');
  redirect(`/post/${encodeURIComponent(validatedBody.data.slug)}`);
};
