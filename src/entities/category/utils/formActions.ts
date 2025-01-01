'use server';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { CATEGORY_MESSAGE } from '../configs/messages';
import { CategoryFormState } from '../models/categoryTypes';

const prisma = new PrismaClient();

const createCategorySchema = z.object({
  name: z.string().trim().min(1, CATEGORY_MESSAGE.ERROR.NAME_REQUIRED),
});

export const createCategoryAction = async (
  prevState: CategoryFormState,
  formData: FormData,
) => {
  const validatedBody = createCategorySchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedBody.success) {
    return {
      success: false,
      message: validatedBody.error.errors[0].message,
    };
  }

  try {
    await prisma.category.create({
      data: {
        name: validatedBody.data.name,
      },
    });

    revalidatePath('/admin/category');

    return {
      success: true,
      message: CATEGORY_MESSAGE.SUCCESS.CREATE,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: CATEGORY_MESSAGE.ERROR.CREATE_FAILED,
    };
  }
};

const updateCategorySchema = z.object({
  name: z.string().trim().min(1, CATEGORY_MESSAGE.ERROR.NAME_REQUIRED),
  categoryId: z.string().trim().min(1, CATEGORY_MESSAGE.ERROR.ID_REQUIRED),
});

export const updateCategoryAction = async (
  prevState: CategoryFormState,
  formData: FormData,
) => {
  const validatedBody = updateCategorySchema.safeParse({
    name: formData.get('name'),
    categoryId: formData.get('categoryId'),
  });

  if (!validatedBody.success) {
    return {
      success: false,
      message: validatedBody.error.errors[0].message,
    };
  }

  try {
    await prisma.category.update({
      where: {
        id: Number(validatedBody.data.categoryId),
      },
      data: {
        name: validatedBody.data.name,
      },
    });

    revalidatePath('/admin/category');

    return {
      success: true,
      message: CATEGORY_MESSAGE.SUCCESS.UPDATE,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: CATEGORY_MESSAGE.ERROR.UPDATE_FAILED,
    };
  }
};
