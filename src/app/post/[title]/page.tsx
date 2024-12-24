import { PrismaClient } from '@prisma/client';

import PostDetail from '@/widgets/PostDetail';
import { removeDashes } from '@/shared/utils';

const prisma = new PrismaClient();

const fetchPost = async (title: string) => {
  return await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      title,
    },
  });
};

export async function generateStaticParams() {
  const posts = await prisma.post.findMany();

  return posts.map((post) => ({ title: post.title }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;
  const post = await fetchPost(removeDashes(decodeURI(title)));

  return <PostDetail post={post[0]} />;
}
