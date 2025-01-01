import { PrismaClient } from '@prisma/client';

import { CreateCategoryForm, UpdateCategoryForm } from '@/entities/category';

const prisma = new PrismaClient();

const fetchCategories = async () => {
  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <div className="flex flex-col gap-4">
      <CreateCategoryForm />
      <UpdateCategoryForm categories={categories} />
    </div>
  );
}
