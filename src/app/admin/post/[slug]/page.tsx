import { PrismaClient } from '@prisma/client';

import { updatePostAction } from '@/entities/post';
import { EditorForm } from '@/widgets/EditorForm';
import { getCategories } from '@/entities/category';

const prisma = new PrismaClient();

const fetchPost = async (slug: string) => {
  return await prisma.post.findUnique({
    where: {
      slug,
    },
  });
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPost(decodeURI(slug));
  const categories = await getCategories();

  if (!post) {
    return <div>해당 게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <EditorForm post={post} categories={categories} action={updatePostAction} />
  );
}
