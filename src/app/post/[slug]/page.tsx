import { PrismaClient } from '@prisma/client';

import { generateHeadingIds, TipTapNode } from '@/entities/node';
import PostDetail from '@/widgets/PostDetail';

const prisma = new PrismaClient();

const fetchPost = async (slug: string) => {
  return await prisma.post.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      category: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      preview: true,
      slug: true,
    },
  });
};

export async function generateStaticParams() {
  const posts = await prisma.post.findMany();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPost(decodeURI(slug));

  if (!post) return <div>해당 게시글을 찾을 수 없습니다.</div>;
  const indexedNode = generateHeadingIds(post.content as TipTapNode);

  return <PostDetail post={post} indexedNode={indexedNode} />;
}
