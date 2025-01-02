import { z } from 'zod';

import { CATEGORY_MESSAGE } from '../configs/messages';

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, CATEGORY_MESSAGE.ERROR.NAME_REQUIRED),
});

export const updateCategorySchema = z.object({
  name: z.string().trim().min(1, CATEGORY_MESSAGE.ERROR.NAME_REQUIRED),
  categoryId: z.string().trim().min(1, CATEGORY_MESSAGE.ERROR.ID_REQUIRED),
});
