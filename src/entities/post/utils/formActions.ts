'use server';

import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { PostFormState } from '../models/postTypes';
import { POST_MESSAGE } from '../configs/messages';
import { createPostSchema, updatePostSchema } from './zod';

const prisma = new PrismaClient();

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
