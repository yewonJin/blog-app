import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

import { updatePostAction } from '@/entities/post';
import { EditorForm } from '@/widgets/EditorForm';
import { removeDashes } from '@/shared/utils';
import { getCategories } from '@/entities/category';

const prisma = new PrismaClient();

const fetchPost = async (title: string) => {
  return await prisma.post.findMany({
    where: {
      title,
    },
  });
};

export default async function Page({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;
  const post = await fetchPost(removeDashes(decodeURI(title)));
  const categories = await getCategories();

  if (!post.length) {
    notFound();
  }

  return (
    <EditorForm
      post={post[0]}
      categories={categories}
      action={updatePostAction}
    />
  );
}
