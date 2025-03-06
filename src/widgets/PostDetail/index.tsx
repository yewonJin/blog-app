'use client';

import { Category, Post } from '@prisma/client';
import { Suspense, useRef } from 'react';

import { TipTapNode } from '@/entities/node';
import { TiptapViewer, TableOfContents } from '@/features/viewer';
import { DateDisplay, Divider } from '@/shared/ui';

type Props = {
  post: Omit<Post, 'categoryId'> & {
    category: Category;
  };
  indexedNode: TipTapNode;
};

export default function PostDetail({ post, indexedNode }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="mx-auto flex w-full justify-center gap-12">
      <div className="hidden w-[250px] 2xl:block"></div>
      <div className="flex w-[800px] flex-col gap-4">
        <div className="flex items-end justify-between">
          <h1 className="text-4xl font-bold text-neutral-emphasis">
            {post.title}
          </h1>
          <Suspense>
            <DateDisplay date={post.updatedAt} />
          </Suspense>
        </div>
        <Suspense>
          <Divider direction="horizontal" className="w-full" />
        </Suspense>
        <div ref={ref}>
          <Suspense>
            <TiptapViewer node={indexedNode} />
          </Suspense>
        </div>
      </div>
      <div className="hidden w-[250px] xl:block">
        <TableOfContents ref={ref} node={indexedNode} />
      </div>
    </div>
  );
}
