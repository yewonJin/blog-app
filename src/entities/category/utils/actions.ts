'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCategories = async () => {
  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};
