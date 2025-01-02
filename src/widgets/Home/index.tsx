import Image from 'next/image';
import Link from 'next/link';

import { addDashes, getRelativeTime } from '@/shared/utils';
import { Category, Post } from '@prisma/client';
import { Divider } from '@/shared/ui';

type Props = {
  posts: (Omit<Post, 'categoryId' | 'content' | 'createdAt'> & {
    category: Category;
  })[];
};

export function Home({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <Link
          href={`/post/${addDashes(post.title)}`}
          key={post.title}
          className="bg-neutral-secondary"
        >
          <div className="relative aspect-video w-full">
            <Image
              fill
              alt="post thumbnail"
              src={`https://doromo-blog-app.s3.ap-northeast-2.amazonaws.com/thumbnail-${post.id}.png`}
            />
          </div>
          <div className="flex flex-col gap-3 p-4">
            <h2 className="my-1 text-xl font-semibold">{post.title}</h2>
            <p className="line-clamp-3 text-neutral-tertiary">{post.preview}</p>
            <Divider direction="horizontal" />
            <div className="flex justify-between">
              <span className="text-neutral-tertiary">
                {post.category.name}
              </span>
              <span className="text-neutral-tertiary">
                {getRelativeTime(post.updatedAt)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
