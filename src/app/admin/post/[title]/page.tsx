import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

import { removeDashes } from '@/shared/utils';
import EditorForm from '@/components/EditorForm';
import { updatePostAction } from '@/entities/post/utils/actions';

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

  if (!post.length) {
    notFound();
  }

  return <EditorForm post={post[0]} action={updatePostAction} />;
}
