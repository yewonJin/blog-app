import { getCategories } from '@/entities/category';
import { createPostAction } from '@/entities/post';
import { EditorForm } from '@/widgets/EditorForm';

export default async function Page() {
  const categories = await getCategories();

  return <EditorForm categories={categories} action={createPostAction} />;
}
