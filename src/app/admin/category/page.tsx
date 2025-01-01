import {
  getCategories,
  CreateCategoryForm,
  UpdateCategoryForm,
} from '@/entities/category';

export default async function Page() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-4">
      <CreateCategoryForm />
      <UpdateCategoryForm categories={categories} />
    </div>
  );
}
