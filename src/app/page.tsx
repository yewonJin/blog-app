import { PrismaClient } from '@prisma/client';

import { sortByUpdatedAt } from '@/entities/post';
import { Home } from '@/widgets/Home';

const prisma = new PrismaClient();

const fetchPosts = async () => {
  return await prisma.post.findMany({
    select: {
      title: true,
      category: true,
      preview: true,
      id: true,
      updatedAt: true,
      slug: true,
    },
  });
};

export default async function Page() {
  const posts = await fetchPosts();
  const sortedPosts = posts.toSorted(sortByUpdatedAt);

  return <Home posts={sortedPosts} />;
}
