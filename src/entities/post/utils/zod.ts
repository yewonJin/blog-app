import { z } from 'zod';

import { POST_MESSAGE } from '../configs/messages';

const slugRegex = /^[a-z0-9가-힣]+(?:-[a-z0-9가-힣]+)*$/;

export const createPostSchema = z.object({
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

export const updatePostSchema = z.object({
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
